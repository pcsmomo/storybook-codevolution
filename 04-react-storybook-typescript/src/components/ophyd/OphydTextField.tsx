import {
  useState,
  useEffect,
  useMemo,
  ChangeEvent,
  KeyboardEvent,
  ReactNode,
} from 'react';

// Styles / MUI
import {
  Box,
  Typography,
  LinearProgress,
  InputProps,
  InputAdornment,
} from '@mui/material';
import { PrecisionManufacturing as OphydIcon } from '@mui/icons-material';
import { useStyles, StyledTextField } from './OphydTextField.styles';

// Hooks and Selectors
import { useSetOphydMutation } from '../redux/ophydApi';
import { useSubscribeOphyd } from '../hooks';

// Utils
import {
  formattedRoundFloat,
  formattedCeilFloat,
  formattedFloorFloat,
} from 'app/utils/number';

// Environment Variable
import { env } from 'config';

export interface OphydTextFieldProps {
  deviceStr: string;
  label?: string;
  unitConvertCb?: (value: number) => number;
  unitReverseCb?: (value: number) => number;
  egu?: string; // engineering unit
  hideLabel?: boolean;
  hideUnit?: boolean;
  hideLimits?: boolean;
  signifFigures?: number; // significant figures
  endAdornment?: ReactNode;
  unitWithLabel?: boolean;
  setEndpoint?: string; // use specific setEndpoint instead of deviceStr when setOphyd()
  type?: 'number' | 'text'; // this component will except only two types \
  // among https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types
  width?: number;
}

const OphydTextField: React.FC<OphydTextFieldProps> = ({
  deviceStr,
  label,
  unitConvertCb,
  unitReverseCb,
  egu,
  hideLabel,
  hideUnit,
  hideLimits,
  signifFigures,
  endAdornment,
  unitWithLabel,
  setEndpoint,
  type = 'number',
  width = 240,
}) => {
  const { classes, cx } = useStyles({ width });

  const [tempValue, setTempValue] = useState('');
  const [displayingValue, setDisplayingValue] = useState('');
  const [editing, setEditing] = useState(false);
  const [limits, setLimits] = useState<undefined[] | number[]>([
    undefined, // [0]: lower limit
    undefined, // [1]: upper limit
  ]);
  const [unit, setUnit] = useState('');
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // fetch the Ophyd data
  const {
    value: deviceValue,
    desc,
    isLoading: isGetLoading,
    isError: isGetError,
    error: errorGet,
  } = useSubscribeOphyd({ deviceStr });
  const [
    setOphyd,
    {
      data: responseSet,
      isLoading: isSetLoading,
      isError: isSetError,
      error: errorSet,
    },
  ] = useSetOphydMutation();

  const setValue = (value: string) => {
    if (!editing) {
      // when the textfield is focused(=editing), it won't assign the live value to the tempValue
      setTempValue(value);
    }

    setDisplayingValue(value);
  };

  // update value received via websocket stream
  useEffect(() => {
    if (typeof deviceValue === 'number') {
      const formattedValue = getFormattedValue(deviceValue);
      setValue(formattedValue);
    } else if (typeof deviceValue === 'string') {
      setValue(deviceValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceValue]);

  const isLoading = useMemo(
    () => isGetLoading || isSetLoading,
    [isGetLoading, isSetLoading]
  );

  const getSignificantFigures = (): number => {
    let returnValue = -1;
    if (signifFigures !== undefined) {
      returnValue = signifFigures;
    } else if (env.REACT_APP_DEFAULT_SIGNIFICANT_FIGURES !== undefined) {
      returnValue = parseInt(env.REACT_APP_DEFAULT_SIGNIFICANT_FIGURES, 10);
    }
    return returnValue;
  };

  const significantFigures = getSignificantFigures();

  const getFormattedValue = (
    value: number,
    formatFn: (value: number, decimal?: number) => any = formattedRoundFloat
  ) => {
    const convertedValue = getConvertedValue(value);

    const formattedValue =
      significantFigures > -1
        ? formatFn(convertedValue, significantFigures)
        : convertedValue;

    return formattedValue;
  };

  // update limits
  useEffect(() => {
    if (!desc) {
      return;
    }

    // disp_limit is prior to ctrl_limit
    const lowerLimit =
      desc.lower_disp_limit !== undefined && desc.lower_disp_limit !== null
        ? desc.lower_disp_limit
        : desc.lower_ctrl_limit;
    const upperLimit =
      desc.upper_disp_limit !== undefined && desc.upper_disp_limit !== null
        ? desc.upper_disp_limit
        : desc.upper_ctrl_limit;

    setLimits([
      lowerLimit && getFormattedValue(lowerLimit, formattedCeilFloat),
      upperLimit && getFormattedValue(upperLimit, formattedFloorFloat),
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    desc?.lower_disp_limit,
    desc?.upper_disp_limit,
    desc?.lower_ctrl_limit,
    desc?.upper_ctrl_limit,
  ]);

  // update unit
  useEffect(() => {
    if (!desc) {
      return;
    }

    if (egu !== undefined) {
      setUnit(egu);
    } else if (desc.units !== undefined && desc.units !== null) {
      setUnit(desc.units);
    }
  }, [desc, desc?.units, egu]);

  // handle GET error flag and message
  useEffect(() => {
    setError(isGetError);
  }, [isGetError]);
  useEffect(() => {
    if (errorGet) {
      setErrorMsg('Failed to get data');
      // if the CustomErorr was defined in bffApi.ts, we could use of it.
      // (if we want to display the specific error message we get)
      /*
      if ("data" in errorGet) {
        // the errorGet is defined as CustomError
        setErrorMsg(errorGet.data?.detail?.message);
      }
      */
    }
  }, [errorGet]);

  // handle SET error flag and message
  useEffect(() => {
    setError(isSetError);
  }, [isSetError]);
  useEffect(() => {
    // this error message comes when ophyd-api server is not running
    if (errorSet) {
      setErrorMsg('Failed to set value');
    }
  }, [errorSet]);
  useEffect(() => {
    // this error message comes when failed to set value
    // but actually ophyd-api server is up and running
    const { set_success, set_message } = responseSet || {};
    if (set_success === undefined || set_success) {
      clearError();
    } else {
      setError(true);
      setErrorMsg(set_message);
    }
  }, [responseSet]);

  // validate the input value and set error flag/helper text message
  useEffect(() => {
    // when both lower/upper limits are 0, skip validating
    if (
      (limits[0] === undefined && limits[1] === undefined) ||
      (limits[0] === null && limits[1] === null) ||
      (limits[0] === 0 && limits[1] === 0)
    ) {
      return;
    }

    const parsedTmp = parseFloat(tempValue);
    if (limits[0] !== undefined && parsedTmp < limits[0]) {
      setError(true);
      setErrorMsg('too low');
    } else if (limits[1] !== undefined && parsedTmp > limits[1]) {
      setError(true);
      setErrorMsg('too high');
    } else {
      clearError();
    }
  }, [tempValue, limits]);

  const getConvertedValue = (value: number) =>
    unitConvertCb ? unitConvertCb(value) : value;

  const getReversedValue = (value: number) =>
    unitReverseCb ? unitReverseCb(value) : value;

  const getLabel = () => {
    if (hideLabel) return '';

    const deviceLabel = label === undefined ? desc?.name : label;

    const formattedUnit =
      hideUnit || unit === '' || !unitWithLabel ? '' : ` (${unit})`;
    const combinedLabel = `${deviceLabel}${formattedUnit}`.replace(/_/g, ' ');
    return combinedLabel;
  };

  const getInputProps = () => {
    const updatedInputProps: InputProps = {
      startAdornment: (
        <InputAdornment position="start">
          <OphydIcon fontSize="small" />
        </InputAdornment>
      ),
    };

    // 1. if props.endAdornment exists, apply it
    if (endAdornment) {
      updatedInputProps.endAdornment = endAdornment;
    } else if (!unitWithLabel && !hideUnit) {
      updatedInputProps.endAdornment = <span aria-label="unit">{unit}</span>;
    }

    return updatedInputProps;
  };

  const handleSetOphyd = () => {
    let valueToUpdate: string | number = '';
    if (desc?.dtype === 'string') {
      valueToUpdate = tempValue;
    } else {
      valueToUpdate = getReversedValue(parseFloat(tempValue));
    }

    // if there is the specified set endpoint, use it.
    // Otherwise, use the same endpoint as the endpoint to get the device
    const endpoint = setEndpoint || deviceStr;

    setOphyd({ deviceStr: endpoint, value: valueToUpdate });
  };

  const handleFocus = () => {
    setEditing(true);
    clearError();
  };

  const handleBlur = () => {
    setEditing(false);
    setTempValue(displayingValue);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTempValue(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!editing) {
      setEditing(true);
      clearError();
    }

    if (event.key === 'Enter') {
      event.preventDefault(); // otherwise, it will affect the next event

      if (error) {
        return;
      }
      handleSetOphyd();
      setEditing(false);
    }
  };

  const clearError = () => {
    setError(false);
    setErrorMsg('');
  };

  // 1. provided hideLimits flag is false
  // 2. both limits are not 0, which is meaningless
  const displayLimits =
    !hideLimits &&
    (limits[0] !== undefined || limits[1] !== undefined) &&
    (limits[0] !== 0 || limits[1] !== 0);

  return (
    <Box className={classes.container}>
      <StyledTextField
        type={type}
        label={getLabel()}
        value={editing ? tempValue : displayingValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        InputProps={getInputProps()}
        error={error}
        helperText={errorMsg}
      />
      {/* <pre>isGetError: {JSON.stringify(isGetError)}</pre>
      <pre>errorGet: {JSON.stringify(errorGet)}</pre>
      <pre>isSetError: {JSON.stringify(isSetError)}</pre>
      <pre>errorSet: {JSON.stringify(errorSet)}</pre>
      <pre>responseSet{JSON.stringify(responseSet)}</pre> */}
      {isLoading && <LinearProgress sx={{ height: 2 }} />}
      {displayLimits && (
        <Box className={cx(classes.limitsDiv, error && classes.error)}>
          <Typography variant="caption" aria-label="lower limit">
            {limits[0]}
          </Typography>
          <Typography variant="caption" aria-label="upper limit">
            {limits[1]}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default OphydTextField;

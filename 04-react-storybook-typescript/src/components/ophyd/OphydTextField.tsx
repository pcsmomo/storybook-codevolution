import {
  useState,
  useEffect,
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
  Stack,
} from '@mui/material';
import { PrecisionManufacturing as OphydIcon } from '@mui/icons-material';
import { useStyles, StyledTextField } from './OphydTextField.styles';

// Utils
import { formattedRoundFloat } from '../../utils/number';

export interface OphydTextFieldProps {
  value?: number | string;
  limits?: number[] | undefined[];
  isLoading?: boolean;
  errorMsg?: string;
  unit?: string;
  dtype?: string;
  setOphyd?: (value: number | string) => void;
  setErrorMsg?: (errorMsg: string) => void;
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
  value = '',
  limits = [undefined, undefined],
  isLoading = false,
  errorMsg = '',
  unit = '',
  dtype = '',
  setOphyd = () => {},
  setErrorMsg = () => {},
  label = '',
  unitConvertCb,
  unitReverseCb,
  hideUnit,
  hideLimits,
  signifFigures = 3,
  endAdornment,
  unitWithLabel,
  type = 'number',
  width = 240,
}) => {
  const { classes, cx } = useStyles({ width });

  const [tempValue, setTempValue] = useState('');
  const [displayingValue, setDisplayingValue] = useState('');
  const [editing, setEditing] = useState(false);

  const setValue = (value: string) => {
    if (!editing) {
      // when the textfield is focused(=editing), it won't assign the live value to the tempValue
      setTempValue(value);
    }

    setDisplayingValue(value);
  };

  // update value received via websocket stream
  useEffect(() => {
    if (typeof value === 'number') {
      const formattedValue = getFormattedValue(value);
      setValue(formattedValue);
    } else if (typeof value === 'string') {
      setValue(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const getFormattedValue = (
    value: number,
    formatFn: (value: number, decimal?: number) => any = formattedRoundFloat
  ) => {
    const convertedValue = getConvertedValue(value);

    const formattedValue =
      signifFigures > -1
        ? formatFn(convertedValue, signifFigures)
        : convertedValue;

    return formattedValue;
  };

  const getConvertedValue = (value: number) =>
    unitConvertCb ? unitConvertCb(value) : value;

  const getReversedValue = (value: number) =>
    unitReverseCb ? unitReverseCb(value) : value;

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
    if (dtype === 'string') {
      valueToUpdate = tempValue;
    } else {
      valueToUpdate = getReversedValue(parseFloat(tempValue));
    }
    setOphyd(valueToUpdate);
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

      if (errorMsg) {
        return;
      }
      handleSetOphyd();
      setEditing(false);
    }
  };

  const clearError = () => {
    // setError(false);
    setErrorMsg('');
  };

  // 1. provided hideLimits flag is false
  // 2. both limits are not 0, which is meaningless
  const displayLimits =
    !hideLimits &&
    (limits[0] !== undefined || limits[1] !== undefined) &&
    (limits[0] !== 0 || limits[1] !== 0);

  return (
    <Stack className={classes.container}>
      <StyledTextField
        type={type}
        label={label}
        value={editing ? tempValue : displayingValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        InputProps={getInputProps()}
        error={!!errorMsg}
        helperText={errorMsg}
      />
      {isLoading && <LinearProgress sx={{ height: 2 }} />}
      {displayLimits && (
        <Box className={cx(classes.limitsDiv, !!errorMsg && classes.error)}>
          <Typography variant="caption" aria-label="lower limit">
            {limits[0]}
          </Typography>
          <Typography variant="caption" aria-label="upper limit">
            {limits[1]}
          </Typography>
        </Box>
      )}
    </Stack>
  );
};

export default OphydTextField;

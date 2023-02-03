const validateValue = (
  value: number | undefined | null | string
): { valid: boolean; validatedValue: number | string } => {
  // specify the value as number or string for the next function parseValues()
  if (value === undefined || value === null) {
    return { valid: false, validatedValue: '' };
  }
  if (typeof value === 'string' && isNaN(parseFloat(value))) {
    return { valid: false, validatedValue: '' };
  }
  return { valid: true, validatedValue: value };
};

const parseValues = (
  value: number | string,
  decimal: number
): { parsedValue: number; decimalPlace: number } => {
  const parsedValue = typeof value === 'string' ? parseFloat(value) : value;
  const decimalPlace = decimal < 0 ? 0 : decimal;

  return { parsedValue, decimalPlace };
};

/**
 * It rounds number to decimal places
 * roundFloat(13.005001) -> 13.01
 * roundFloat(13.00499) -> 13
 *
 * About Number.EPSILON
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON
 */

const roundFloatCore = (value: number, decimal: number): number =>
  Math.round((value + Number.EPSILON) * 10 ** decimal) / 10 ** decimal;

export const roundFloat = (
  value: number | undefined | null | string,
  decimal = 2
): number | string => {
  // validate
  const { valid, validatedValue } = validateValue(value);
  if (!valid) return '';

  // parse
  const { parsedValue, decimalPlace } = parseValues(validatedValue, decimal);

  return roundFloatCore(parsedValue, decimalPlace);
};

/**
 * It rounds number and display to decimal places
 * formattedRoundFloat(13.005001) -> "13.01"
 * formattedRoundFloat(13.00499) -> "13.00"
 */
export const formattedRoundFloat = (
  value: number | undefined | null | string,
  decimal = 2
): number | string => {
  // validate
  const { valid, validatedValue } = validateValue(value);
  if (!valid) return '';

  // parse
  const { parsedValue, decimalPlace } = parseValues(validatedValue, decimal);

  return roundFloatCore(parsedValue, decimalPlace).toFixed(decimalPlace);
};

/**
 * It floors number to decimal places
 * floorFloat(13.0909090909) -> 13.09
 * floorFloat(13.0049987, 4) -> 13.0049
 */

const floorFloatCore = (value: number, decimal: number): number =>
  Math.floor((value + Number.EPSILON) * 10 ** decimal) / 10 ** decimal;

export const floorFloat = (
  value: number | undefined | null | string,
  decimal = 2
): number | string => {
  // validate
  const { valid, validatedValue } = validateValue(value);
  if (!valid) return '';

  // parse
  const { parsedValue, decimalPlace } = parseValues(validatedValue, decimal);

  return floorFloatCore(parsedValue, decimalPlace);
};

export const formattedFloorFloat = (
  value: number | undefined | null | string,
  decimal = 2
): number | string => {
  // validate
  const { valid, validatedValue } = validateValue(value);
  if (!valid) return '';

  // parse
  const { parsedValue, decimalPlace } = parseValues(validatedValue, decimal);

  return floorFloatCore(parsedValue, decimalPlace).toFixed(decimalPlace);
};

/**
 * It ceils number to decimal places
 * ceilFloat(13.0909090909) -> 13.1
 * ceilFloat(13.0048187, 4) -> 13.0049
 */
const ceilFloatCore = (value: number, decimal: number): number =>
  Math.ceil((value + Number.EPSILON) * 10 ** decimal) / 10 ** decimal;

export const ceilFloat = (
  value: number | undefined | null | string,
  decimal = 2
): number | string => {
  // validate
  const { valid, validatedValue } = validateValue(value);
  if (!valid) return '';

  // parse
  const { parsedValue, decimalPlace } = parseValues(validatedValue, decimal);

  return ceilFloatCore(parsedValue, decimalPlace);
};

export const formattedCeilFloat = (
  value: number | undefined | null | string,
  decimal = 2
): number | string => {
  // validate
  const { valid, validatedValue } = validateValue(value);
  if (!valid) return '';

  // parse
  const { parsedValue, decimalPlace } = parseValues(validatedValue, decimal);

  return ceilFloatCore(parsedValue, decimalPlace).toFixed(decimalPlace);
};

import { defaultDigits } from './constants';

/**
 * Round value for the specified number of decimal places
 * @param value the value to be round
 * @param decimalPlaces the number of fractioned digits
 * @returns the rounded result
 */
export function round(value: number, decimalPlaces: number = defaultDigits) {
	return Number(value.toFixed(decimalPlaces));
}

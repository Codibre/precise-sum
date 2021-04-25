import { defaultDigits } from './consts';

/**
 * Round value for the specified number of de
 * @param value
 * @param decimalPlaces
 * @returns
 */
export function round(value: number, decimalPlaces: number = defaultDigits) {
	return Number(value.toFixed(decimalPlaces));
}

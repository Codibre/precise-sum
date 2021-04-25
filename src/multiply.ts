import { defaultCorrectionFactor } from './constants';

/**
 * Sums the informed value applying the correction factor for better precision
 * @param values the list of values to sum
 * @param correctionFactor a power of 10. The number of zeroes is the number of decimal places you want as precision
 * @returns the sum
 */
export function multiply(
	values: (number | string)[],
	correctionFactor: number = defaultCorrectionFactor,
) {
	const { length } = values;
	let acc = 1;
	let correction = 1;
	for (let i = 0; i < length; i++) {
		acc *= (values[i] as number) * correctionFactor;
		if (acc % correctionFactor !== 0) {
			correction *= correctionFactor;
		} else {
			acc /= correctionFactor;
		}
	}
	return acc / correction;
}

import { defaultCorrectionFactor as defaultCorrectionFactor } from './consts';

/**
 * Sums the informed value applying the correction factor for better precision
 * @param values the list of values to sum
 * @param correctionFactor a power of 10. The number of zeroes is the number of decimal places you want as precision
 * @returns the sum
 */
export function sum(
	values: (number | string)[],
	correctionFactor: number = defaultCorrectionFactor,
) {
	return (
		values.reduce(
			(acc: number, x) => acc + (x as number) * correctionFactor,
			0,
		) / correctionFactor
	);
}

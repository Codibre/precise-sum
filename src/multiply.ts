import {
	defaultCorrectionFactor,
	maxSafeFactor,
	maxSafeInteger,
} from './constants';

function convertBack(acc: bigint, correction: bigint, factor: bigint): number {
	const q = acc / correction;
	const r = acc % correction;

	return (
		Number(q) +
		(r > maxSafeInteger
			? convertBack(r, correction / factor, factor)
			: Number(r) / Number(correction))
	);
}

function bigIntFallback(
	init: number,
	values: (string | number)[],
	accBase: number,
	correctionBase: number,
	correctionFactorBase: number,
) {
	let acc = BigInt(Math.round(accBase));
	let correction = BigInt(correctionBase);
	const correctionFactor = BigInt(correctionFactorBase);

	for (let i = init; i < values.length; i++) {
		acc *= BigInt((values[i] as number) * correctionFactorBase);
		if (acc % correctionFactor !== 0n) {
			correction *= correctionFactor;
		} else {
			acc /= correctionFactor;
		}
	}

	return convertBack(acc, correction, correctionFactor);
}

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
		const newValue = (values[i] as number) * correctionFactor;
		const result = acc * newValue;
		if (result > Number.MAX_SAFE_INTEGER) {
			return bigIntFallback(i, values, acc, correction, correctionFactor);
		}
		acc = result;
		if (acc % correctionFactor === 0) {
			acc /= correctionFactor;
		} else {
			const newCorrection = correction * correctionFactor;
			if (newCorrection > maxSafeFactor) {
				return bigIntFallback(i, values, acc, correction, correctionFactor);
			}
			correction = newCorrection;
		}
	}
	return acc / correction;
}

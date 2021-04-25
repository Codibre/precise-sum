import { defaultCorrectionFactor } from './consts';
import { KeysOfType } from 'is-this-a-pigeon';

/**
 * Sums the informed value applying the correction factor for better precision and the correspondent weight
 * @param values the list of values to sum
 * @param weights the list of weights to apply
 * @param correctionFactor a power of 10. The number of zeroes is the number of decimal places you want as precision
 * @returns the sum
 */
export function weightSum(
	values: (number | string)[],
	weights: (number | string)[],
	correctionFactor: number = defaultCorrectionFactor,
): number {
	let acc = 0;
	const { length } = values;
	for (let i = 0; i < length; i++) {
		acc += (values[i] as number) * correctionFactor * (weights[i] as number);
	}
	return acc / correctionFactor;
}

/**
 * Sums the informed value applying the correction factor for better precision and the correspondent weight
 * @param values this list of objects where the values and weights come from
 * @param valueKey the property name from where to get the value
 * @param weightKey the property name from where to get the weight
 * @param correctionFactor a power of 10. The number of zeroes is the number of decimal places you want as precision
 * @returns the sum
 */
export function weightSumObj<
	T,
	ValueKey extends KeysOfType<T, string | number>,
	WeightKey extends KeysOfType<T, string | number>
>(
	values: T[],
	valueKey: ValueKey,
	weightKey: WeightKey,
	correctionFactor: number = defaultCorrectionFactor,
): number {
	let acc = 0;
	const { length } = values;
	for (let i = 0; i < length; i++) {
		const x = values[i];
		acc +=
			((x[valueKey] as unknown) as number) *
			correctionFactor *
			((x[weightKey] as unknown) as number);
	}
	return acc / correctionFactor;
}

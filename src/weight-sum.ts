import { round } from './round';
import { digits, precision } from './types';

type ValueWithWeight<
	ValueKey extends string | number | symbol,
	WeightKey extends string | number | symbol
> = {
	[k in ValueKey | WeightKey]: number;
};

export function weightSum<
	T extends ValueWithWeight<ValueKey, WeightKey>,
	ValueKey extends keyof T,
	WeightKey extends keyof T
>(origin: T[], getValue: ValueKey, getWeight: WeightKey): number;
export function weightSum(
	values: (number | string)[],
	weights: (number | string)[],
): number;
export function weightSum<
	T extends ValueWithWeight<ValueKey, WeightKey>,
	ValueKey extends keyof T,
	WeightKey extends keyof T
>(
	values: (T | number | string)[],
	weightsOrValueKey: ValueKey | (number | string)[],
	weightKey?: WeightKey,
) {
	return round(
		values.reduce(
			weightKey
				? (acc: number, x) =>
						acc +
						(x as T)[weightsOrValueKey as ValueKey] *
							precision *
							(x as T)[weightKey]
				: (acc: number, x, i) =>
						acc +
						(x as number) *
							precision *
							((weightsOrValueKey as (number | string)[])[i] as number),
			0,
		) / precision,
		digits,
	);
}

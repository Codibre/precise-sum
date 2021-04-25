import { round } from './round';
import { digits, precision } from './types';

export function sum(values: (number | string)[]) {
	return round(
		values.reduce((acc: number, x) => acc + (x as number) * precision, 0) /
			precision,
		digits,
	);
}

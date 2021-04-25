import { weightSum } from '../../src';

function rangeCalc(digits: number) {
	const factor = 10 ** digits;
	for (let i = 0; i < factor - 1; i++) {
		for (let j = 0; j < factor - 1; j++) {
			const n1 = `.${i.toString().padStart(digits, '0')}`;
			const n2 = `.${j.toString().padStart(digits, '0')}`;

			const real = `${n1}*3 + ${n2}*7 = ${weightSum(
				[n1, n2],
				[3, 7],
			).toString()}`;

			const base = i * 3 + j * 7;
			const decs = Math.floor(base % factor);
			const expected = `${n1}*3 + ${n2}*7 = ${Math.floor(base / factor)}${
				decs > 0 ? '.' : ''
			}${
				decs > 0 ? decs.toString().padStart(digits, '0').replace(/0+$/, '') : ''
			}`;
			expect(real).toBe(expected);
		}
	}
}

describe(weightSum.name, () => {
	const baseTest = [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9];
	const weights = [10, 2, 3, 4, 5, 6, 7, 8, 9];

	it('should weight sum with array of weights', () => {
		expect(weightSum(baseTest, weights).toString()).toBe('83.4');
	});

	it('should preserve right decimal places with weight sum for values with 2 decimal places', () => {
		rangeCalc(2);
	});

	it('should preserve right decimal places with weight sum for values with 3 decimal places', () => {
		rangeCalc(3);
	});
});

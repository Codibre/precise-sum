import { weightSumObj } from '../../src';

function rangeCalc(digits: number) {
	const factor = 10 ** digits;
	for (let i = 0; i < factor - 1; i++) {
		for (let j = 0; j < factor - 1; j++) {
			const n1 = `.${i.toString().padStart(digits, '0')}`;
			const n2 = `.${j.toString().padStart(digits, '0')}`;

			const real = `${n1}*3 + ${n2}*7 = ${weightSumObj(
				[
					{
						value: n1,
						weight: 3,
					},
					{
						value: n2,
						weight: 7,
					},
				],
				'value',
				'weight',
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

describe(weightSumObj.name, () => {
	const baseTest = [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9];
	const weights = [10, 2, 3, 4, 5, 6, 7, 8, 9];
	const weightedList = baseTest.map((value, i) => ({
		value,
		weight: weights[i],
	}));

	it('should weight sum if array of objects containing value and weight', () => {
		expect(weightSumObj(weightedList, 'value', 'weight').toString()).toBe(
			'83.4',
		);
	});

	it('should preserve right decimal places with weight sum for values with 2 decimal places', () => {
		rangeCalc(2);
	});

	it('should preserve right decimal places with weight sum for values with 3 decimal places', () => {
		rangeCalc(3);
	});
});

import { sum } from '../../src';

function rangeCalc(digits: number) {
	const factor = 10 ** digits;
	for (let i = 0; i < factor - 1; i++) {
		for (let j = 0; j < factor - 1; j++) {
			const n1 = `.${i.toString().padStart(digits, '0')}`;
			const n2 = `.${j.toString().padStart(digits, '0')}`;
			const real = `${n1} + ${n2} = ${sum([n1, n2]).toString()}`;
			const base = i + j;
			const decs = Math.floor(base % factor);
			const expected = `${n1} + ${n2} = ${Math.floor(base / factor)}${
				decs > 0 ? '.' : ''
			}${
				decs > 0 ? decs.toString().padStart(digits, '0').replace(/0+$/, '') : ''
			}`;
			expect(real).toBe(expected);
		}
	}
}

describe(sum.name, () => {
	const baseTest = [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9];

	it('plus should work', () => {
		expect(sum(baseTest).toString()).toBe('13.5');
	});

	it('should preserve right decimal places summing numbers with 2 decimal places', () => {
		rangeCalc(2);
	});

	it('should preserve right decimal places summing numbers with 3 decimal places', () => {
		rangeCalc(3);
	});
});

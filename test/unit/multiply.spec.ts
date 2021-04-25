import { multiply } from '../../src';

function rangeCalc(digits: number) {
	const factor = 10 ** digits;
	const factor2 = factor * factor;
	const digits2 = digits * 2;
	for (let i = 1; i < factor - 1; i++) {
		for (let j = 1; j < factor - 1; j++) {
			const n1 = `.${i.toString().padStart(digits, '0')}`;
			const n2 = `.${j.toString().padStart(digits, '0')}`;
			const real = `${n1} * ${n2} = ${multiply([n1, n2]).toString()}`;
			const base = i * j;
			const decs = Math.floor(base % factor2);
			const expected = `${n1} * ${n2} = ${Math.floor(base / factor2)}${
				decs > 0 ? '.' : ''
			}${
				decs > 0
					? decs.toString().padStart(digits2, '0').replace(/0+$/, '')
					: ''
			}`;
			expect(real).toBe(expected);
		}
	}
}

describe(multiply.name, () => {
	const baseTest = [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9];

	it('plus should work', () => {
		expect(multiply(baseTest).toString()).toBe('33.52212864');
	});

	it('should preserve right decimal places summing numbers with 2 decimal places', () => {
		rangeCalc(2);
	});

	it('should preserve right decimal places summing numbers with 3 decimal places', () => {
		rangeCalc(3);
	});
});

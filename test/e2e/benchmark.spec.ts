import Benchmark = require('benchmark');
import { Big } from 'big.js';
import { Decimal } from 'decimal.js';
import { multiply, sum, weightSum, weightSumObj } from '../../src';

function output(
	results: string[],
	wrapper: { log: string },
): Function | undefined {
	return function (this: Benchmark) {
		console.log(`${this.name}
-----------------------------
${results}
${wrapper.log}
`);
	};
}

describe('sum Benchmark', () => {
	const baseTest = [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9];
	const weights = [10, 2, 3, 4, 5, 6, 7, 8, 9];
	const weightedList = baseTest.map((value, i) => ({
		value,
		weight: weights[i],
	}));

	it('should win at weighted sum all', () => {
		const wrapper = { log: '' };
		const results: string[] = [];
		const benchmarkSuite = new Benchmark.Suite('sum');
		benchmarkSuite
			.add('using reduce: just sum', () => {
				results[0] = baseTest.reduce((acc, a) => acc + a, 0).toFixed(1);
			})
			.add('using for: just sum', () => {
				let acc = 0;
				const { length } = baseTest;
				for (let i = 0; i < length; i++) {
					acc += baseTest[i];
				}
				acc.toFixed(1);
			})
			.add('multiply-sum-divide', () => {
				results[1] = sum(baseTest).toString();
			})
			.add('big.js', () => {
				results[2] = baseTest
					.reduce((acc, x) => acc.add(x), new Big(0))
					.toString();
			})
			.add('decimal.js', () => {
				results[2] = baseTest
					.reduce((acc, x) => acc.add(x), new Decimal(0))
					.toString();
			})
			.on('cycle', function (event: any) {
				wrapper.log += `${event.target}\n`;
			})
			.on('complete', output(results, wrapper))
			.run();
	});

	it('should win at weighted multiply all', () => {
		const wrapper = { log: '' };
		const results = ['', '', '', ''];
		const benchmarkSuite = new Benchmark.Suite('multiply');
		benchmarkSuite
			.add('using reduce: just multiply', () => {
				results[0] = baseTest.reduce((acc, a) => acc * a, 1).toString();
			})
			.add('using for: just multiply', () => {
				let acc = 1;
				const { length } = baseTest;
				for (let i = 0; i < length; i++) {
					acc *= baseTest[i];
				}
				acc.toString();
			})
			.add('multiply-multiply-divide', () => {
				results[1] = multiply(baseTest).toString();
			})
			.on('cycle', function (event: any) {
				wrapper.log += `${event.target}\n`;
			})
			.on('complete', output(results, wrapper))
			.run();
	});

	it('should win at weighted sum all', () => {
		const wrapper = { log: '' };
		const results = ['', '', '', ''];
		const benchmarkSuite = new Benchmark.Suite('weightSum');
		benchmarkSuite
			.add('using reduce: just multiplyWeight-sum', () => {
				results[0] = baseTest
					.reduce((acc, a, i) => acc + a * weights[i], 0)
					.toFixed(1);
			})
			.add('using for: just multiplyWeight-sum', () => {
				let acc = 0;
				const { length } = baseTest;
				for (let i = 0; i < length; i++) {
					acc += baseTest[i] * weights[i];
				}
				acc.toFixed(1);
			})
			.add('using reduce: multiplyWeight-multiply-sum-divide', () => {
				results[1] = (
					baseTest.reduce((acc: number, x, i) => acc + x * weights[i] * 10, 0) /
					10
				).toFixed(1);
			})
			.add('using for: multiplyWeight-multiply-sum-divide', () => {
				let acc = 0;
				const { length } = baseTest;
				for (let i = 0; i < length; i++) {
					acc += baseTest[i] * baseTest[i] * 10;
				}
				(acc / 10).toFixed(1);
			})
			.add('multiply-multiplyWeight-sum-divide', () => {
				results[2] = weightSum(baseTest, weights).toString();
			})
			.add('key mode: multiply-multiplyWeight-sum-divide', () => {
				results[3] = weightSumObj(weightedList, 'value', 'weight').toString();
			})
			.on('cycle', function (event: any) {
				wrapper.log += `${event.target}\n`;
			})
			.on('complete', output(results, wrapper))
			.run();
		expect(results[0]).toBe(results[1]);
		expect(results[2]).toBe(results[3]);
	});
});

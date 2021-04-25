import Benchmark = require('benchmark');
import { sum, weightSum, weightSumObj } from '../../src';

describe('sum Benchmark', () => {
	const baseTest = [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9];
	const weights = [10, 2, 3, 4, 5, 6, 7, 8, 9];
	const weightedList = baseTest.map((value, i) => ({
		value,
		weight: weights[i],
	}));

	it('should win at weighted sum all', () => {
		let log = '';
		const results = ['', '', '', ''];
		const benchmarkSuite = new Benchmark.Suite();
		benchmarkSuite
			.add('just sum', () => {
				results[0] = baseTest.reduce((acc, a) => acc + a, 0).toFixed(1);
			})
			.add('multiply-sum-divide', () => {
				results[1] = sum(baseTest).toString();
			})
			.on('cycle', function (event: any) {
				log += `${event.target}\n`;
			})
			.on('complete', function (this: any) {
				console.log(results);
				console.log(log);
			})
			.run();
	});

	it('should win at weighted sum all', () => {
		let log = '';
		const results = ['', '', '', ''];
		const benchmarkSuite = new Benchmark.Suite();
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
				log += `${event.target}\n`;
			})
			.on('complete', function (this: any) {
				console.log(results);
				console.log(log);
			})
			.run();
		expect(results[0]).toBe(results[1]);
		expect(results[2]).toBe(results[3]);
	});
});

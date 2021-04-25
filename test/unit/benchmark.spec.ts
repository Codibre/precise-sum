import Benchmark = require('benchmark');
import { sum, weightSum } from '../../src';

describe('sum Benchmark', () => {
	const baseTest = [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9];
	const weights = [10, 2, 3, 4, 5, 6, 7, 8, 9];
	const weightedList = baseTest.map((value, i) => ({
		value,
		weight: weights[i],
	}));

	it('plus should work', () => {
		weightSum(baseTest, weights).toString();
	});

	it('plus should work', () => {
		sum(baseTest).toString();
	});

	it('should preserve right decimal places', () => {
		for (let i = 1; i < 100; i++) {
			for (let j = 1; j < 100; j++) {
				const n1 = `.${i.toString().padStart(4, '0')}`;
				const n2 = `.${j.toString().padStart(4, '0')}`;
				const real = `${n1} + ${n2} = ${sum([n1, n2]).toString()}`;
				const expected = `${n1} + ${n2} = ${Math.floor(
					(i + j) / 10000,
				)}.${Math.floor((i + j) % 10000)
					.toString()
					.padStart(4, '0')
					.replace(/0+$/, '')}`;
				expect(real).toBe(expected);
			}
		}
	});

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
			.add('just multiplyWeight-sum', () => {
				results[0] = baseTest
					.reduce((acc, a, i) => acc + a * weights[i], 0)
					.toFixed(1);
			})
			.add('multiplyWeight-multiply-sum-divide', () => {
				results[1] = (
					baseTest.reduce((acc: number, x, i) => acc + x * weights[i] * 10, 0) /
					10
				).toFixed(1);
			})
			.add('multiply-multiplyWeight-sum-divide', () => {
				results[2] = weightSum(baseTest, weights).toString();
			})
			.add('key mode: multiply-multiplyWeight-sum-divide', () => {
				results[3] = weightSum(weightedList, 'value', 'weight').toString();
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
});

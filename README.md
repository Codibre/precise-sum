[![Actions Status](https://github.com/Codibre/preciser-calc/workflows/build/badge.svg)](https://github.com/Codibre/preciser-calc/actions)
[![Actions Status](https://github.com/Codibre/preciser-calc/workflows/test/badge.svg)](https://github.com/Codibre/preciser-calc/actions)
[![Actions Status](https://github.com/Codibre/preciser-calc/workflows/lint/badge.svg)](https://github.com/Codibre/preciser-calc/actions)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c1bd4feb41e9cedd4644/test_coverage)](https://codeclimate.com/github/Codibre/preciser-calc/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/c1bd4feb41e9cedd4644/maintainability)](https://codeclimate.com/github/Codibre/preciser-calc/maintainability)
[![Packages](https://david-dm.org/Codibre/preciser-calc.svg)](https://david-dm.org/Codibre/preciser-calc)
[![npm version](https://badge.fury.io/js/%40codibre%2Fboilerplate-base.svg)](https://badge.fury.io/js/%40codibre%2Fboilerplate-base)

This lib aims to provider faster sum and multiplication operations preserving a good precision with little overload.

Our [benchmark tests](https://github.com/Codibre/preciser-calc/actions/workflows/test-e2e.yml) have shown that preciser-calc **sum** and **weightSum** operation are around 5 times faster than just sum all numbers when dealing with numbers with decimal fractions, and our [tests](https://github.com/Codibre/preciser-calc/actions/workflows/test.yml) shows that the operations keep precision up to 3 decimal places, which avoid a lot of headache in most monetary cases that deals only with 2!
The multiplication is much slower than the vanilla one, but still, it is 5 times faster than **big.js** or **decimal.js** version. Keep in mind that those libraries prioritize precision, while this one provides a better precision than vanilla, but not loosing performance (or even gaining in some cases). It's meant to be used in no edge cases where we want to mitigate some floating math problems just enough.

## How to Install

```
npm i preciser-calc
```

## How to use it

To sum:
```ts
const result = sum([value1, value2, value3, value4, value5]);
```

To sum with an arbitrary precision:
```ts
const result = sum([value1, value2, value3, value4, value5], 10000);
```
It's ideal for the precision factor to be a power of 10, but any number will work (for the better or the worst). The number of zeroes, ie, the 10 exponent, will be the number of places sum will try to preserve precision. The default precision factor is 1000.
Keep in mind that this operation doesn't check the max safe integer limit, and the precision factor will be multiplied by your operands, so, if any number get bigger than 2^52, you can loose precision.
The same is valid for the weightSum:
```ts
// weight array version
const result = weightSum([value1, value2, value3, value4, value5], [weight1, weight2, weight3, weight4, weight5], 10000 /* optional, default 1000 */);
// object array version
const result = weightSumObj([{ price: 100.14, qty: 2 }, { price: 12.54, qty: 1.5 }, { price: 7.49, qty: 3.7 }], 'price', 'value', 10000 /* optional, default 1000 */);
```

A multiplication using a precision factor is also implemented:
```ts
const result = multiply([value1, value2, value3, value4, value5], 10000 /* optional, default 1000 */)
```

This multiplication have no problem with the number multiplied by the precision factor, was with sum and sumWeight, but if the numbers get too big it'll use **bigint** to preserve the most precision possible, and that'll be no good for heavy math processing as bigint is solved in **O(n)**, not **O(1)** as numbers, so, use it with caution.

Finally, if you're dealing with numbers with more than 3 decimal places, this lib still can be useful for you, but some calculation or other can get a little noise from floating math. To fix it, you can use our **round** function:

```ts
const factor = 1000000;
const result = round(sum([value1, value2, value3, value4, value5], factor), factor);
```

We still can't mathematically guarantee this, but, every repeating decimal we got when using a power of 10 factor are like x.xx0000000000n, when bigger than the expected result, or x.xx999999999999n, when lesser. In this case, round will get you the right result for your precision. Also, we tested the combination of round and sum and it for 6 x slower than vanilla, which is pretty great, because it is more then 1 million ops/sec (50x faster than big.js, for example).

## License

Licensed under [MIT](https://en.wikipedia.org/wiki/MIT_License).

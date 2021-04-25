fluent-iterable - v0.1.1

# fluent-iterable - v0.1.1

## Table of contents

### Variables

- [defaultCorrectionFactor](README.md#defaultcorrectionfactor)
- [defaultDigits](README.md#defaultdigits)
- [maxSafeFactor](README.md#maxsafefactor)
- [maxSafeInteger](README.md#maxsafeinteger)

### Functions

- [multiply](README.md#multiply)
- [round](README.md#round)
- [sum](README.md#sum)
- [weightSum](README.md#weightsum)
- [weightSumObj](README.md#weightsumobj)

## Variables

### defaultCorrectionFactor

• `Const` **defaultCorrectionFactor**: *number*

___

### defaultDigits

• `Const` **defaultDigits**: ``3``= 3

___

### maxSafeFactor

• `Const` **maxSafeFactor**: ``1e+24``= 1e24

___

### maxSafeInteger

• `Const` **maxSafeInteger**: *bigint*

## Functions

### multiply

▸ **multiply**(`values`: (*number* \| *string*)[], `correctionFactor?`: *number*): *number*

Sums the informed value applying the correction factor for better precision

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | (*number* \| *string*)[] | the list of values to sum |
| `correctionFactor` | *number* | a power of 10. The number of zeroes is the number of decimal places you want as precision |

**Returns:** *number*

the sum

___

### round

▸ **round**(`value`: *number*, `decimalPlaces?`: *number*): *number*

Round value for the specified number of de

#### Parameters:

| Name | Type |
| :------ | :------ |
| `value` | *number* |
| `decimalPlaces` | *number* |

**Returns:** *number*

___

### sum

▸ **sum**(`values`: (*number* \| *string*)[], `correctionFactor?`: *number*): *number*

Sums the informed value applying the correction factor for better precision

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | (*number* \| *string*)[] | the list of values to sum |
| `correctionFactor` | *number* | a power of 10. The number of zeroes is the number of decimal places you want as precision |

**Returns:** *number*

the sum

___

### weightSum

▸ **weightSum**(`values`: (*number* \| *string*)[], `weights`: (*number* \| *string*)[], `correctionFactor?`: *number*): *number*

Sums the informed value applying the correction factor for better precision and the correspondent weight

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | (*number* \| *string*)[] | the list of values to sum |
| `weights` | (*number* \| *string*)[] | the list of weights to apply |
| `correctionFactor` | *number* | a power of 10. The number of zeroes is the number of decimal places you want as precision |

**Returns:** *number*

the sum

___

### weightSumObj

▸ **weightSumObj**<T, ValueKey, WeightKey\>(`values`: T[], `valueKey`: ValueKey, `weightKey`: WeightKey, `correctionFactor?`: *number*): *number*

Sums the informed value applying the correction factor for better precision and the correspondent weight

#### Type parameters:

| Name | Type |
| :------ | :------ |
| `T` | - |
| `ValueKey` | *string* \| *number* \| *symbol* |
| `WeightKey` | *string* \| *number* \| *symbol* |

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | T[] | this list of objects where the values and weights come from |
| `valueKey` | ValueKey | the property name from where to get the value |
| `weightKey` | WeightKey | the property name from where to get the weight |
| `correctionFactor` | *number* | a power of 10. The number of zeroes is the number of decimal places you want as precision |

**Returns:** *number*

the sum

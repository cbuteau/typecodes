
# Concept

Basically the closest type evaluation system for the basic types the JavaScript language supports.

The first thing is type comparison should be an INT comparison.
I don't like string comparison's for types.  It may make readable code but it is inefficient.

Get running as library and testing as a library first.

Get tests running in 4 browsers...then travis it then publish it...

# Badges

### Coveralls

[![Coverage Status](https://coveralls.io/repos/github/cbuteau/typecodes/badge.svg)](https://coveralls.io/github/cbuteau/typecodes)

### Circle CI Build

[![CircleCI](https://circleci.com/gh/cbuteau/typecodes.svg?style=svg)](https://circleci.com/gh/cbuteau/typecodes)

### npm Version

[![npm version](http://img.shields.io/npm/v/typecodes.svg?style=flat)](https://npmjs.org/package/typecodes "View this project on npm")


### npm big badge

[![NPM](https://nodei.co/npm/typecodes.png)](https://nodei.co/npm/typecodes/)


# Interface

```JavaScript
CODES = {
  BOOLEAN: 0,
  NUMBER: 1,
  STRING: 2,
  FUNCTION: 3,
  OBJECT: 4,
  UNDEFINED: 5,
  NULL: 6,
  DATE: 7,
  ARRAY: 8,
  UNMAPPED: 9
};

get(value);
// var code = tc.getTypeCode('this data');

is(value, typecode);
// if (tc.isTypeOF(13, tc.CODES.NUMBER))

validateFunction(value, paramCount)
// if (tc.validateFunction(callback, 2)) {
//   callback(this, 'success');
// }
```


# Status

12/4/2018

Cleanuped tests simplified interface.

later
we tried to derive from number so toString would return what the typecode is..
but failed and exposed anothe method not quite tested.

12/28/2018

tried instanceof then debugger would not load scripts...

3/30/2019

Cleaned up a little of karma running but it is still not running the tests in karma.
the its are not being fired..

## 6/8/2019

migrated tests to jasmine Karma
got building on circle ci.

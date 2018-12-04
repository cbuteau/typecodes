
# Concept

Basically the closest type evaluation system for the basic types the JavaScript language supports.

The first thing is type comparison should be an INT comparison.
I don't like string comparison's for types.  It may make readable code but it is inefficient.

Get running as library and testing as a library first.

Get tests running in 4 browsers...then travis it then publish it...



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

getTypeCode(value);
// var code = tc.getTypeCode('this data');

isTypeOf(value, typecode);
// if (tc.isTypeOF(13, tc.CODES.NUMBER))
```

# TODO

Get IStanbul coverage working
https://github.com/testem/testem/tree/master/examples/coverage_istanbul

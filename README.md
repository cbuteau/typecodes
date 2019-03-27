
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

get(value);
// var code = tc.getTypeCode('this data');

is(value, typecode);
// if (tc.isTypeOF(13, tc.CODES.NUMBER))

validateFunction(value, paramCount)
// if (tc.validateFunction(callback, 2)) {
//   callback(this, 'success');
// }
```

# TODO

Get IStanbul coverage working
https://github.com/testem/testem/tree/master/examples/coverage_istanbul

# Status

12/4/2018

Cleanuped tests simplified interface.

later
we tried to derive from number so toString would return what the typecode is..
but failed and exposed anothe method not quite tested.

12/28/2018

tried instanceof then debugger would not load scripts...

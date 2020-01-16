

describe('Compare tests', function() {

  it ('Bool equal', function() {
    expect(tc.compare(true, false)).toBe(false);

    expect(tc.compare(true, true)).toBe(true);
    expect(tc.compare(false, false)).toBe(true);
  });

  it ('Number', function() {
    expect(tc.compare(2, 1)).toBe(false);
    expect(tc.compare(2, 2)).toBe(true);

    expect(tc.compare(2.001, 2.002)).toBe(true);

  });

  it ('Undefined', function() {
    var testUndefined;
    var testNull = null;
    expect(tc.compare(testUndefined, testNull)).toBe(false);

    var testUndefOne;
    var testUndefTwo;

    expect(tc.compare(testUndefOne, testUndefTwo)).toBe(true);

  });

  it ('Null', function() {
    var testNull = null;
    var testNumber = 3;
    expect(tc.compare(testNull, testNumber)).toBe(false);

    var testNullOne = null;
    var testNullTwo = null;
    expect(tc.compare(testNullOne, testNullTwo)).toBe(true);

  });

  it ('Object', function() {
    var testObj = {
      one: true,
      two: 3.14,
      three: 'A dog'
    };
    var testNumber = 3;
    expect(tc.compare(testObj, testNumber)).toBe(false);

    var testObjOne = {
      one: true,
      two: 3.14,
      three: 'A dog'
    };

    var testObjTwo = {
      one: true,
      two: 3.14,
      three: 'A dog'
    };
    expect(tc.compare(testObjOne, testObjTwo)).toBe(true);
  });


  it ('Object depth', function() {
    var testObjOne = {
      one: true,
      two: 3.14,
      three: 'A dog',
      array: [0,1,2,3],
      anotherObj: {
        params: {
          one: 'a',
          two: 'b'
        }
      }
    };

    var testObjTwo = {
      one: true,
      two: 3.14,
      three: 'A dog',
      array: [0,1,2,3],
      anotherObj: {
        params: {
          one: 'a',
          two: 'b'
        }
      }
    };
    expect(tc.compare(testObjOne, testObjTwo)).toBe(true);
  });

});

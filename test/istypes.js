


describe('Test is each type...', function() {
  it('object', function() {
    var obj = {};

    expect(tc.is(obj, tc.CODES.OBJECT)).toBe(true);
  });

  it('number', function() {
    var obj = 3.14;

    expect(tc.is(obj, tc.CODES.NUMBER)).toBe(true);
  });

  it('undefined', function() {
    var obj;

    expect(tc.is(obj, tc.CODES.UNDEFINED)).toBe(true);
  });

  it('null', function() {
    var obj = null;

    expect(tc.is(obj, tc.CODES.NULL)).toBe(true);
  });

  it('string', function() {
    var obj = 'a short string';

    expect(tc.is(obj, tc.CODES.STRING)).toBe(true);
  });

  it('function', function() {
    var obj = function() {};

    expect(tc.is(obj, tc.CODES.FUNCTION)).toBe(true);
  });


  it('date', function() {
    var obj = new Date('12/11/1971');

    expect(tc.is(obj, tc.CODES.DATE)).toBe(true);
  });

  it('array', function() {
    var obj = [1,2,4];

    expect(tc.is(obj, tc.CODES.ARRAY)).toBe(true);
  });

  it('regex', function() {
    var obj = /\d+/;

    expect(tc.is(obj, tc.CODES.REGEX)).toBe(true);
  });

});

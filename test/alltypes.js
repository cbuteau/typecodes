/* es-lint jasmine */

describe('Test each type...', function() {
  it('object', function() {
    var obj = {};

    var code = tc.get(obj);
    expect(code).toBe(tc.CODES.OBJECT);
  });

  it('number', function() {
    var obj = 3.14;

    var code = tc.get(obj);
    expect(code).toBe(tc.CODES.NUMBER);
  });

  it('boolean', function() {
    var boolTrue = true;
    var boolFalse = false;

    var codeTrue = tc.get(boolTrue);
    var codeFalse = tc.get(boolTrue);

    expect(codeTrue).toBe(tc.CODES.BOOLEAN);
    expect(codeFalse).toBe(tc.CODES.BOOLEAN);
  });

  it('undefined', function() {
    var obj;

    var code = tc.get(obj);
    expect(code).toBe(tc.CODES.UNDEFINED);
  });

  it('null', function() {
    var obj = null;

    var code = tc.get(obj);
    expect(code).toBe(tc.CODES.NULL);
  });

  it('string', function() {
    var obj = 'a short string';

    var code = tc.get(obj);
    expect(code).toBe(tc.CODES.STRING);
  });

  it('function', function() {
    var obj = function() {};

    var code = tc.get(obj);
    expect(code).toBe(tc.CODES.FUNCTION);
  });


  it('date', function() {
    var obj = new Date('12/11/1971');

    var code = tc.get(obj);
    expect(code).toBe(tc.CODES.DATE);
  });

  it('array', function() {
    var obj = [1,2,4];

    var code = tc.get(obj);
    expect(code).toBe(tc.CODES.ARRAY);
  });
});

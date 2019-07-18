

describe('Test debug strings...', function() {
  it('object', function() {
    var obj = {};

    var code = tc.get(obj);
    expect(tc.str(code)).toBe('object');
  });

  it('number', function() {
    var obj = 3.14;

    var code = tc.get(obj);
    expect(tc.str(code)).toBe('number');
  });

  it('undefined', function() {
    var obj;

    var code = tc.get(obj);
    expect(tc.str(code)).toBe('undefined');
  });

  it('null', function() {
    var obj = null;

    var code = tc.get(obj);
    expect(tc.str(code)).toBe('null');
  });

  it('string', function() {
    var obj = 'a short string';

    var code = tc.get(obj);
    expect(tc.str(code)).toBe('string');
  });

  it('function', function() {
    var obj = function() {};

    var code = tc.get(obj);
    expect(tc.str(code)).toBe('function');
  });


  it('date', function() {
    var obj = new Date('12/11/1971');

    var code = tc.get(obj);
    expect(tc.str(code)).toBe('date');
  });

  it('array', function() {
    var obj = [1,2,4];

    var code = tc.get(obj);
    expect(tc.str(code)).toBe('array');
  });

  it('regex', function() {
    var obj = /\d+/;

    var code = tc.get(obj);
    expect(tc.str(code)).toBe('regex');
  });

});

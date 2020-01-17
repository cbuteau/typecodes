
describe('isFloat', function() {

  it ('Positive', function() {
    var TEST_E =2.71828182845904523536;

    expect(tc.isFloat(Math.PI)).toBe(true);

    expect(tc.isFloat(TEST_E)).toBe(true);
  });

  it ('Negative', function() {
    var TEST_E = '2.71828182845904523536';

    expect(tc.isFloat(Math.PI + '')).toBe(false);

    expect(tc.isFloat(TEST_E)).toBe(false);


    expect(tc.isFloat("a dog")).toBe(false);

    var undef;


    expect(tc.isFloat(undef)).toBe(false);
    var isnull = null;
    expect(tc.isFloat(isnull)).toBe(false);


  });


});

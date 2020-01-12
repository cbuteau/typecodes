

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



});

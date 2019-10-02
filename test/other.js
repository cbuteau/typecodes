
describe('Other functions', function() {


  it ('is Empty', function() {
      var objUndef;
      var objNull = null;

      expect(tc.isNotThere(objUndef)).toBe(true);
      expect(tc.isNotThere(objNull)).toBe(true);
  });
});

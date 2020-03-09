
describe('has', function() {


  it ('pass', function() {
      var objParams = {
        data: {
          id: 666
        },
        onComplete: function(data) {
          //parse and diaply
        },
        onFailure: function(err) {
          //report and log error
        }
      };
      var objPropMap = {
        data: tc.CODES.OBJECT,
        onComplete: tc.CODES.FUNCTION,
        onFailure: tc.CODES.FUNCTION,
      };

      expect(tc.has(objParams, objPropMap)).toBe(true);
  });

  it ('ffail', function() {
      var objParams = {
        data: {
          id: 666
        },
        onComplete: function(data) {
          //parse and diaply
        }
      };
      var objPropMap = {
        data: tc.CODES.OBJECT,
        onComplete: tc.CODES.FUNCTION,
        onFailure: tc.CODES.FUNCTION,
      };

      expect(tc.has(objParams, objPropMap)).toBe(false);
  });

});

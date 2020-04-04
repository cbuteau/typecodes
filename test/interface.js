/* es-lint jasmine */

describe('hasInterface', function() {


  it ('is Empty', function() {
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
      var objInterface = {
        onComplete: function(data) {
          //parse and diaply
        },
        onFailure: function(err) {
          //report and log error
        }
      };

      expect(tc.hasInterface(objParams, objInterface)).toBe(true);
  });
});

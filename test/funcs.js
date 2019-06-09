
// require exists in NodeJs
// if (typeof require === 'function')
// {
//   var tc = require('../typecodes');
// }

describe('Tests variations on function parameters', function() {
  it ('parameters 1', function() {
    var func1 = function(param) {};
    expect(tc.validateFunction(func1, 1)).toBe(true);
  });
  it ('parameters 2', function() {
    var func2 = function(param1, param2) {};
    expect(tc.validateFunction(func2, 2)).toBe(true);
  });
  it ('parameters 3', function() {
    var func3 = function(param1, param2, param3) {};
    expect(tc.validateFunction(func3, 3)).toBe(true);
  });

  it ('parameters 4', function() {
    var func4 = function(param1, param2, param3, param4) {};
    expect(tc.validateFunction(func4, 4)).toBe(true);
  });
  it ('parameters 5', function() {
    var func5 = function(param1, param2, param3, param4, param5) {};
    expect(tc.validateFunction(func5, 5)).toBe(true);
  });
  it ('parameters 6', function() {
    var func6 = function(param1, param2, param3, param4, param5, param6) {};
    expect(tc.validateFunction(func6, 6)).toBe(true);
  });
  it ('parameters 7', function() {
    var func7 = function(param1, param2, param3, param4, param5, param6, param7) {};
    expect(tc.validateFunction(func7, 7)).toBe(true);
  });

});

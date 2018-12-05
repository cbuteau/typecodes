//var tc = require('../typecodes');

// require exists in NodeJs
if (typeof require === 'function')
{
  var tc = require('../typecodes');
}

describe('A basic set of tests', function() {
  it('get TypeCode', function() {
    var obj = {};

    var code = tc.get(obj);
    expect(code).toBe(tc.CODES.OBJECT);
  });

  it ('is Type', function() {
    var value = {};
    expect(tc.is(value, tc.CODES.OBJECT)).toBe(true);
  });

  it ('is Func 1', function() {
    var value = function(param) {};
    expect(tc.validateFunction(value, 1)).toBe(true);
  });
});

/*
if (typeof define !== 'function') { var define = require('amdefine')(module) }


define(['../typecodes'], function(tc) {
  describe('A basic set of tests', function() {
    it('get TypeCode', function() {
      var obj = {};

      var code = tc.getTypeCode(obj);
    });
  });
});
*/

'use strict';

//if (typeof define !== 'function') { var define = require('amdefine'); }

var TYPECODES = {
  BOOLEAN: 0,
  NUMBER: 1,
  STRING: 2,
  FUNCTION: 3,
  OBJECT: 4,
  UNDEFINED: 5,
  NULL: 6,
  DATE: 7,
  ARRAY: 8,
  UNMAPPED: 9,
  REGEX: 10
};

Object.freeze(TYPECODES);

var DEFAULT_EPSILON = 0.001;

function debugStringForTypeCode(typecode) {
  var result = 'unmapped';
  switch (typecode) {
    case TYPECODES.ARRAY:
      result = 'array';
      break;
    case TYPECODES.BOOLEAN:
      result = 'boolean';
      break;
    case TYPECODES.DATE:
      result = 'date';
      break;
    case TYPECODES.FUNCTION:
      result = 'function';
      break;
    case TYPECODES.NULL:
      result = 'null';
      break;
    case TYPECODES.NUMBER:
      result = 'number';
      break;
    case TYPECODES.OBJECT:
      result = 'object';
      break;
    case TYPECODES.REGEX:
      result = 'regex';
      break;
    case TYPECODES.STRING:
      result = 'string';
      break;
    case TYPECODES.UNDEFINED:
      result = 'undefined';
      break;
    case TYPECODES.UNMAPPED:
    default:
      /* istanbul ignore next */
      result = 'unmapped';
      /* istanbul ignore next */
      break;
  }

  return result;
}

function getTypeCode(value) {
  var result;
  // Undefined
  if (value === undefined) {
    //result = TYPECODES.UNDEFINED;
    //result.toString = debugStringForTypeCode;
    return TYPECODES.UNDEFINED;
  }
  // Null
  if (value === null) {
    return TYPECODES.NULL;
  }
  // Boolean
  if ((value === true) || (value === false)) {
    return TYPECODES.BOOLEAN;
  }
  // Function
  if (value.apply && value.call && value.bind) {
    return TYPECODES.FUNCTION;
  }
  // Date
  if (value.getDay && value.getYear && value.getMonth && value.getHours && value.getMinutes && value.getSeconds) {
    return TYPECODES.DATE;
  }
  // Number
  if (value.toString && value.valueOf && value.toPrecision) {
    return TYPECODES.NUMBER;
  }
  // string
  if (value.trim && value.indexOf && value.toLowerCase && value.toUpperCase) {
    return TYPECODES.STRING;
  }
  // ARRAY
  if (value.map && value.indexOf && value.push && value.slice) {
    // if (value.copyWithin && value.entries && value.find) {
    //   // typedarray
    //   // we migth have to swicth to instanceof here.
    //   if (value instanceof Array) {
    //     //console.log('Vanilla Array');
    //   } else if (value instanceof TypedArray) {
    //     //console.log('typed array');
    //   }
    // }
    return TYPECODES.ARRAY;
  }

  if (value.test && value.exec) {
    return TYPECODES.REGEX;
  }
  // OBJECT
  if (value.isPrototypeOf && value.hasOwnProperty && value.toString) {
    return TYPECODES.OBJECT;
  }

  /* istanbul ignore next */
  return TYPECODES.UNMAPPED;
}

function isTypeCode(value, code) {
  return getTypeCode(value) === code;
}

function validateFunction(func, paramCount) {
  var computed = getTypeCode(func);
  return (computed === TYPECODES.FUNCTION) && (func.length === paramCount);
}

function isNotThere(value) {
  var code = getTypeCode(value);
  return code === TYPECODES.UNDEFINED || code === TYPECODES.NULL;
}

function isFloat(value) {
  return value % 1 !== 0;
}

function compareFloats(floatOne, floatTwo, options) {
   return (Math.abs(floatOne - floatTwo) < options.epsilon);
}

function compareArray(arrayOne, arrayTwo) {
  var test;
  for (var i = 0; i < arrayOne.length; i++) {
    test = compareObject(arrayOne[i], arrayTwo[i]);
    if (!test) {
      break;
    }
  }
  return test;
}

function compareObject(objectOne, objectTwo, options) {
  var propKeys = Object.keys(objectOne);
  var test;
  for (var i = 0; i < propKeys.length; i++) {
    var propKey = propKeys[i];
    var prop = objectOne[propKey];
    var prop2 = objectTwo[propKey];
    test = compare(prop, prop2, options);
    if (!test) {
      break;
    }
  }

  return test;
}

function actualCompare(valueOne, valueTwo, typeCode, options) {
  switch (typeCode) {
    case TYPECODES.UNDEFINED:
    case TYPECODES.NULL:
      return true;
      break;
    case TYPECODES.BOOLEAN:
    case TYPECODES.STRING:
    case TYPECODES.FUNCTION:
    case TYPECODES.REGEX:
    case TYPECODES.DATE:
      //date has builtin compare mechanism.
      return (valueOne === valueTwo);
      break;
    case TYPECODES.NUMBER:
      if (isFloat(valueOne) && isFloat(valueTwo)) {
        return compareFloats(valueOne, valueTwo, options);
      } else {
        return (valueOne === valueTwo);
      }
      break;
    case TYPECODES.ARRAY:
      return compareArray(valueOne, valueTwo, options);
      break;
    case TYPECODES.OBJECT:
      return compareObject(valueOne, valueTwo, options);
      break;
  }
}

function compare(valueOne, valueTwo, options) {
  if (!options) {
    options = {
      epsilon: DEFAULT_EPSILON
    };
  }
  var codeOne = getTypeCode(valueOne);
  var codeTwo = getTypeCode(valueTwo);
  if (codeOne === codeTwo) {
    return actualCompare(valueOne, valueTwo, codeOne, options);
  } else {
    return false;
  }
}

function exposedIsFloat(value) {
  return getTypeCode(value) === TYPECODES.NUMBER && isFloat(value);
}

var exposed = {
  CODES: TYPECODES,
  get: getTypeCode,
  is: isTypeCode,
  isNotThere: isNotThere,
  validateFunction: validateFunction,
  str: debugStringForTypeCode,
  isFloat: exposedIsFloat,
  compare: compare
};

// trying diffeernt for requirejs detection.

if (typeof define === 'function' && define.amd) {
  define(function() {
    return exposed;
  });
} else if (typeof exports === 'object') {
  module.exports = exposed;
} else {
  window.tc = exposed;
}

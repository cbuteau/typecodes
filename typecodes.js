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
  var test = false;
  for (var i = 0; i < arrayOne.length; i++) {
    test = compare(arrayOne[i], arrayTwo[i]);
    if (!test) {
      break;
    }
  }
  return test;
}

function compareObject(objectOne, objectTwo, options) {
  var propKeys = Object.keys(objectOne);
  var propKeysTwo = Object.keys(objectTwo);
  if (propKeys.length !== propKeysTwo.length) {
    return false;
  }
  var test = false;
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
  var result = false;
  switch (typeCode) {
    case TYPECODES.UNDEFINED:
    case TYPECODES.NULL:
      result = true;
      break;
    case TYPECODES.BOOLEAN:
    case TYPECODES.STRING:
    case TYPECODES.FUNCTION:
      result = (valueOne === valueTwo);
      break;
    case TYPECODES.DATE:
      result = (valueOne.getTime() === valueTwo.getTime());
      break;
    case TYPECODES.REGEX:
      result = (valueOne.toString() === valueTwo.toString());
      break;
    case TYPECODES.NUMBER:
      if (isFloat(valueOne) && isFloat(valueTwo)) {
        result = compareFloats(valueOne, valueTwo, options);
      } else {
        result = (valueOne === valueTwo);
      }
      break;
    case TYPECODES.ARRAY:
      result = compareArray(valueOne, valueTwo, options);
      break;
    case TYPECODES.OBJECT:
      result = compareObject(valueOne, valueTwo, options);
      break;
  }
  return result;
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

function config(options) {
  if (options.epsilon && options.epsilon !== DEFAULT_EPSILON) {
    DEFAULT_EPSILON = options.epsilon;
  }
}

function exposedIsFloat(value) {
  return getTypeCode(value) === TYPECODES.NUMBER && isFloat(value);
}

function isAllValueTypes(obj) {
  var propKeys = Object.keys(obj);
  for (var i = 0; i < propKeys.length; i++) {
    var prop = obj[propKeys[i]];
    var propCode = getTypeCode(prop);
    if (propCode === TYPECODES.ARRAY || propCode === TYPECODES.OBJECT) {
      return false;
    }
  }
  return true;
}

function isValueType(obj) {
  var code = getTypeCode(obj);
  if (code === TYPECODES.ARRAY || code === TYPECODES.OBJECT) {
    return false;
  } else {
    return true;
  }
}

function addUnique(array, item) {
  if (array.indexOf(item) === -1) {
    array.push(item);
  }
}

function buildCombinedPropList(objOne, objTwo) {
  var keysOne = Object.keys(objOne);
  var keysTwo = Object.keys(objTwo);
  var result = [];
  for (var i = 0; i <keysOne.length; i++ ) {
    addUnique(result, keysOne[i]);
  }
  for (var j = 0; j < keysTwo.length; j++ ) {
    addUnique(result, keysTwo[j]);
  }

  return result;
}
//
// function buildPropList(obj) {
//   var keys = Object.keys(obj);
//   var result = [];
//   for (var i = 0; i < keys.length; i++ ) {
//     addUnique(result, keys[i]);
//   }
//
//   return result;
// }
//
// function buildCombinedPropMap(objOne, objTwo) {
//   var keysOne = Object.keys(objOne);
//   var keysTwo = Object.keys(objTwo);
//   var result = {};
//   for (var i = 0; i <keysOne.length; i++ ) {
//     var keyone = keysOne[i];
//     result[keyone] = getTypeCode(objOne[keyone]);
//   }
//   for (var j = 0; j < keysTwo.length; j++ ) {
//     var keytwo = keysTwo[j];
//     result[keytwo] = getTypeCode(objOne[keytwo]);
//   }
//
//   return result;
// }
//
// function buildPropMap(obj) {
//   var keys = Object.keys(obj);
//   var result = {};
//   for (var i = 0; i < keys.length; i++ ) {
//     var cur = keys[i];
//     result[cur] = getTypeCode(obj[cur]);
//   }
//
//   return result;
// }
//
// function buildEvaluation(objOne, objTwo) {
//   var result = {};
//
//   result.isNotOne = isNotThere(objOne);
//   result.isNotTwo = isNotThere(objTwo);
//
//   if (result.isNotOne && !result.isNotTwo) {
//     result.props = buildPropMap(objTwo);
//   } else if (!result.isNotOne && result.isNotTwo) {
//     result.props = buildPropMap(objOne);
//   } else {
//     result.props = buildCombinedPropMap(objOne, objTwo);
//   }
//
// }

function deepAssign(objOne, objTwo) {
  if (isNotThere(objOne)) {
    return objTwo;
  }
  if (isNotThere(objTwo)) {
    return objOne;
  }

  var isValueOne = isValueType(objOne);
  var isValueTwo = isValueType(objTwo);

  if (isValueOne && isValueTwo) {
    // return prop it will copy.
    return objTwo;
  }

  var isOneValues = isAllValueTypes(objOne);
  var isTwoValues = isAllValueTypes(objTwo);
  if (isOneValues && isTwoValues) {
    return Object.assign(objOne, objTwo);
  } else {
    // recurse
    var resultObj = {};
    var combined = buildCombinedPropList(objOne, objTwo);
    for (var i = 0; i < combined.length; i++) {
      var current = combined[i];
      resultObj[current] = deepAssign(objOne[current], objTwo[current]);
    }
    return resultObj;
  }
}

var exposed = {
  CODES: TYPECODES,
  get: getTypeCode,
  is: isTypeCode,
  isNotThere: isNotThere,
  validateFunction: validateFunction,
  str: debugStringForTypeCode,
  isFloat: exposedIsFloat,
  compare: compare,
  config: config,
  deepAssign: deepAssign
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

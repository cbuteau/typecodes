// whole thing strict mode
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

function mergeArrays(arrayOne, arrayTwo) {
  var combined = [];
  var current;
  for (var i = 0; i < arrayOne.length; i++) {
    current = arrayOne[i];
    if (combined.indexOf(current) === -1) {
      combined.push(current);
    }
  }
  for (var j = 0; j < arrayTwo.length; j++) {
    var current = arrayTwo[j];
    if (combined.indexOf(current) === -1) {
      combined.push(current);
    }
  }

  return combined;
}


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
    if (isTypeCode(objOne, TYPECODES.ARRAY) && isTypeCode(objTwo, TYPECODES.ARRAY)) {
      return mergeArrays(objOne, objTwo);
    }
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

function FunctionMap(prop) {
  this.paramCount = prop.length;
}

function CallbackMap(interfaceObj) {
  this.interfaceObj = interfaceObj;
  this.map = {};
  this.build();
}

CallbackMap.prototype = {
  build: function() {
    var keys = Object.keys(this.interfaceObj);
    for (var i = 0; i < keys.length; i++) {
      var prop = keys[i];
      var propVal = this.interfaceObj[prop];
      if (isTypeCode(propVal, TYPECODES.FUNCTION)) {
        this.map[prop] = new FunctionMap(propVal);
      }
    }
  },
  isValid: function(objectToTest) {
    var callbacks = Object.keys(this.map);
    var validcount = 0;
    for (var i = 0; i < callbacks.length; i++) {
      var cbName = callbacks[i];
      var propVal = objectToTest[cbName];
      var funcMap = this.map[cbName];
      if (isTypeCode(propVal, TYPECODES.FUNCTION) && propVal.length === funcMap.paramCount) {
        validcount++;
      }
    }
    return validcount === callbacks.length;
  }
};


function hasInterface(obj, interfaceObj) {
  var map = new CallbackMap(interfaceObj);
  return map.isValid(obj);
}

function hasPropMap(objectToTest, propMap) {
  var keys = Object.keys(propMap);
  var mapCount = 0;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var tc = getTypeCode(objectToTest[key]);
    if (tc === propMap[key]) {
      mapCount++;
    }
  }

  return mapCount === keys.length;
}

function coerceStringToBool(value) {
  return value.toLowerCase() === 'true';
}

// figure out e notation for floats and ints.
//var regexInt = /^-?[\d.]+(?:e-?\d+)?$/;
var regexInt = /^[-+]?\d+$/;

function coerceStringToNumber(value) {
  if (regexInt.test(value)) {
    // if we pass in options this could be another radix.
    return parseInt(value, 10);
  } else {
    return parseFloat(value);
  }
}

function coerceStringToDate(value) {
  return new Date(Date.parse(value));
}

function coerceStringToArray(value) {
  var temp = JSON.parse(value);
  if (Array.isArray(temp)) {
    return temp;
  } else {
    noCoerce();
  }
}

function coerceStringToRegex(value) {
  return new RegExp(value);
}

function noCoerce() {
  throw new Error('No coersion possible');
}

function coerceToNull(value) {
  return null;
}

function coerceToUndefined(value) {
  var thing;
  return thing;
}

function coerceArrayToString(value) {
  return JSON.stringify(value);
}

function coerceNumberToDate(value) {
  return new Date(value);
}

function coerceNumberToString(value) {
  return '' + value;
}

function convertObjectToString(value) {
  return JSON.stringify(value);
}

function coerceAnyToBool(value) {
  if (value) {
    return true;
  }

  return false;
}

function coerceAnyToString(value) {
  return value.toString();
}



var COERCEMAP = {};


function buildCoerceMap() {
  if (COERCEMAP[TYPECODES.STRING]) {
    return;
  }
  var funcMap = COERCEMAP[TYPECODES.STRING] = {};
  funcMap[TYPECODES.BOOLEAN] = coerceStringToBool;
  funcMap[TYPECODES.NUMBER] = coerceStringToNumber;
  funcMap[TYPECODES.FUNCTION] = noCoerce;
  funcMap[TYPECODES.ARRAY] = coerceStringToArray;
  funcMap[TYPECODES.NULL] = coerceToNull;
  funcMap[TYPECODES.UNDEFINED] = coerceToUndefined;
  funcMap[TYPECODES.DATE] = coerceStringToDate;
  funcMap[TYPECODES.REGEX] = coerceStringToRegex;
  funcMap[TYPECODES.UNMAPPED] = noCoerce;

  funcMap = COERCEMAP[TYPECODES.BOOLEAN] = {};
  funcMap[TYPECODES.NUMBER] = noCoerce;
  funcMap[TYPECODES.FUNCTION] = noCoerce;
  funcMap[TYPECODES.ARRAY] = noCoerce;
  funcMap[TYPECODES.NULL] = coerceToNull;
  funcMap[TYPECODES.UNDEFINED] = coerceToUndefined;
  funcMap[TYPECODES.DATE] = noCoerce;
  funcMap[TYPECODES.REGEX] = noCoerce;
  funcMap[TYPECODES.UNMAPPED] = noCoerce;
  funcMap[TYPECODES.STRING] = coerceAnyToString;

  funcMap = COERCEMAP[TYPECODES.ARRAY] = {};
  funcMap[TYPECODES.BOOLEAN] = noCoerce;
  funcMap[TYPECODES.NUMBER] = noCoerce;
  funcMap[TYPECODES.FUNCTION] = noCoerce;
  funcMap[TYPECODES.ARRAY] = noCoerce;
  funcMap[TYPECODES.NULL] = coerceToNull;
  funcMap[TYPECODES.UNDEFINED] = coerceToUndefined;
  funcMap[TYPECODES.DATE] = noCoerce;
  funcMap[TYPECODES.REGEX] = noCoerce;
  funcMap[TYPECODES.UNMAPPED] = noCoerce;
  funcMap[TYPECODES.STRING] = coerceArrayToString;

  funcMap = COERCEMAP[TYPECODES.NUMBER] = {};
  funcMap[TYPECODES.BOOLEAN] = coerceAnyToBool;
  funcMap[TYPECODES.FUNCTION] = noCoerce;
  funcMap[TYPECODES.ARRAY] = noCoerce;
  funcMap[TYPECODES.NULL] = coerceToNull;
  funcMap[TYPECODES.UNDEFINED] = coerceToUndefined;
  funcMap[TYPECODES.DATE] = coerceNumberToDate;
  funcMap[TYPECODES.REGEX] = noCoerce;
  funcMap[TYPECODES.UNMAPPED] = noCoerce;
  funcMap[TYPECODES.STRING] = coerceNumberToString;

  funcMap = COERCEMAP[TYPECODES.FUNCTION] = {};
  funcMap[TYPECODES.BOOLEAN] = noCoerce;
  funcMap[TYPECODES.NUMBER] = noCoerce;
  funcMap[TYPECODES.ARRAY] = noCoerce;
  funcMap[TYPECODES.NULL] = coerceToNull;
  funcMap[TYPECODES.UNDEFINED] = coerceToUndefined;
  funcMap[TYPECODES.DATE] = noCoerce;
  funcMap[TYPECODES.REGEX] = noCoerce;
  funcMap[TYPECODES.UNMAPPED] = noCoerce;
  funcMap[TYPECODES.STRING] = noCoerce;

  funcMap = COERCEMAP[TYPECODES.OBJECT] = {};
  funcMap[TYPECODES.BOOLEAN] = coerceAnyToBool;
  funcMap[TYPECODES.NUMBER] = noCoerce;
  funcMap[TYPECODES.ARRAY] = noCoerce;
  funcMap[TYPECODES.NULL] = coerceToNull;
  funcMap[TYPECODES.UNDEFINED] = coerceToUndefined;
  funcMap[TYPECODES.DATE] = noCoerce;
  funcMap[TYPECODES.REGEX] = noCoerce;
  funcMap[TYPECODES.UNMAPPED] = noCoerce;
  funcMap[TYPECODES.STRING] = convertObjectToString;

  funcMap = COERCEMAP[TYPECODES.UNDEFINED] = {};
  funcMap[TYPECODES.BOOLEAN] = coerceAnyToBool;
  funcMap[TYPECODES.NUMBER] = noCoerce;
  funcMap[TYPECODES.ARRAY] = noCoerce;
  funcMap[TYPECODES.NULL] = coerceToNull;
  funcMap[TYPECODES.OBJECT] = noCoerce;
  funcMap[TYPECODES.DATE] = noCoerce;
  funcMap[TYPECODES.REGEX] = noCoerce;
  funcMap[TYPECODES.UNMAPPED] = noCoerce;
  funcMap[TYPECODES.STRING] = noCoerce;

  funcMap = COERCEMAP[TYPECODES.NULL] = {};
  funcMap[TYPECODES.BOOLEAN] = coerceAnyToBool;
  funcMap[TYPECODES.NUMBER] = noCoerce;
  funcMap[TYPECODES.ARRAY] = noCoerce;
  funcMap[TYPECODES.OBJECT] = noCoerce;
  funcMap[TYPECODES.DATE] = noCoerce;
  funcMap[TYPECODES.REGEX] = noCoerce;
  funcMap[TYPECODES.UNDEFINED] = coerceToUndefined;
  funcMap[TYPECODES.UNMAPPED] = noCoerce;
  funcMap[TYPECODES.STRING] = noCoerce;

  funcMap = COERCEMAP[TYPECODES.DATE] = {};
  funcMap[TYPECODES.BOOLEAN] = coerceAnyToBool;
  funcMap[TYPECODES.NUMBER] = noCoerce;
  funcMap[TYPECODES.ARRAY] = noCoerce;
  funcMap[TYPECODES.OBJECT] = noCoerce;
  funcMap[TYPECODES.FUNCTION] = noCoerce;
  funcMap[TYPECODES.REGEX] = noCoerce;
  funcMap[TYPECODES.UNDEFINED] = coerceToUndefined;
  funcMap[TYPECODES.UNMAPPED] = noCoerce;
  funcMap[TYPECODES.STRING] = noCoerce;

  funcMap = COERCEMAP[TYPECODES.REGEX] = {};
  funcMap[TYPECODES.BOOLEAN] = coerceAnyToBool;
  funcMap[TYPECODES.NUMBER] = noCoerce;
  funcMap[TYPECODES.ARRAY] = noCoerce;
  funcMap[TYPECODES.OBJECT] = noCoerce;
  funcMap[TYPECODES.FUNCTION] = noCoerce;
  funcMap[TYPECODES.REGEX] = noCoerce;
  funcMap[TYPECODES.UNDEFINED] = coerceToUndefined;
  funcMap[TYPECODES.UNMAPPED] = noCoerce;
  funcMap[TYPECODES.STRING] = coerceAnyToString;
}

function coerce(value, typeCode) {
  var currentTc = getTypeCode(value)
  if (currentTc === typeCode) {
    return value
  } else {
      buildCoerceMap();
      return COERCEMAP[currentTc][typeCode](value)
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
<<<<<<< HEAD
  config: config,
=======
  coerce: coerce,
  has: hasPropMap,
  hasInterface: hasInterface,
>>>>>>> f09a08d0a79a08dea25988a46a9126e1e600db5e
  deepAssign: deepAssign
}

// trying diffeernt for requirejs detection.

if (typeof define === 'function' && define.amd) {
  define(function() {
    return exposed
  });
} else if (typeof exports === 'object') {
  module.exports = exposed
} else {
  window.tc = exposed
}

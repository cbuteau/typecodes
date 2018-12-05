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

// TODO add the folloing ... typedarray types...

function TypeCodeWrapper(value) {
  Number.call(val);
}

TypeCodeWrapper.prototype = new Number();


TypeCodeWrapper.prototype.toString = function() {
  var result = 'unmapped';
  switch (this) {
    case TYPECODES.ARRAY:
      result = 'array';
      break;
    case TYPECODES.BOOLEAN:
      result = 'boolean';
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
      result = 'unmapped';
      break;
  }

  return result;
}

function getTypeCode(value) {
  // Undefined
  if (value === undefined) {
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
    return TYPECODES.ARRAY;
  }

  if (value.test && value.exec) {
    return TYPECODES.REGEX;
  }
  // OBJECT
  if (value.isPrototypeOf && value.hasOwnProperty && value.toString) {
    return TYPECODES.OBJECT;
  }


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

var exposed = {
  CODES: TYPECODES,
  get: getTypeCode,
  is: isTypeCode,
  isNotThere: isNotThere,
  validateFunction: validateFunction
};

// TODO make this section simpler...

(function() {
  // Export for NodeJs


  if (typeof module !== undefined && typeof module.exports !== undefined) {
    module.exports = exposed;
  } else {
    window.tc = exposed;
  }

})();

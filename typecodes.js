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
  UNMAPPED: 9
};

Object.freeze(TYPECODES);

// TODO add the folloing ...regex typedarray types...

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

var exposed = {
  CODES: TYPECODES,
  getTypeCode: getTypeCode,
  isTypeCode: isTypeCode,
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

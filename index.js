const { 
    isNumber,
    isString,
    isBoolean,
    isObject, 
    isArray, 
    isFunction, 
    castToBoolean, 
    castToNumber, 
    castToString 
} = require('./lib/types.js');

console.log(isNumber('3'));
console.log(isString('hi'));
console.log(isBoolean(true));
console.log(isObject({}));
console.log(isArray([]));
console.log(isFunction(() => { }));
console.log(castToBoolean());
console.log(castToNumber('3'));
console.log(castToString(3));

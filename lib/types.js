const isNumber = val => typeof val === 'number';
const isString = val => typeof val === 'string';
const isBoolean = val => typeof val === 'boolean';
const isArray = arr => Array.isArray(arr);
const isObject = val => typeof val === 'object' && !isArray(val);
const isFunction = val => val instanceof Function;


const castToNumber = val => {
    if (isNumber(val)) return val;
    const number = Number(val);
    if (isNaN(number)) throw new CastError(Number, val);
    return number;
};

const castToString = val => {
    if (isString(val)) return val;
    if (isNumber(val)) return val.toString();
    if (isBoolean(val)) return val.toString();
    if (isArray(val)) return val.toString();
    throw new CastError(String, val);
};


const castToBoolean = val => {
    if (isBoolean(val)) return val;
    if (val === 1) return true;
    if (val === 0) return false;
    throw new CastError(Boolean, val);
};

const castToArray = caster => val => {
    try {
        return val.map(caster);
    } catch (e) {
        throw new CastError(Array, val);
    }
};

class CastError extends Error {
    constructor(Type, value) {
        const type = Type.name;
        super(`Cannot cast >>${value}<< to ${type}`);
        this.type = type;
        this.value = value;
    }
}

const casters = {
    Number: castToNumber,
    String: castToString,
    Boolean: castToBoolean
};

const getCaster = Type => {
    if (isArray(Type)) return castToArray(casters[Type[0].name]);
  
    return casters[Type.name] || null;
};

module.exports = {
    isNumber,
    isString,
    isBoolean,
    isArray,
    isObject,
    isFunction,
    CastError,
    castToNumber,
    castToString,
    castToBoolean,
    castToArray,
    getCaster,
};
const isNumber = val => typeof val === 'number';
const isString = val => typeof val === 'string';
const isBoolean = val => typeof val === 'boolean';
const isArray = val => typeof val === [];
const isObject = val => typeof val === {};
const isFunction = function => typeof function === (() => { });


const castToNumber = val => {
    if (isNumber(val)) return val;
    const number = Number(val);
    if (isNaN(number)) throw new CastError(Number, val);
    return number;
};
const castToString = val => {
    if (isString(val)) return val;
    const string = String(val);
    if (!string) throw new CastError(String, val);
    return string;
};

const castToBoolean = val => {
    if (isBoolean(val)) return val;
    const boolean = Boolean(val);
    if (!boolean) throw new CastError(Boolean, val);
    return boolean;
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
    getCaster,
};
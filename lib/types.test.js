const {
    isNumber,
    isString,
    isBoolean,
    isArray,
    isObject,
    isFunction,
    castToString,
    castToBoolean,
    castToNumber,
    getCaster
} = require('../lib/types.js');

describe('validator module', () => {
    describe('basic validation', () => {
        it('properly tells if a value is a numbers', () => {
            expect(isNumber(3)).toBeTruthy();
            expect(isNumber('hi')).toBeFalsy();
            expect(isNumber([])).toBeFalsy();
            expect(isNumber({})).toBeFalsy();
            expect(isNumber(() => { })).toBeFalsy();
            expect(isNumber(true)).toBeFalsy();
        });

        it('properly tells if a value is a string', () => {
            expect(isString('hi')).toBeTruthy();
            expect(isString(7)).toBeFalsy();
            expect(isString([])).toBeFalsy();
            expect(isString({})).toBeFalsy();
            expect(isString(() => { })).toBeFalsy();
            expect(isString(true)).toBeFalsy();
        });

        it('properly tells if a value is a boolean', () => {
            expect(isBoolean(true)).toBeTruthy();
            expect(isBoolean(7)).toBeFalsy();
            expect(isBoolean([])).toBeFalsy();
            expect(isBoolean({})).toBeFalsy();
            expect(isBoolean(() => { })).toBeFalsy();
            expect(isBoolean('hi')).toBeFalsy();
        });

        it('properly tells if a value is an array', () => {
            expect(isArray([])).toBeTruthy();
            expect(isArray(7)).toBeFalsy();
            expect(isArray(true)).toBeFalsy();
            expect(isArray({})).toBeFalsy();
            expect(isArray(() => { })).toBeFalsy();
            expect(isArray('hi')).toBeFalsy();
        });

        it('properly tells if a value is an object', () => {
            expect(isObject({})).toBeTruthy();
            expect(isObject(7)).toBeFalsy();
        });

        it('properly tells if a value is a function', () => {
            expect(isFunction(() => { })).toBeTruthy();
            expect(isFunction(7)).toBeFalsy();
            expect(isFunction([])).toBeFalsy();
            expect(isFunction({})).toBeFalsy();
            expect(isFunction(true)).toBeFalsy();
            expect(isFunction('hi')).toBeFalsy();
        });
    });

    describe('casters', () => {
        it('can cast values to a number', () => {
            expect(castToNumber(3)).toEqual(3);
            expect(castToNumber('3')).toEqual(3);
            expect(castToNumber(true)).toEqual(1);
            expect(castToNumber(false)).toEqual(0);
        });

        it('throws if value is not castable to number', () => {
            expect(() => castToNumber('hi')).toThrowErrorMatchingSnapshot();
            expect(() => castToNumber({})).toThrowErrorMatchingSnapshot();
        });

        it('can cast values to a string', () => {
            expect(castToString(3)).toEqual('3');
            expect(castToString('3')).toEqual('3');
        });

        it('throws if value is not castable to string', () => {
            expect(() => castToString(null)).toThrowErrorMatchingSnapshot();
            expect(() => castToString(undefined)).toThrowErrorMatchingSnapshot();
        });

        it('can cast values to a Boolean', () => {
            expect(castToBoolean(1)).toEqual(true);
            expect(castToBoolean('')).toEqual(false);
        });

        it('throws if value is not castable to Boolean', () => {
            expect(() => castToBoolean(null)).toThrowErrorMatchingSnapshot();
            expect(() => castToBoolean(undefined)).toThrowErrorMatchingSnapshot();
        });
    });

    it('can get the right caster', () => {
        expect(getCaster(Number)).toEqual(castToNumber);
        expect(getCaster(Promise)).toBeNull();
        expect(getCaster(String)).toEqual(castToString);
        expect(getCaster(Boolean)).toEqual(castToBoolean);


    });
});
const Validator = require('./Validator');

describe('Validator', () => {
    let nameValidator;
    beforeEach(() => {
        nameValidator = new Validator('name', {
            type: String,
            required: true
        });
    });

    it('has a field and configuration property', () => {
        expect(nameValidator.field).toEqual('name');
        expect(nameValidator.configuration).toEqual({
            type: String,
            required: true
        });
    });

    it('can validate an object with the proper type', () => {
        const dog = {
            name: 'spot',
            age: 5,
            weight: '20 lbs'
        };

        expect(nameValidator.validate(dog)).toEqual('spot');
    });

    it('can validate an object with the wrong type but castable', () => {
        const dog = {
            name: 12345,
            age: 5,
            weight: '20 lbs'
        };

        expect(nameValidator.validate(dog)).toEqual('12345');
    });

    it('throws an error when validating an object with the wrong type and not castable', () => {
        const dog = {
            name: {},
            age: 5,
            weight: '20 lbs'
        };

        expect(() => nameValidator.validate(dog)).toThrowError('Cannot cast >>[object Object]<< to String');
    });

    it('throws an error when validating an object with a missing required field', () => {
        const dog = {
            age: 5,
            weight: '20 lbs'
        };

        expect(() => nameValidator.validate(dog)).toThrowError('Missing required field >>name<<');
    });

    it('throws an error when validating an object with a missing required field', () => {
        const nameValidator = new Validator('name', {
            type: String,
            required: false
        });

        const dog = {
            age: 5,
            weight: '20 lbs'
        };

        expect(nameValidator.validate(dog)).toEqual(null);
    });
});
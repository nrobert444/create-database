const { Schema } = require('./Schema');

describe('schema', () => {

    it('can validate an object with the proper type', () => {
        const dog = {
            name: 'spot',
            age: 5,
            weight: '20 lbs'
        };
        const schema = new Schema({
            name: {
                type: String,
                required: true
            },
            age: {
                type: Number,
                required: true
            },
            weight: {
                type: String
            }
        });

        expect(schema.validate(dog)).toEqual({ 'age': 5, 'name': 'spot', 'weight': '20 lbs' });
    });

});
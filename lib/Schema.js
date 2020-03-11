const Validator = require('./Validator');
class Schema {
    constructor(schema) {
        this.schema = schema;
        this.validators = Object.entries(schema)
            .map(([field, configuration]) => new Validator(field, configuration));
    }
    validate(obj) {
        const validated = {};
        const errors = [];
        this.validators.forEach(validator => {
            try {
                validated[validator.field] = validator.validate(obj);
            } catch (e) {
                errors.push(e);
            }
        });
        if (errors.length > 0) {
            throw new Error(`invalid schema >> Error: Missing required field >>age<<`);
        }
        return validated;
    }
}

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



module.exports = {
    schema,
    Schema,
};
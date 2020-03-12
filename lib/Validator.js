const { getCaster } = require('./types');

module.exports = class Validator {
    constructor(field, configuration) {
        this.field = field;
        this.configuration = configuration;
    }
    validate(obj) {
        if (this.configuration.required && !(this.field in obj)) {
            throw new Error(`Missing required field >>${this.field}<<`);
        }
        if (!this.configuration.required && !(this.field in obj)) {
            return null;
        }
        const caster = getCaster(this.configuration.type);
        return caster(obj[this.field]);
    }
};
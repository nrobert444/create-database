const { Schema } = require('./Schema');
const Model = require('./Model');
const { deleteFile } = require('./file-system.js')
describe('Model class', () => {

    // beforeEach(() => {
    //     return deleteFile();
    // });

    it('creates a new document', () => {
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

        const Dog = new Model('Dog', schema);

        return Dog
            .create({
                name: 'spot',
                age: 5,
                weight: '20 lbs'
            })
            .then(dog => {
                expect(dog).toEqual({
                    _id: expect.any(String),
                    name: 'spot',
                    age: 5,
                    weight: '20 lbs'
                });
            });
    });

    it('finds by id', () => {
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

        const Dog = new Model('Dog', schema);

        return Dog
            .create({
                name: 'spot',
                age: 5,
                weight: '20 lbs'
            })
            .then(dog => {
                return Dog
                    .findById(dog._id);
            })
            .then(foundDog => {
                expect(foundDog).toEqual({
                    _id: expect.any(String),
                    name: 'spot',
                    age: 5,
                    weight: '20 lbs'
                });
            });
    });

    it('finds by id and updates', () => {
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

        const Dog = new Model('Dog', schema);

        return Dog
            .create({
                name: 'spot',
                age: 5,
                weight: '20 lbs'
            })
            .then(dog => {
                return Dog
                    .findByIdAndUpdate(dog._id, { name: 'rover' });
            })
            .then(updatedDog => {
                expect(updatedDog).toEqual({
                    _id: expect.any(String),
                    name: 'rover',
                    age: 5,
                    weight: '20 lbs'
                });
            });
    });



    it('finds by id and deletes', () => {
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

        const Dog = new Model('Dog', schema);

        return Dog
            .create({
                name: 'spot',
                age: 5,
                weight: '20 lbs'
            })
            .then(dog => {
                return Dog
                    .findByIdAndDelete(dog._id);
            })
            .then(deletedDog => {
                expect(deletedDog).toEqual({
                    _id: expect.any(String),
                    name: 'spot',
                    age: 5,
                    weight: '20 lbs'
                });
            });
    });

    it('finds all dogs', () => {
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

        const Dog = new Model('Dog', schema);
        return Dog
            .create({
                name: 'spot',
                age: 5,
                weight: '20 lbs'
            })
            .then(() => {
                return Dog
                    .create({
                        name: 'luke',
                        age: 7,
                        weight: '10 lbs'
                    });
            })
            .then(() => {
                return Dog
                    .find();
            })
            .then(dogs => {
                expect(dogs.length).toEqual(2);
                expect(dogs).toContainEqual({
                    _id: expect.any(String),
                    name: 'spot',
                    age: 5,
                    weight: '20 lbs'
                },
                {
                    _id: expect.any(String),
                    name: 'luke',
                    age: 7,
                    weight: '10 lbs'
                });
            });
    });
});
const fs = require('fs').promises;
const {
    writeJSON,
    readJSON,
    // readDirectoryJSON,
    // updateJSON,
    // deleteFile,
    // mkdirp
} = require('../lib/file-system');

describe('file testing', () => {
    afterAll(() => {
        return fs.unlink('./testing.json');
    });
    it('it will write a json file', () => {
        return writeJSON('./testing.json', { name: 'nick' })
            .then(() => fs.readFile('./testing.json', { encoding: 'utf8' }))
            .then(writeText => {
                expect(writeText).toEqual('{"name":"nick"}');
            });
    });

    it('it will read a json file', () => {
        return readJSON('./testing.json', { name: 'nick' })
            .then(() => fs.readFile('./testing.json', { encoding: 'utf8' }))
            .then(writeText => {
                expect(writeText).toEqual('{"name":"nick"}');
            });
    });
});
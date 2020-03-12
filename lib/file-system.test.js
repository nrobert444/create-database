const fs = require('fs').promises;
const {
    mkdirp,
    writeJSON,
    readJSON,
    readDirectoryJSON,
    updateJSON,
    deleteFile
} = require('./file-system');

jest.mock('fs', () => ({
    promises: {
        mkdir: jest.fn(() => Promise.resolve()),
        writeFile: jest.fn(() => Promise.resolve()),
        readFile: jest.fn(() => Promise.resolve('{"name":"spot"}')),
        readdir: jest.fn(() => Promise.resolve(['test.json', 'test2.json'])),
        unlink: jest.fn(() => Promise.resolve())
    }
}));

describe('file system functions', () => {
    it('makes a directory and all parent directories', () => {
        return mkdirp('./my/cool/directory/path')
            .then(() => {
                expect(fs.mkdir)
                    .toHaveBeenCalledWith('./my/cool/directory/path', { recursive: true });
            });
    });

    it('writes an object to a file', () => {
        const dog = {
            name: 'spot',
            age: 5,
            weight: '20 lbs'
        };

        return writeJSON('./test.json', dog)
            .then(() => {
                expect(fs.writeFile)
                    .toHaveBeenCalledWith('./test.json', JSON.stringify(dog));
            });
    });

    it('can read an object from a file', () => {
        return readJSON('./test.json')
            .then(data => {
                expect(fs.readFile)
                    .toHaveBeenCalledWith('./test.json');
                expect(data).toEqual({
                    name: 'spot'
                });
            });
    });

    it('reads a directory of json', () => {
        return readDirectoryJSON('./data')
            .then(data => {
                expect(fs.readdir)
                    .toHaveBeenCalledWith('./data');
                expect(fs.readFile)
                    .toHaveBeenCalledWith('./data/test.json');
                expect(fs.readFile)
                    .toHaveBeenCalledWith('./data/test2.json');
                expect(data).toEqual([
                    { name: 'spot' },
                    { name: 'spot' }
                ]);
            });
    });

    it('updates a files json', () => {
        return updateJSON('./test.json', { name: 'rover' })
            .then(data => {
                expect(fs.readFile)
                    .toHaveBeenCalledWith('./test.json');
                expect(fs.writeFile)
                    .toHaveBeenCalledWith('./test.json', '{"name":"rover"}');
                expect(data).toEqual({
                    name: 'rover'
                });
            });
    });

    it('deletes a json file', () => {
        return deleteFile('./test.json')
            .then(() => {
                expect(fs.unlink).toHaveBeenCalledWith('./test.json');
            });
    });
});
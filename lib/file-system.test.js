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
                // make sure that we called the fs.mkdir function
                // with './my/cool/directory/path' and { recursive: true }
            });
        // .then(() => fs.stat('./my/cool/directory/path'))
        // .then(stat => {
        //   expect(stat.isDirectory()).toBeTruthy();
        // });
    });

    it('writes an object to a file', () => {
        const dog = {
            name: 'spot',
            age: 5,
            weight: '20 lbs'
        };

        return writeJSON('./test.json', dog)
            .then(() => {
                // check that write file is called with the correct arguments
                // './test.json', and JSON.stringify(dog)
                expect(fs.writeFile)
                    .toHaveBeenCalledWith('./test.json', JSON.stringify(dog));
                // read the file
                // make sure the file has the right stuff in it
            });
    });

    it('can read an object from a file', () => {
        return readJSON('./test.json')
            .then(data => {
                // make sure readFile is called with the right arguments
                expect(fs.readFile)
                    .toHaveBeenCalledWith('./test.json');
                // make sure that data is an object not a string
                expect(data).toEqual({
                    name: 'spot'
                });
            });
    });

    it('reads a directory of json', () => {
        return readDirectoryJSON('./data')
            .then(data => {
                // fs.readdir is called with the right arguments
                expect(fs.readdir)
                    .toHaveBeenCalledWith('./data');
                // fs.readFile is called with the right arguments
                expect(fs.readFile)
                    .toHaveBeenCalledWith('./data/test.json');
                expect(fs.readFile)
                    .toHaveBeenCalledWith('./data/test2.json');
                // data is an array of objects
                expect(data).toEqual([
                    { name: 'spot' },
                    { name: 'spot' }
                ]);
            });
    });

    it('updates a files json', () => {
        return updateJSON('./test.json', { name: 'rover' })
            .then(data => {
                // readFile gets called
                expect(fs.readFile)
                    .toHaveBeenCalledWith('./test.json');
                // writeFile gets called
                expect(fs.writeFile)
                    .toHaveBeenCalledWith('./test.json', '{"name":"rover"}');
                // data -> { name: 'rover' }
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
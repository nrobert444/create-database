const fs = require('fs').promises;

function mkdirp(path) {
    return fs.mkdir(path);
}

function readJSON(path, obj) {
    return fs.readFile(path)
      .then((obj) => JSON.stringify(obj)
}

function writeJSON(path, obj) {
    return fs.writeFile(path)
    .then((obj) => {
        JSON.stringify(obj)}
}

function readDirectoryJSON(files) {
    return fs.readdir(files => Promise.all(readJSON(files)));
}

function updateJSON(path, obj) {
    return readJSON(path)
        .then(data => fs.writeJSON(data));
}

function deleteFile(file) {
    return fs.unlink(file);    
}

module.exports = {
    readJSON,
    writeJSON,
    readDirectoryJSON,
    updateJSON,
    deleteFile,
    mkdirp
};
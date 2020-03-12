const fs = require('fs').promises;

const mkdirp = path => {
  return fs.mkdir(path, { recursive: true });
};

const writeJSON = (path, obj) => {
  return fs.writeFile(path, JSON.stringify(obj))
    .then(() => obj);
};

const readJSON = path => {
  return fs.readFile(path)
    .then(contents => JSON.parse(contents));
};

const readDirectoryJSON = path => {
  return fs.readdir(path)
    .then(files => {
      return Promise.all(files.map(file => readJSON(`${path}/${file}`)));
    });
};

const updateJSON = (path, obj) => {
  return readJSON(path)
    .then(json => {
      const updatedJSON = { ...json, ...obj };
      return writeJSON(path, updatedJSON);
    });
};

const deleteFile = path => fs.unlink(path);

module.exports = {
  mkdirp,
  writeJSON,
  readJSON,
  readDirectoryJSON,
  updateJSON,
  deleteFile
};
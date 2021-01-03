const fs = require('fs');

const save = (data, path) => {
    JSONdata = JSON.stringify(data);
    fs.writeFileSync(path, JSONdata);
};

const load = (path) => {
    try {
        const dataBuffer = fs.readFileSync(path);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];

    }
};

module.exports = {
    save: save,
    load: load
}
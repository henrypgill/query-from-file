"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkValidFilePath = void 0;
function checkValidFilePath(path) {
    try {
        if (path.match(/[~"#%&*:<>?{|}]+/)) {
            throw new Error(`invalid file path provided for query file: ${path}`);
        }
        if (path.match(/(\.sql)/g))
            throw new Error("filename includes file type ending, remove file endings from path string.");
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
exports.checkValidFilePath = checkValidFilePath;

const UserModel = require('./user-model');
const BookModel = require('./book-model');

// at place of importing these multiple times in index.js (main file) 
//  we will simply write one time in index.js and import there this module
module.exports = { UserModel, BookModel };

// if multiple files in a folder are there we export them in this way by writing them separately in another file within same folder and then exporting this folder only
// it reduces the contant in main folder

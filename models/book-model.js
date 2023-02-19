// modals are like placeholder we will create here schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({  //creating a schema for mongodb
    // we will not write id as mongo itself define id to documents
    name: {
        type: String,
        required: true   //this name object is necessary
    },
    author: {
        type: String,
        required: true  // author is a mandatory attributes
    },
    genre: {
        type: String,
        required: true
    },
    price: {
        type: String,    //price is also given in string format ""
        required: true
    },
    publisher: {
        type: String,
        required: true
    }
},
    {
        timestamps: true         //  timestamp is inbuilt functionality that when a particular data has been insert into data base
    });

// after schema creation creating model or locking schema and exporting it
module.exports = mongoose.model("Book", bookSchema);  

// collection produced will have name books   i.e. name in plural form  and name will have small letters

// modals are like placeholder we will create here schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    // we will not write id as mongo itself define id to documents
    name: {
        type: String,
        required: true   //this name object is necessary
    },
    surname: {
        type: String,
        required: true   // surname is a mandatory attributes
    },
    email: {
        type: String,
        required: true
    },
    // issuedBook is foreign key it is copied from book id    i.e. it is only to provide relationship with book object whose id matches with issuedBook attribute of user
    // writing issuedBook/(id of books object)   is same as writing other attribute of books as it was only to provide a relationship with other attributes.
    issuedBook: {
        type: mongoose.Schema.Types.ObjectId,   // it's type is an id     which is of format of id produced in mongoose
        ref:"Book",    //reference is to be taken from Book model
        required: false // it is not mandatory as it any be that particular book  is not issued to any user
    },
    issuedDate: {
        type: String,
        required:false
    },
    returnDate: {
        type: String,
        required: false
    },
    subscriptionType: {
        type: String,
        required: true
    },
    subscriptionDate: {
        type: String,
        required: true
    }
},
    {
        timestamps: true  //  timestamp is inbuilt functionality that when a particular data has been insert into data base
    });

// after schema creation creating model or locking schema and exporting it
module.exports = mongoose.model("User", userSchema);
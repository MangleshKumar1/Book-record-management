const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

function DbConnection() {
    const DB_URL = process.env.MONGO_URI;  //this is the way to importing uri/url written in env file

    // MONGO_URI it is the place where our mongo database need to be hosted
    mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });   //second parameter is optional

    const db = mongoose.connection;  //connecting mongodb with mongoose

    db.on("error", console.error.bind("Connection error"));//if any error caused while connecting mongodb database and mongooseshow this
    db.once("open", function () {      //connection to be established once 
        console.log("DB connection established");
    });      //frontend can't communicate with the database , we need to start server first
};


module.exports = DbConnection;
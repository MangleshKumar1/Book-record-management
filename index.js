const express = require("express");
const app = express();
const port = 80;

app.use(express.json());
app.use(express.urlencoded());

// import db      and installing     npm i dotenv     for environment
const dotenv = require('dotenv');
dotenv.config();   //calling particular database and want that database must be config

// import Dbconnection file
const DbConnection = require('./databaseConnection.js');
DbConnection();  //after importing calling the function

// importing user and book model
const { UserModel, BookModel } = require("./models/model-index.js");

// import routes modules we created as users.json and books.json
const usersRouter = require("./routes/users.js");
const booksRouter = require("./routes/books.js");


// moving/navigating from index.js to user.js or book.js routes
app.use("/users", usersRouter);//     http://localhost/users
app.use("/books", booksRouter);


// npm i nodemon --save-dev
// endpoints
app.get('/', (req, res) => {
  res.status(200).json({  //using json we can pass multiple things/parameters
    message: "Server is up and running successfully"
  });
});


app.get('*', (req, res) => {      //* means if any character other than we given name separetly above then they will get error
  res.status(404).json({  //using json we can pass multiple things/parameters
    message: "This route does not exist"
  });
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

// here we can see that if we also write the routes for books as well it would lead big size file to be traversed and will become less readable
//so we will create different files in a folder routes for books.js and users.js
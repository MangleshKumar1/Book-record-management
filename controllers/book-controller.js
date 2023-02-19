// it will contain all logic for route
// importing user and book model
const { UserModel, BookModel } = require("../models/model-index");
const IssuedBook = require("../dtos/book-dto.js");


// const getAllBooks =;  if we also want to export we can write how we written below
exports.getAllBooks = async (req, res) => {      //async await  required as it can took time to fetch
    const books = await BookModel.find(); //will get all the books from BookModel    BUT IT WILL AWAIT 

    if (books.length === 0) {
        return res.status(404).json({ success: false, message: "No Book found" });
    }
    res.status(200).json({ success: true, data: books });
};


// multiple async functions will run parallely
exports.getSingleBookById = async (req, res) => {
    const { id } = req.params;

    const book = await BookModel.findById(id);

    if (!book) {  // if book is not present
        return res.status(404).json({  //return is a last statement in any function
            success: false,
            message: "book not found"
        });
    }
    return res.status(200).json({ success: true, data: book });
};


exports.getAllIssuedBooks = async (req, res) => {
    //   console.log("issued Books");

    const users = await UserModel.find({
        issuedBook: { $exists: true }     //all the books which are having issuedBooks as attributes will got returned
    }).populate("issuedBook");   //populate will return issuedBooks value

    const issuedBooks = users.map((each) => new IssuedBook(each));    //finding using book-dto whether issued book is present in object or not

    if (issuedBooks.length === 0) {
        return res.status(404).json({ success: false, message: "No books has been issued" });
    }
    return res.status(200).json({
        success: true,
        data: issuedBooks
    });
};


exports.addNewBook = async (req, res) => {
    const { data } = req.body;

    if (!data) {
        return res.status(400).json({
            success: false,
            message: "No Data Was Provided to add book",
        });
    }

    await BookModel.create(data); //create is a mongoose function which is used to create new files  , BookModel is a model of schema.

    const allBooks = await BookModel.find(); //showing all books which are at this time after creation of new books 


    return res.status(200).json({
        success: true,
        data: allBooks,
    });
}


exports.updateBookById = async (req, res) => {          
    const { id } = req.params;
    const { data } = req.body;

    const updatedBook = await BookModel.findOneAndUpdate(  //3 arguments
        {
            _id: id     //id of data which need to be updated
        },
        data,        //data which is given in req body
        {
            new: true,//to get update on mongo db we need to refresh it
        }
    );// findOneAndUpdate  is function provided by mongoose which makes work easier
    return res.status(200).json({
        success: true,
        data: updatedBook,
    });
};

// module.exports = { getAllBooks, getSingleBookById }  at place of this we written export above
const express = require("express");
const { getAllBooks, getSingleBookById, getAllIssuedBooks, addNewBook, updateBookById } = require("../controllers/book-controller"); //AUTO IMPORTED
const { books } = require("../data/books.json");  //importing array
const { users } = require("../data/users.json");  //required for issue book details
const router = express.Router();

router.use(express.urlencoded());

// importing user and book model
const { UserModel, BookModel } = require("../models/model-index");

// creating routes
/**
 * Route: /books
 * Method: GET
 * Description: Get all the books
 * Access: Public
 * Parmanters: none
 */
//at place of double times books in url we will replace one book here with /
// http://localhost/books/books  =>  http://localhost/books//
/*
router.get('/', (req, res) => {
  res.status(200).json({   //multiple parameters can be passed
    success: true,
    data: books
  });
});*/
router.get("/", getAllBooks);


/* 
Route:/books/:id
Method:GET
Description:Get book by their id
Access: Public
Parameters:id
*/
/*router.get("/:id", (req, res) => {
  const { id } = req.params;

  const book = books.find((each) => each.id === id);

  if (!book) {  // if book is not present
    return res.status(404).json({  //return is a last statement in any function
      success: false,
      message: "book not found"
    });
  }
  return res.status(200).json({ success: true, data: book });
});  */
router.get("/:id", getSingleBookById);
  
/**
 * Route:/users/issued/by-user       //because it got trapped by above code id at place of issued due to it runs line by line
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameters:none   //if colon in url so it is parameter otherwise not
 */
/*
router.get("/issued/by-user", (req, res) => {
  //   console.log("issued Books");
  const usersWithIssuedBook = users.filter((each) => {
    if (each.issuedBook) {  //if object contains issuedBook attribute
      return each;
    }
  });
  const issuedBooks = [];

  usersWithIssuedBooks.forEach((each) => {   //id of books array is made as issuedBook in users array  and multiple user can have same book issued o forEach
    const book = books.find((book) => book.id === each.issuedBook);

    // we find objects in users array which matches now adding the attributs from users array to book array
    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;

    issuedBooks.push(book); //pushing list of books into array
  });
  
  if (issuedBooks.length === 0) {
    return res.status(404).json({ success: false, message: "No books has been issued" });
  }
  return res.status(200).json({
    success: true,
    data: issuedBooks
  });
});*/
router.get("/issued/by-user", getAllIssuedBooks);

/**
 * Route: /books
 * Method: POST
 * Description: Create new book
 * Access: Public
 * Parmanters: none
 */
/*
router.post("/", (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({
      success: false,
      message: "No Data Was Provided to add book",
    });
  }

    // checking if book is already there in list
  const book = books.find((each) => each.id === data.id);

  if (book) {
    return res.status(404).json({
      success: false,
      message: "Book already exists with the same Id",
    });
  }

  const allBooks = [...books, data];  //appending new book added in body in post request

  return res.status(200).json({
    success: true,
    data: allBooks,
  });
});
*/
router.post("/", addNewBook);

/**
 * Route: /books/:id
 * Method: PUT
 * Description: Updating a book
 * Access: Public
 * Parmanters: id
 */
/*
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const book = books.find((each) => each.id === id);

  if (!book) {
    return res.status(400).json({
      success: false,
      message: "Book not found with that particular Id",
    });
  }
  const UpdatedData = books.map((each) => {
    if (each.id === id) {
      return { ...each, ...data };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    data: UpdatedData,
  });
});
*/
router.put("/:id", updateBookById);
  
  
module.exports = router;

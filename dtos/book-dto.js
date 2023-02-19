// dto=data transfer object   it is a type of class

class IssuedBook {
    _id; // means here it is default which is generated by mongodb it can be hexadecimal value
    name;
    genre;
    price;
    publisher;
    issuedBy;
    issuedDate;
    returnDate;

    constructor(user) {
        this._id = user.issuedBook._id;
        this.name = user.issuedBook.name;
        this.genre = user.issuedBook.genre;
        this.price = user.issuedBook.price;
        this.publisher = user.issuedBook.publisher;
        this.issuedBy = user.issuedBook.issuedBy;
        this.issuedDate = user.issuedBook.issuedDate;
        this.returnDate = user.issuedBook.returnDate;
    }
}

module.exports = IssuedBook;
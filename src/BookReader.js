'use strict';

function BookReader (username, password, fullName, about){
    this.username   = (username === undefined) ? 'johndoe' : username;
    //hash password if provided
    this.password   = (password === undefined) ? 'ha54321sh' : 'ha'+password.split('').reverse().join('')+'sh';
    this.fullName   = (fullName === undefined) ? username : fullName;
    this.about      = (about === undefined) ? 'I love books!' : about;
    this.book       = [];
    this.isLoggedIn = true;
    this.favorite   = [];
}
//Re-usable functions are added to the Class prototype object to avoid using up memory each time an instance of the class is created, this increases efficiency.

//Log the user out
BookReader.prototype.logout = function logout(){
    return this.isLoggedIn = false;
}

//Log the user in
BookReader.prototype.login = function login(password){
    password = (password === undefined) ? false : 'ha'+password.split('').reverse().join('')+'sh';
    if (password === this.password) return this.isLoggedIn = true;
}

//Massage to be displayed if the wronge bookId is entered
BookReader.prototype.unavailable = 'Please enter a valid book Id, use the "list()" function to view a list of books';

//Add a book to the collection
BookReader.prototype.addBook = function  addBook(book){
    if (!this.isLoggedIn) return 'Please login first.';
    if (book.constructor !== Array) {
        console.log('Book must be an array in this format: [name, type, status], the status should be; "finished", "wishlist" or Number(page currently being read)');
        return false;
    }
    if (book.length !== 3) return 'The book must have a "name", "type" and "status"';
    if (typeof book[0] !== 'string' || typeof book[1] !== 'string') return 'Book "name" and "type" must be a string.';
    if (typeof book[2] !== 'string' && typeof book[2] !== 'number') return 'Book "status" must be either a string or number';
    this.book.push({name: book[0], type: book[1], status: book[2]});
    return book[0] + ' was added';
}

//Add a book to favorite books list
BookReader.prototype.addFavorite = function addFavorite(bookName){
    if (!this.isLoggedIn) return 'Please login first.';
    if (typeof bookName !== 'string') return 'Please enter the book name only as a string';
    this.favorite.push(bookName);
    return bookName + ' was added to favorites';
}

//List available books
BookReader.prototype.listBooks = function listBooks(){
    if (this.book.length === 0) return 'Collection is empty';
    console.log('==== Listing  book collection of ' + this.fullName + ' ====');
    for (var i = 0; i < this.book.length; i++){
        var status = (typeof this.book[i].status === 'number') ? 'On page ' + this.book[i].status : this.book[i].status;
        console.log( (i+1) + '. ' + this.book[i].name);
        console.log('type: ' + this.book[i].type);
        console.log('status: ' + status + '\n');
    }
    return this.book.length + ((this.book.length > 1) ? ' books available' : ' book available');
}

//Check if a book is available
BookReader.prototype.isBookAvailable = function isBookAvailable(bookId){
    if (typeof bookId !== 'number') return false;
    if (this.book[bookId - 1] === undefined) return false;
    return true;
}

//Select a book
BookReader.prototype.selectBook = function selectBook(bookId){
    if (!this.isBookAvailable(bookId)) return this.unavailable;
    return this.book[bookId - 1];
}

//Read a book (update the current status)
BookReader.prototype.readBook = function readBook(bookId, newStatus){
    if (!this.isLoggedIn) return 'Please login first.';
    if (!this.isBookAvailable(bookId)) return this.unavailable;
    if (typeof newStatus !== 'string' && typeof newStatus !== 'number') return 'Book "status" must be either a string or number';
    this.book[bookId - 1].status = newStatus;
    return (typeof newStatus === 'number') ? 'On page ' + newStatus : newStatus;
}

//Finish reading the book (status becomes 'finished')
BookReader.prototype.finishBook = function finishBook(bookId){
    if (!this.isLoggedIn) return 'Please login first.';
    return this.readBook(bookId, 'finished');
}

//Remove a book from the collection
BookReader.prototype.removeBook = function removeBook(bookId){
    if (!this.isLoggedIn) return 'Please login first.';
    if (!this.isBookAvailable(bookId)) return this.unavailable;
    this.book.splice(bookId - 1, 1);
    return 'removed';
}

module.exports = BookReader;
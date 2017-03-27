/**
 * Represenres a library
 * @construct
 */
let Library = function(){
	this.bookRepository;	    // BookRepository
	this.bookRentRepository;    // BookRentRepository
};
/**
 * A rent was made by consumer
 * @function rent
 * @param  {Consumer} consumer [description]
 * @param  {Book[?]}  books    [description]
 * @return {void}              [description]
 */
Library.prototype.rent = function(consumer, books){
	this.bookRepository.remove(books);
	this.bookRentRepository.add(new BookRent(consumer, books, new Date()));
};
/**
 * Consumer return books he rent
 * @function rentReturn
 * @param  {BookRent} bookRent [description]
 * @return {void}              [description]
 */
Library.prototype.rentReturn = function(bookRent){
	this.bookRepository.add(bookRent.getAllBooks());
};
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
 * @param  {Consumer} consumer [description]
 * @param  {Book[?]}  books    [description]
 * @return {void}              [description]
 */
Library.prototype.rent = function(consumer, books){
	this.bookRepository.remove(books);
	this.bookRentRepository.add(new BookRent(consumer, books, new Date()));
};
// TODO
//Library.prototype.rentReturn = function(){};
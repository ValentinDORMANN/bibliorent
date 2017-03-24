let Library = function(){
	this.bookRepository;	    // BookRepository
	this.bookRentRepository;    // BookRentRepository
};
Library.prototype.rent = function(consumer, books){
	this.bookRepository.remove(books);
	this.bookRentRepository.add(new BookRent(consumer, books, new Date()));
};
// TODO
//Library.prototype.rentReturn = function(){};
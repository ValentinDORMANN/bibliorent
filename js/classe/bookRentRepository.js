/**
 * Representes a book's rent repository and store all rents from database
 * @constructor
 */
let BookRentRepository = function(){
	this.bookRents = [];	// BookRent[?]
}
/**
 * @constant  {String}
 */
BookRentRepository.COLLECTION = "biblio.bookrent";
/**
 * @constant  {String}
 */
BookRentRepository.URL_DB = "mongodb://localhost:27017/biblio";
/**
 * Find a book rent by retrival date
 * @function findByRetrivalDate
 * @param  {Date}        retrivalDate [description]
 * @return {BookRent[?]}              [description]
 * @throws {BookRentalNotFoundError}  [description]
 */
BookRentRepository.prototype.findByRetrivalDate = function(retrivalDate){
	let bookRentsFound = [];
	for(index in this.bookRents){
		if(this.isSameDate(retrivalDate, this.bookRents[index].getRetrivalDate())){
			bookRentsFound.push(this.bookRents[index]);	
		}
	}
	if(bookRentsFound.length == 0){
		throw new BookRentalNotFoundError();
	}
	return bookRentsFound;
};
/**
 * Find a book rent by retrival date
 * @function findByRentDate
 * @param  {Date}        rentDate     [description]
 * @return {BookRent[?]}              [description]
 * @throws {BookRentalNotFoundError}  [description]
 */
BookRentRepository.prototype.findByRentDate = function(rentDate){
	let bookRentsFound = [];
	for(index in this.bookRents){
		if(this.isSameDate(rentDate, this.bookRents[index].getRentDate())){
			bookRentsFound.push(this.bookRents[index]);	
		}
	}
	if(bookRentsFound.length == 0){
		throw new BookRentalNotFoundError();
	}
	return bookRentsFound;
};
/**
 * Find a book rent by retrival date and consumer
 * @function findByRentDateAndConsumer
 * @param  {Date}        rentDate     [description]
 * @param  {Consumer}    consumer     [description]
 * @return {BookRent[?]}              [description]
 * @throws {BookRentalNotFoundError}  [description]
 */
BookRentRepository.prototype.findByRentDateAndConsumer = function(rentDate, consumer){
	let bookRentsFound = [];
	for(index in this.bookRents){
		if(this.isSameDate(rentDate, this.bookRents[index].getRentDate())
			&& this.bookRents[index].isSameConsumer(consumer)){
			bookRentsFound.push(this.bookRents[index]);	
		}
	}
	if(bookRentsFound.length == 0){
		throw new BookRentalNotFoundError();
	}
	return bookRentsFound;
};
/**
 * check if 2 dates are identical (day, month, year)
 * @function isSameDate
 * @private
 * @param  {Date}  date1 [description]
 * @param  {Date}  date2 [description]
 * @return {Boolean}     [description]
 */
BookRentRepository.prototype.isSameDate = function(date1, date2){
	return date1.getDate() == date2.getDate()
			&& date1.getMonth() == date2.getMonth()
			&& date1.getFullYear() == date2.getFullYear(); 
};
/**
 * Store book rental in database
 * @function storeBookRent
 * @param  {BookRent} bookRent [description]
 * @return {void}              [description]
 */
BookRentRepository.prototype.storeBookRent = function(bookRent){
	MongoClient.connect(BookRentRepository.URL_DB, function(error, db){
		assert.equal(null, error);
		console.log("[MSG] Server connection successful");
		db.collection(BookRentRepository.COLLECTION).insertOne(bookRent, function(error, row){
			assert.equal(null, error);
			console.log("[MSG] Collection connection successful");
			assert.equal(1, row.insertedCount);
			console.log("[MSG] Insertion successful");
			db.close();
		});
	});
};
/**
 * Add a book rental in repository
 * @function add
 * @param {BookRent} bookRent [description]
 */
BookRentRepository.prototype.add = function(bookRent){
	this.bookRents.push(bookRent);
};

/**
 * Representes book rental not found exception caused by all cases (missing criteria, not good criteria, incomplete search)
 * @param {string} message [description]
 * @constructor
 */
let BookRentalNotFoundError = function(message){
  Error.captureStackTrace(this);
  this.message = message || "Book rental not found";
  this.name = "BookRentalNotFoundError";
}
BookRentalNotFoundError.prototype = Object.create(Error.prototype);


module.exports = BookRentRepository;
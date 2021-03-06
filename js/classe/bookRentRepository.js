/*let MongoClient = require("mongodb").MongoClient;
let assert = require('assert');
let BookRent = require('./BookRent');
let Consumer = require('./Consumer');
let Book = require('./Book');
let Opinion = require('./Opinion');*/

/**
 * Representes a book's rent repository and store all rents from database
 * @constructor
 */
let BookRentRepository = function(){
	this.bookRents = [];	// BookRent[?]
	//loadBookRent();
}
/**
 * @constant  {String}
 */
BookRentRepository.COLLECTION = "biblio.bookrent";
/**
 * @constant  {String}
 */
BookRentRepository.URL_DB = "mongodb://127.0.0.1:27017/biblio";
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
		db.collection(BookRentRepository.COLLECTION).insertOne(bookRent, function(error, row){
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
BookRentRepository.prototype.loadBookRents = function(bookRents){
	// TODO improve conversion
	for(let i in bookRents){
		let bookRentToInsert = new BookRent()._id(bookRents[i]._id).isPay(bookRents[i].isPaid)
		                                     .retrivalDateIso(bookRents[i].retrivalDate).rentDateIso(bookRents[i].retrivalDate);
		let consumerToInsert = new Consumer().pseudo(bookRents[i].consumer.pseudo);
		bookRentToInsert.consumer(consumerToInsert);
		for(let j in bookRents[i].books){
			let bookToInsert = new Book()._id(bookRents[i].books[j]._id).title(bookRents[i].books[j].title).author(bookRents[i].books[j].author)
			                             .isbn(bookRents[i].books[j].isbn).publisher(bookRents[i].books[j].publisher)
			                             .publicationDateIso(bookRents[i].books[j].publicationDate)
																	 .collection(bookRents[i].books[j].collection).page(bookRents[i].books[j].page)
																	 .summary(bookRents[i].books[j].summary).cover(bookRents[i].books[j].cover)
																	 .rating(bookRents[i].books[j].rating).language(bookRents[i].books[j].language).genre(bookRents[i].books[j].genres);
			for(let k in bookRents[i].books[j].opinions){
				let opinionToInsert = new Opinion().advise(bookRents[i].books[j].opinions[k].advise).publishDate(bookRents[i].books[j].opinions[k].publishDate);
				let consumerToInsert = new Consumer().pseudo(bookRents[i].books[j].opinions[k].consumer.pseudo);
				opinionToInsert.consumer(consumerToInsert);
				bookToInsert.opinionT(opinionToInsert);
			}
			bookRentToInsert.book(bookToInsert);
		}
		this.add(bookRentToInsert);
	}
};

let loadBookRent = function(){
	return MongoClient.connect(BookRentRepository.URL_DB).then(function(db){
		let collection = db.collection(BookRentRepository.COLLECTION);
		return collection.find().toArray();
	}).then(function(bookRents){
		bookRentRepository.loadBookRents(bookRents);
	}).catch(function(error){
		console.log("[ERR] "+error);
	});
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


// ========================= TEST ==============================
let bookRentRepository = new BookRentRepository();
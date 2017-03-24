let MongoClient = require("mongodb").MongoClient;
let assert = require("assert");
let Book = require('./Book');

/**
 * Representes a book repository and store all books from database.
 * @constructor
 */
let BookRepository = function(){
	this.books = [];		// Book[?]
	// TODO populate books with books come from db (this.loadBooks)
	/*let myBook = new Book().title('La symphonie des siècles: Rhapsody').author('Elizabeth Haydon').isbn('9782756400242').publisher('Pygmalion').publicationDate(2000,9,15).publicationCountry('USA').collection('Fantasy').page(656).summary("Tandis qu'elle enfile les rues d'Easton à toute allure pour fuir les hommes de Michael, un ancien amant devenu baron de la pègre locale, Rhapsody butte sur deux étranges personnages, qui l'aideront à régler son problème de façon ... définitive. Ce qu'elle ignore, c'est qu'Achmed le Serpent et Grunthor, le géant Firbolg, sont eux-mêmes confrontés à une situation autrement périlleuse. Aussi, lorsqu'ils l'entraînent dans un voyage au coeur de la Terre le long des racines de Sagia, l'Arbre-Monde, Rhapsody se demande si elle n'a pas fait preuve d'un excès de confiance...").language('FR').cover('https://images.noosfere.org/couv/p/pygmalion0024-2006.jpg').genre('Roman').genre('Fantasy').rating(3.95);
	let myBook2 = new Book().title('La symphonie des siècles: Prophecy').author('Elizabeth Haydon').isbn('9782756400273').publisher('Pygmalion').publicationDate(2000,9,15).publicationCountry('USA').collection('Fantasy').page(390).summary("Quoique leur périple au cœur du monde n’ait duré à leurs yeux que quelques années, quatorze siècles se sont en réalité écoulés depuis le départ des trois compagnons de l’île de Serendair ! Sur les conseils de Llauron, le patriarche d’une bien étrange religion, la jeune Baptistrelle et ses acolytes ont pris la route de Roland, puis celle de Canriff, l’ancienne capitale des Cymriens. Achmed et Grunthor nourrissent le projet d’y rallier sous une seule et même bannière les différentes tribus bolgs des montagnes et de ressusciter la grande nation qui fut la leur. Mais il faudra compter avec une nouvelle recrue, au caractère aussi trempé que l’acier des couteaux qu’elle lance avec une précision mortelle…").language('FR').cover('https://images-na.ssl-images-amazon.com/images/I/51n9O9TD%2BqL._AC_UL320_SR202,320_.jpg').genre('Roman').genre('Fantasy').rating(3.95);
	this.books.push(myBook, myBook2);*/
}
/**
 * @constant  {String}
 */
BookRepository.COLLECTION = "biblio.book";
/**
 * @constant  {String}
 */
BookRepository.URL_DB = "mongodb://localhost:27017/biblio";
/**
 * Find a book in its own collection by looking for world matches in title's book
 * @function findByTitleKey
 * @param  {string}  titleKey   [description]
 * @return {Book[?]} bookFound  [description]
 * @throws {BookNotFoundError}  [description]
 */
BookRepository.prototype.findByTitleKey = function(titleKey){
	let titleKeys = titleKey.toLowerCase().split(" ");
	let bookFound = [];
	for(index in this.books){
		for(key in titleKeys){
			if(this.books[index].getTitle().toLowerCase().search(titleKeys[key]) != -1){
				bookFound.push(this.books[index]);
				break;
			}
		}
	}
	if(bookFound.length == 0){
		throw new BookNotFoundError();
	}
	return bookFound;
};
/**
 * Find a book in in its own collection by looking for isbn
 * @function findByIsbn
 * @param  {string} isbn        [description]
 * @return {Book}               [description]
 * @throws {BookNotFoundError}  [description]
 */
BookRepository.prototype.findByIsbn = function(isbn){
	for(index in this.books){
		if(this.books[index].getIsbn() == isbn){
			return this.books[index];
		}
	}
	throw new BookNotFoundError();
};
/**
 * Find a book in its own collection by looking for author
 * @function findByAuthor
 * @param  {string}  author     [description]
 * @return {Book[?]} bookFound  [description]
 * @throws {BookNotFoundError}  [description]
 */
BookRepository.prototype.findByAuthor = function(author){
	let authors = author.toLowerCase().split(" ");
	let bookFound = [];
	for(index in this.books){
		for(key in authors){
			if(this.books[index].getAuthor().toLowerCase().search(authors[key]) != -1){
				bookFound.push(this.books[index]);
				break;
			}
		}
	}
	if(bookFound.length == 0){
		throw new BookNotFoundError();
	}
	return bookFound;
};
/**
 * Find a book in its own collection by looking for genre
 * @function findByGenre
 * @param  {string}   genre      [description]
 * @return {Book[?]}  bookFound  [description]
 * @throws {BookNotFoundError}   [description]
 */
BookRepository.prototype.findByGenre = function(genre){
	let bookFound = [];
	for(index in this.books){
		let genres = this.books[index].getGenres();
		for(key in genres){
			if(genres[key].toLowerCase() == genres[key].toLowerCase()){
				bookFound.push(this.books[index]);
				break;
			}
		}
	}
	if(bookFound.length == 0){
		throw new BookNotFoundError();
	}
	return bookFound;
}
/**
 * Store book in database
 * @function storeBook
 * @param  {Book} book [description]
 * @return {void}      [description]
 */
BookRepository.prototype.storeBook = function(book){
	MongoClient.connect(BookRepository.URL_DB, function(error, db){
		assert.equal(null, error);
		console.log("[MSG] Server connection successful");
		db.collection(BookRepository.COLLECTION).insertOne(book, function(error, row){
			assert.equal(null, error);
			console.log("[MSG] Collection connection successful");
			assert.equal(1, row.insertedCount);
			console.log("[MSG] Insertion successful");
			db.close();
		});
	});
};
/**
 * Remove book(s) from repository
 * @function remove
 * @param  {Book || Book[?]} book          [description]
 * @return {void}          						     [description]
 * @throws {BookNotFoundError}  					 [description]
 */
BookRepository.prototype.remove = function(book){
	if(Array.isArray(book)){ // case Book[?]
		for(let i in book){
			let indexBookFound = this.books.indexOf(book[i]);
			if(indexBookFound == -1){
				throw new BookNotFoundError();
			}
			this.books = this.books.splice(indexBookFound, 1);
		}
	}else{									 // case Book
		let indexBookFound = this.indexOf(book);
		if(indexBookFound == -1){
			throw new BookNotFoundError();
		}
		this.books = this.books.splice(indexBookFound, 1);
	}
};
/**
 * Return index of a book in books
 * @function indexOf
 * @override
 * @param  {Book} book [description]
 * @return {int}       return -1 if book not found
 */
BookRepository.prototype.indexOf = function(book){
	for(let i in this.books){
		if(this.books[i].equals(book)){
			return i;
		}
	}
	return -1;
};
BookRepository.prototype.saveBooks = function(books){
	this.books.concat(books);
};

let loadBook = function(){
	return MongoClient.connect(BookRepository.URL_DB).then(function(db){
		let collection = db.collection(BookRepository.COLLECTION);
		return collection.find().toArray();
	}).then(function(books){
		bookRepository.saveBooks();
	}).catch(function(error){
		console.log(error);
	});
};
/**
 * Representes book not found exception caused by all cases (missing criteria, not good criteria, incomplete search)
 * @param {string} message [description]
 * @constructor
 */
let BookNotFoundError = function(message){
  Error.captureStackTrace(this);
  this.message = message || "Book not found";
  this.name = "BookNotFoundError";
}
BookNotFoundError.prototype = Object.create(Error.prototype);

module.exports = BookRepository;


/*let loadBookPomise = function(){
	return MongoClient.connect(BookRepository.URL_DB).then(function(db){
		let collection = db.collection(BookRepository.COLLECTION);
		return collection.find().toArray();
	}).then(function(books){
		return books;
	}).catch(function(error){
		console.log(error);
	});
};*/
 
// ========================= TEST ==============================
let bookRepository = new BookRepository();
loadBook();
let myBook2 = new Book().title('La symphonie des siècles: Prophecy').author('Elizabeth Haydon').isbn('9782756400273').publisher('Pygmalion').publicationDate(2000,9,15).publicationCountry('USA').collection('Fantasy').page(390).summary("Quoique leur périple au cœur du monde n’ait duré à leurs yeux que quelques années, quatorze siècles se sont en réalité écoulés depuis le départ des trois compagnons de l’île de Serendair ! Sur les conseils de Llauron, le patriarche d’une bien étrange religion, la jeune Baptistrelle et ses acolytes ont pris la route de Roland, puis celle de Canriff, l’ancienne capitale des Cymriens. Achmed et Grunthor nourrissent le projet d’y rallier sous une seule et même bannière les différentes tribus bolgs des montagnes et de ressusciter la grande nation qui fut la leur. Mais il faudra compter avec une nouvelle recrue, au caractère aussi trempé que l’acier des couteaux qu’elle lance avec une précision mortelle…").language('FR').cover('https://images-na.ssl-images-amazon.com/images/I/51n9O9TD%2BqL._AC_UL320_SR202,320_.jpg').genre('Roman').genre('Fantasy').rating(3.95);
//bookRepository.storeBook(myBook2);
/*loadBooks().then(function(books){
	//console.info("promise fillfull with books", books);
	for(index in books){
		console.log("("+index+") ISBN "+books[index].isbn);
	}
}, function(error){
	console.error("promise rejected", error);
});*/
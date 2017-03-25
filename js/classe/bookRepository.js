let MongoClient = require("mongodb").MongoClient;
let Book = require('./Book');
let Opinion = require('./Opinion');
let Consumer = require('./Consumer');

/**
 * Representes a book repository and store all books from database.
 * @constructor
 */
let BookRepository = function(){
	this.books = [];		// Book[?]
	loadBook();
}
/**
 * @constant  {String}
 */
BookRepository.COLLECTION = "biblio.book";
/**
 * @constant  {String}
 */
BookRepository.URL_DB = "mongodb://127.0.0.1:27017/biblio";
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
		db.collection(BookRepository.COLLECTION).insertOne(book, function(error, row){
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
 * Add book(s) in repository
 * @function add
 * @param {Book || Book[?]} book [description]
 * @return {void}          			 [description]
 */
BookRepository.prototype.add = function(book){
	if(Array.isArray(book)){ // case Book[?]
		for(let i in book[i]){
			this.books.push(book[i]);
		}
	}else{									 // case Book
		this.books.push(book);
	}
}
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
/**
 * Load and convert raw data from database to books
 * @param  {Object} books [description]
 * @return {void}         [description]
 */
BookRepository.prototype.loadBooks = function(books){
	// TODO improve conversion
	for(let i in books){
		let bookToInsert = new Book()._id(books[i]._id).title(books[i].title).author(books[i].author).isbn(books[i].isbn)
																	.publisher(books[i].publisher).publicationDateIso(books[i].publicationDate)
																	.collection(books[i].collection).page(books[i].page).summary(books[i].summary)
																	.cover(books[i].cover).rating(books[i].rating).language(books[i].language).genre(books[i].genres);
		for(let j in books[i].opinions){
			let opinionToInsert = new Opinion().advise(books[i].opinions[j].advise).publishDate(books[i].opinions[j].publishDate);
			let consumerToInsert = new Consumer().pseudo(books[i].opinions[j].consumer.pseudo);
			opinionToInsert.consumer(consumerToInsert);
			bookToInsert.opinionT(opinionToInsert);
		}
		this.add(bookToInsert);
	}
	console.log(this);
};

let loadBook = function(){
	return MongoClient.connect(BookRepository.URL_DB).then(function(db){
		let collection = db.collection(BookRepository.COLLECTION);
		return collection.find().toArray();
	}).then(function(books){
		bookRepository.loadBooks(books);
	}).catch(function(error){
		console.log("[ERR] "+error);
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

 
// ========================= TEST ==============================
let bookRepository = new BookRepository();
//let myBook2 = new Book().title('La symphonie des siècles: Prophecy').author('Elizabeth Haydon').isbn('9782756400273').publisher('Pygmalion').publicationDate(2000,9,15).publicationCountry('USA').collection('Fantasy').page(390).summary("Quoique leur périple au cœur du monde n’ait duré à leurs yeux que quelques années, quatorze siècles se sont en réalité écoulés depuis le départ des trois compagnons de l’île de Serendair ! Sur les conseils de Llauron, le patriarche d’une bien étrange religion, la jeune Baptistrelle et ses acolytes ont pris la route de Roland, puis celle de Canriff, l’ancienne capitale des Cymriens. Achmed et Grunthor nourrissent le projet d’y rallier sous une seule et même bannière les différentes tribus bolgs des montagnes et de ressusciter la grande nation qui fut la leur. Mais il faudra compter avec une nouvelle recrue, au caractère aussi trempé que l’acier des couteaux qu’elle lance avec une précision mortelle…").language('FR').cover('https://images-na.ssl-images-amazon.com/images/I/51n9O9TD%2BqL._AC_UL320_SR202,320_.jpg').genre('Roman').genre('Fantasy').rating(3.95);
//bookRepository.storeBook(myBook2);
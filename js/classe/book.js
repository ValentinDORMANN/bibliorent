/**
 * Representes a book
 * @constructor
 */
let Book = function(){
	this._id;								// string
	this.title;							// string
	this.author;						// string
	this.isbn;							// string
	this.genres = [];				// string[?]
	this.publisher;					// string
	this.publicationDate;		// Date
	this.publicationCountry;// string
	this.collection;				// string
	this.page;							// int
	this.summary;						// string
	this.cover;							// string src img
	this.rating;						// double
	this.opinions = [];			// Opinion[?]
	this.language;					// string
};
Book.prototype._id = function(_id){
	this._id = _id;
	return this;
};
Book.prototype.title = function(title){
	this.title = title;
	return this;
};
Book.prototype.author = function(author){
	this.author = author;
	return this;
};
Book.prototype.isbn = function(isbn){
	this.isbn = isbn;
	return this;
};
Book.prototype.genre = function(genre){
	if(!this.isGenreAlreadySet(genre)){
		this.genres.push(genre);
	}
	return this;
};
Book.prototype.isGenreAlreadySet = function(genre){
	for(var elem in this.genre){
		if(elem.toLowerCase() == genre.toLowerCase()){
			return true;
		}
	}
	return false;
};
Book.prototype.publisher = function(publisher){
	this.publisher = publisher;
	return this;
};
Book.prototype.publicationDate = function(year, month, day){
	this.publicationDate = new Date(year, month, day);
	return this;
};
Book.prototype.publicationDateIso = function(dateIso){
	this.publicationDate = new Date(dateIso);
	return this;
};
Book.prototype.publicationCountry = function(country){
	this.publicationCountry = country;
	return this;
};
Book.prototype.collection = function(collection){
	this.collection = collection;
	return this;
};
Book.prototype.page = function(page){ 
	this.page = page;
	return this; 
};
Book.prototype.summary = function(summary){
	this.summary = summary;
	return this;
};
Book.prototype.cover = function(coverImageURL){
	this.cover = coverImageURL;
	return this;
};
Book.prototype.language = function(language){
	this.language = language;
	return this;
};
Book.prototype.rating = function(rate){
	const MIN = 0;
	const MAX = 5;
	if(rate > MAX){ rate = MAX; }
	if(rate < MIN){ rate = MIN; }
	this.rating = rate; 
	return this;
};
Book.prototype.opinion = function(consumer, message){
	this.opinions.push(new Opinion().advise(message).consumer(consumer).publishDate(new Date()));
	return this;
};
Book.prototype.opinionT = function(opinion){
	this.opinions.push(opinion);
	return this;
};
Book.prototype.equals = function(book){
	return this.isbn == book.getIsbn();
}
Book.prototype.getTitle = function(){ return this.title; };
Book.prototype.getAuthor = function(){ return this.author; };
Book.prototype.getIsbn = function(){ return this.isbn; };
Book.prototype.getGenres = function(){ return this.genres; };


module.exports = Book;
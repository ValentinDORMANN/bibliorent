/**
 * Representes a rentail book
 * @constructor
 * @param {Consumer} consumer [description]
 * @param {Book[?]}  books    [description]
 * @param {Date}     rentDate [description]
 */
let BookRent = function(){
	this._id;								// string
	this.isPaid = false;	  // boolean
	this.books = [];				// Book[?]
	this.retrivalDate;	    // Date
	this.rentDate;					// Date
	this.consumer;					// Consumer
	switch(arguments.length){
		case 3: // BookRent = function(consumer, books, rentDate)
			this.consumer = arguments[0];
			this.books = arguments[1];
			this.rentDate = arguments[2];
			this.retrivalDate = this.addDays(this.rentDate, BookRent.MAX_RENTAL_DAY);
			break;
	}
};
/**
 * @constant  {String}
 */
BookRent.MAX_RENTAL_DAY = 14;
BookRent.prototype._id = function(id){
	this._id = id;
	return this;
};
BookRent.prototype.isPay = function(isPaidStr){
	this.isPaid = isPaidStr;
	return this;
};
BookRent.prototype.book = function(book){
	if(Array.isArray(book)){ 	// case Book[?]
		for(let i in book){
			this.books.push(book)
		}
	}else{										// case Book
		this.books.push(book);
	}
	return this;
};
BookRent.prototype.retrivalDateIso = function(retrivalDateIso){
	this.retrivalDate = new Date(retrivalDateIso);
	return this;
};
BookRent.prototype.rentDateIso = function(rentDateIso){
	this.rentDate = new Date(rentDateIso);
	return this;
};
BookRent.prototype.consumer = function(consumer){
	this.consumer = consumer;
	return this;
};

/**
 * Add days to a date
 * @function addDays
 * @private
 * @param   {Date} startDate    [description]
 * @param   {int}  numberOfDays [description]
 * @returns {Date} returnDate   [description]
 */
BookRent.prototype.addDays = function(startDate, numberOfDays){
	var returnDate = new Date(startDate.getFullYear(), startDate.getMonth(),
	                          startDate.getDate()+numberOfDays, 
	                          startDate.getHours(), startDate.getMinutes(), startDate.getSeconds());
	return returnDate;
}
BookRent.prototype.pay = function(){
	this.isPaid = true;
}
BookRent.prototype.delayedDay = function(){
	const MS_IN_DAY = 24*60*60*1000;
	return Math.floor((this.retrivalDate - new Date()) / MS_IN_DAY);
};
BookRent.prototype.isSameConsumer = function(consumer){
	return this.consumer.equals(consumer);
};
BookRent.prototype.equals = function(bookRent){
	return this.isSameConsumer(bookRent.getConsumer())
				&& this.rentDate == bookRent.getRentDate();
}
BookRent.prototype.getRetrivalDate = function(){ return this.retrivalDate; };
BookRent.prototype.getRentDate = function(){ return this.rentDate; };
BookRent.prototype.getConsumer = function(){ return this.consumer; };
BookRent.prototype.getAllBooks = function(){ return this.books; };


module.exports = BookRent;
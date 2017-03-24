/**
 * Representes a rentail book
 * @constructor
 * @param {Consumer} consumer [description]
 * @param {Book[?]}  books    [description]
 * @param {Date}     rentDate [description]
 */
let BookRent = function(consumer, books, rentDate){
	this.isPaid = false;																									// boolean
	this.books = books;																										// Book[?]
	this.retrivalDate = this.addDays(rentDate, BookRent.MAX_RENTAL_DAY);	// Date
	this.rentDate = rentDate;																							// Date
	this.consumer = consumer;																							// Consumer
};
/**
 * @constant  {String}
 */
BookRent.MAX_RENTAL_DAY = 14;
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



module.exports = BookRent;
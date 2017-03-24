let Opinion = function(){
	this.advise;		// string
	this.consumer;		// Consumer
	this.publishDate;	// Date
};
Opinion.prototype.advise = function(message){
	this.advise = message;
	return this;
};
Opinion.prototype.consumer = function(consumer){
	this.consumer = consumer;
	return this;
};
Opinion.prototype.publishDate = function(date){
	this.publishDate = date;
	return this;
};
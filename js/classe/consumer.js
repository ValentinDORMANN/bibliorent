let Consumer = function(){
	this.pseudo;	// string
};
Consumer.prototype.pseudo = function(pseudo){
	this.pseudo = pseudo;
	return this;
};
Consumer.prototype.getSpeudo = function(){ return this.pseudo; };
/**
 * Check if this consumer equals another on
 * @param  {Consumer} consumer [description]
 * @return {boolean}           [description]
 */
Consumer.prototype.equals = function(consumer){
	return this.pseudo == consumer.getSpeudo();
};

module.exports = Consumer;
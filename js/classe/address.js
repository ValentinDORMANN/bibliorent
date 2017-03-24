let Address = function(){
	this.number;	// int
	this.street;	// string
	this.city;		// string
	this.country;	// string
	this.zipcode;	// string
}
Address.prototype.number = function(number){
	this.number = Math.abs(number); 
	return this; 
};
Address.prototype.street = function(street){
	this.street = street;
	return this; 
};
Address.prototype.city = function(city){
	this.city = city;
	return this; 
};
Address.prototype.country = function(country){
	this.country = country;
	return this; 
};
Address.prototype.zipcode = function(zipcode){
	this.zipcode = zipcode;
	return this; 
};
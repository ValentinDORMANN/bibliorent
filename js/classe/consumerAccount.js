let ConsumerAccount = function(){
	this.pseudo;	// string
	this.mail;		// mail
	this.cellphone;	// string
	this.firstName; // string
	this.lastName;	// string
	this.birthdate;	// Date
	this.gender;	// string
	this.password;	// string
	this.address;	// Address
	// TODO payment information
};
ConsumerAccount.prototype.pseudo = function(pseudo){
	// TODO check pseudo is unique in BD
	this.pseudo = pseudo;
	return this;
};
ConsumerAccount.prototype.mail = function(mail){
	// TODO check mail is unique in BD
	this.mail = mail.toLowerCase();
	return this;
};
ConsumerAccount.prototype.cellphone = function(cellphone){
	this.cellphone = cellphone.replace(/ .*/,'');
	return this;
};
ConsumerAccount.prototype.firstName = function(firstName){
	this.firstName = firstName;
	return this;
};
ConsumerAccount.prototype.lastName = function(lastName){
	this.lastName = lastName;
	return this;
};
ConsumerAccount.prototype.birthdate = function(year, month, day){
	this.birthdate = new Date(year, month, day);
	return this;
};
ConsumerAccount.prototype.gender = function(gender){
	switch(gender.substr(0,1).toUpperCase()){
		case 'H':
		case 'M': this.gender = 'M'; break;
		case 'W':
		case 'F': this.gender = 'F'; break;
		default:  this.gender = '?'; break;
	}
	return this;
};
ConsumerAccount.prototype.password = function(password){
	this.password = password;
	return this;
};
ConsumerAccount.prototype.address = function(address){
	this.address = address;
	return this;
};
ConsumerAccount.prototype.age = function(){
  const MS_TO_DAY = 1000*60*60*24;

  var now = new Date();

  function isLeap(year) {
    return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
  }

  var days = Math.floor((now.getTime() - this.birthdate.getTime())/MS_TO_DAY);
  var age = 0;
  
  for (var y = this.birthdate.getFullYear(); y <= now.getFullYear(); y++){
    var daysInYear = isLeap(y) ? 366 : 365;
    if (days >= daysInYear){
      days -= daysInYear;
      age++;
      // increment the age only if there are available enough days for the year.
    }
  }
  return age;
};
ConsumerAccount.prototype.isCorrectPassword = function(password){
	return this.password == password;
};
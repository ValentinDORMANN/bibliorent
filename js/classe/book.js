let Opinion = require('./Opinion');
let Consumer = require('./Consumer');
// Load jsdom, and create a window.
let jsdom = require("jsdom").jsdom;
let doc = jsdom();
let window = doc.defaultView;

// Load jQuery with the simulated jsdom window.
$ = require('jquery')(window);

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
};
/**
 * Display book in template web page
 * @function display
 * @return {void} [description]
 */
Book.prototype.display = function(){
	const COLOR_CSS = ["label-success","label-warning","label-danger","label-info"];
	const NB_COLOR_CSS = 4;

	var htmlContent = '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">'+
                    	'<div class="panel panel-danger">'+
        								'<div class="panel-heading">'+
          								'<b>'+this.title+'</b>'+
          								'<p title="Auteur"><i class="fa fa-user fa-lg"></i>'+
            							'<a href="#"><i>'+this.author+'</i></a><i class="fa fa-heart fa-4x pull-right"></i></p>'+
                          '<p></p>'+
												'</div>'+
        								'<div class="panel-body">'+
          								'<p class="text-center"><img src="'+this.cover+'"></p>'+
          								'<p class="text-warning"><b>'+this.opinions.length+'</b> subscribers'+
          							'<span title="Rating">';
  var ratingCalc = this.calcRate();
  for(let i = 5; i > 0 ; i--){
   	if(i - ratingCalc >= 1){
   		htmlContent +=      '<i class="fa fa-star-o fa-lg pull-right"></i>';
   	}else if(i - ratingCalc >= 0.5){ 
   		htmlContent +=      '<i class="fa fa-star-half-empty fa-lg pull-right"></i>';
   	}else{
   		htmlContent +=      '<i class="fa fa-star fa-lg pull-right"></i>';
   	}
  }
  htmlContent +=				'</span></p>'+
        							'</div>'+
        							'<div class="panel-heading">'+
          						'<div class="row">'+
            						'<div class="col-xs-4 col-md-4" title="Derniere lecture">'+
              					'<p class="text-center"><i class="glyphicon glyphicon-stats fa-2x "></i><span class="badge">'+this.opinions.length+'</span></p>'+
            					'</div>'+
            					'<div class="col-xs-4 col-md-4" title="Distinction">'+
              					'<p class="text-center"><i class="glyphicon glyphicon-certificate fa-2x "></i><span style class="badge"></span><span class="badge">3</span></p>'+
            					'</div>'+
            					'<div class="col-xs-4 col-md-4" title="Exemplaire disponible">'+
              					'<p class="text-center"><i class="glyphicon glyphicon-file fa-2x"></i><span class="badge">1</span></p>'+
            					'</div>'+
          					'</div>'+
          					'<p>'+this.summary+'</p>'+
          					'<hr>'+
          					'<p></p>'+
          					'<div title="">'+
            					'<a href="./paymentForm.html" class="btn btn-block btn3d btn-danger"><i class="fa fa-shopping-cart fa-lg fa-fw"></i>Add to card</b></a>'+
          					'</div>'+
          					'<p></p><br>'+
          					'<p>';
  for(i in this.genres){
  	htmlContent +=		'<span class="label '+COLOR_CSS[i%NB_COLOR_CSS]+'">'+this.genres[i]+'</span>'
  }
  htmlContent +=		'</p></div></div></div>';
  console.log($("#cards_content"));
	$("body").append(htmlContent);
};
/**
 * Calculate rating in scale from 0 to 5 by step 0.5
 * @function calcRate
 * @private
 * @return {decimal} [description]
 */
Book.prototype.calcRate = function(){
	var int = Math.round(this.rating);
	var dec = this.rating - int;
	if(dec >= 0.25 && dec <= 0.75){ dec = 0.5; }
	else{ dec = 0.0; }
	return int+dec;
};
Book.prototype.getTitle = function(){ return this.title; };
Book.prototype.getAuthor = function(){ return this.author; };
Book.prototype.getIsbn = function(){ return this.isbn; };
Book.prototype.getGenres = function(){ return this.genres; };


module.exports = Book;
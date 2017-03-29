/*let BookRepository = require('./BookRepository');
let BookRentRepository = require('./BookRentRepository');
let Book = require('./Book');
let Consumer = require('./Consumer');
let Opinion = require('./Opinion');*/

/**
 * Represenres a library
 * @construct
 */
let Library = function(){
	this.bookRepository = new BookRepository();			// BookRepository
	this.bookRentRepository = new BookRentRepository();	// BookRentRepository
	// TODO remove
	let myConsumer = new Consumer().pseudo('Val');
	let myBook = new Book().title('La symphonie des siècles: Rhapsody').author('Elizabeth Haydon').isbn('9782756400242').publisher('Pygmalion').publicationDate(2000,9,15).publicationCountry('USA').collection('Fantasy').page(656).summary("Tandis qu'elle enfile les rues d'Easton à toute allure pour fuir les hommes de Michael, un ancien amant devenu baron de la pègre locale, Rhapsody butte sur deux étranges personnages, qui l'aideront à régler son problème de façon ... définitive. Ce qu'elle ignore, c'est qu'Achmed le Serpent et Grunthor, le géant Firbolg, sont eux-mêmes confrontés à une situation autrement périlleuse. Aussi, lorsqu'ils l'entraînent dans un voyage au coeur de la Terre le long des racines de Sagia, l'Arbre-Monde, Rhapsody se demande si elle n'a pas fait preuve d'un excès de confiance...").language('FR').cover('https://images.noosfere.org/couv/p/pygmalion0024-2006.jpg').genre('Roman').genre('Fantasy').rating(3.2).opinion(myConsumer, 'Très bon livre.');
    let myBook2 = new Book().title('La symphonie des siècles: Prophecy').author('Elizabeth Haydon').isbn('9782756400273').publisher('Pygmalion').publicationDate(2000,9,15).publicationCountry('USA').collection('Fantasy').page(390).summary("Quoique leur périple au cœur du monde n’ait duré à leurs yeux que quelques années, quatorze siècles se sont en réalité écoulés depuis le départ des trois compagnons de l’île de Serendair ! Sur les conseils de Llauron, le patriarche d’une bien étrange religion, la jeune Baptistrelle et ses acolytes ont pris la route de Roland, puis celle de Canriff, l’ancienne capitale des Cymriens. Achmed et Grunthor nourrissent le projet d’y rallier sous une seule et même bannière les différentes tribus bolgs des montagnes et de ressusciter la grande nation qui fut la leur. Mais il faudra compter avec une nouvelle recrue, au caractère aussi trempé que l’acier des couteaux qu’elle lance avec une précision mortelle…").language('FR').cover('https://images-na.ssl-images-amazon.com/images/I/51n9O9TD%2BqL._AC_UL320_SR202,320_.jpg').genre('Roman').genre('Fantasy').rating(3.25).opinion(myConsumer, 'Très bon livre.');
    let myBook3 = new Book().title('L\'apprenti assassin').author('Robin Hobb').isbn('2857045603').publisher('Pygmalion').publicationDate(1998,12,17).publicationCountry('USA').collection('Grands roman').page(416).summary("Ce premier livre raconte les débuts de Fitz comme bâtard, au château de Castelcerf où il commence son entraînement d'assassin, et se termine par sa première mission qu'il finira au péril de sa vie. L'histoire débute avec Fitz (jusque là appelé « Petit »), déposé par son modeste grand-père au château d'Œil-de-Lune, puis présenté au prince Vérité, sa famille ne pouvant l'entretenir à cause de ses moyens limités. Malgré son très jeune âge, Fitz montre des dispositions dans une ancienne magie obscure appelée le Vif, qui lui permet de communiquer par télépathie avec un chien nommé Fouinot. Vérité décide d'emmener Fitz au château de Castelcerf. Inquiet pour la sécurité de ce fils illégitime, le prince Chevalerie (le père de Fitz) et sa femme, la dame Patience, ont abdiqué de leurs rangs de roi-servant et reine-servante bien avant que Fitz n'arrive à la cité royale. Fitz n'a pas un sang purement royal, il n'est donc pas accepté par le reste de la noblesse. Burrich, le bras droit du prince Chevalerie, est chargé d'élever Fitz, en le prenant comme garçon d'écurie. Fitz apprend vite ses devoirs et grandit bien qu'il soit très seul, surtout après que Burrich lui ait interdit d'utiliser le Vif (une ancienne magie dont on prétend qu'elle transforme les hommes en bêtes) pour se lier avec les animaux. Fitz accepte finalement d'être l'homme lige du roi Subtil et jure allégeance au roi. Il est engagé au service du roi Subtil et s'installe dans le château même. De là il rencontre Umbre, qui sera son instructeur d'assassinat…").language('FR').cover('https://images-na.ssl-images-amazon.com/images/I/51ubIh-p8lL._SX307_BO1,204,203,200_.jpg').genre('Roman').genre('Fantasy').rating(4.65).opinion(myConsumer, 'Je recommande vivement.');
    this.bookRepository.add([myBook, myBook2, myBook3]);
};
/**
 * A rent was made by consumer
 * @function rent
 * @param  {Consumer} consumer [description]
 * @param  {Book[?]}  books    [description]
 * @return {void}              [description]
 */
Library.prototype.rent = function(consumer, books){
	this.bookRepository.remove(books);
	this.bookRentRepository.add(new BookRent(consumer, books, new Date()));
};
/**
 * Consumer return books he rent
 * @function rentReturn
 * @param  {BookRent} bookRent [description]
 * @return {void}              [description]
 */
Library.prototype.rentReturn = function(bookRent){
	this.bookRepository.add(bookRent.getAllBooks());
};
/**
 * Display all books
 * @function displayBooks
 * @return {void} [description]
 */
Library.prototype.displayBooks = function(){
	this.bookRepository.displayBooks();
};

module.exports = Library;
let myConsumer = new Consumer().pseudo('Val');
let myConsumer2 = new Consumer().pseudo('lily')
let myBook = new Book().title('La symphonie des siècles: Rhapsody').author('Elizabeth Haydon').isbn('9782756400242').publisher('Pygmalion').publicationDate(2000,9,15).publicationCountry('USA').collection('Fantasy').page(656).summary("Tandis qu'elle enfile les rues d'Easton à toute allure pour fuir les hommes de Michael, un ancien amant devenu baron de la pègre locale, Rhapsody butte sur deux étranges personnages, qui l'aideront à régler son problème de façon ... définitive. Ce qu'elle ignore, c'est qu'Achmed le Serpent et Grunthor, le géant Firbolg, sont eux-mêmes confrontés à une situation autrement périlleuse. Aussi, lorsqu'ils l'entraînent dans un voyage au coeur de la Terre le long des racines de Sagia, l'Arbre-Monde, Rhapsody se demande si elle n'a pas fait preuve d'un excès de confiance...").language('FR').cover('https://images.noosfere.org/couv/p/pygmalion0024-2006.jpg').genre('Roman').genre('Fantasy').rating(3.2).opinion(myConsumer, 'Très bon livre.');
let myBook2 = new Book().title('La symphonie des siècles: Prophecy').author('Elizabeth Haydon').isbn('9782756400273').publisher('Pygmalion').publicationDate(2000,9,15).publicationCountry('USA').collection('Fantasy').page(390).summary("Quoique leur périple au cœur du monde n’ait duré à leurs yeux que quelques années, quatorze siècles se sont en réalité écoulés depuis le départ des trois compagnons de l’île de Serendair ! Sur les conseils de Llauron, le patriarche d’une bien étrange religion, la jeune Baptistrelle et ses acolytes ont pris la route de Roland, puis celle de Canriff, l’ancienne capitale des Cymriens. Achmed et Grunthor nourrissent le projet d’y rallier sous une seule et même bannière les différentes tribus bolgs des montagnes et de ressusciter la grande nation qui fut la leur. Mais il faudra compter avec une nouvelle recrue, au caractère aussi trempé que l’acier des couteaux qu’elle lance avec une précision mortelle…").language('FR').cover('https://images-na.ssl-images-amazon.com/images/I/51n9O9TD%2BqL._AC_UL320_SR202,320_.jpg').genre('Roman').genre('Fantasy').rating(3.25).opinion(myConsumer, 'Très bon livre.');
let myBook3 = new Book().title('L\'apprenti assassin').author('Robin Hobb').isbn('2857045603').publisher('Pygmalion').publicationDate(1998,12,17).publicationCountry('USA').collection('Grands roman').page(416).summary("Ce premier livre raconte les débuts de Fitz comme bâtard, au château de Castelcerf où il commence son entraînement d'assassin, et se termine par sa première mission qu'il finira au péril de sa vie.").language('FR').cover('https://images-na.ssl-images-amazon.com/images/I/51ubIh-p8lL._SX307_BO1,204,203,200_.jpg').genre('Roman').genre('Fantasy').rating(3.45).opinion(myConsumer, 'Je recommande vivement.');
let myOpinion = new Opinion().advise('Très bon livre.').consumer(myConsumer).publishDate(new Date());
let myAddress = new Address().number(10).street('rue').city('paris').country('France').zipcode('75000');
let myConsumerAccount = new ConsumerAccount().pseudo('Val').mail('prenom.nom@domain.fr').cellphone('00.11.22.33.44').firstName('prenom').lastName('nom').birthdate(1995,9,17).gender('man').password('1234').address(myAddress);
let myBookRent = new BookRent(myConsumer, [myBook, myBook2], new Date());
let myBookRent2 = new BookRent(myConsumer2, [myBook], new Date());


console.log(myConsumer);
console.log(myBook);
console.log(myBook.calcRate());
console.log(myOpinion);
console.log(myAddress);
console.log(myConsumerAccount);
console.log(myBookRent);
console.log(myBookRent2);

console.log(JSON.stringify(myBook));
console.log(JSON.stringify(myBook2));
console.log(JSON.stringify(myBook3));

console.log(JSON.stringify(myBookRent));
console.log(JSON.stringify(myBookRent2));
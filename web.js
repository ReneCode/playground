var express = require("express");
var app = express();
app.use(express.logger());

var MongoClient = require('mongodb').MongoClient;


var mongoUri = process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/mydb'; 

MongoClient.connect(mongoUri, function(err, db) {
    "use strict";
    if(err) {
		throw err;
	}


	var people = db.collection('people');

	app.get('/', function(request, response) {
		response.send('<h3>Hello World' + request + ' :</h3> ' + mongoUri);
		
		people.insert({name:'test-name'}, function(err, inserted) {
			console.log ("inserted");
		});
	});


	app.get('/a', function(request, response) {

		var doc = "hallo";
		response.send('a: ' + doc);
		
	});


});


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
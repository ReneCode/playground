var express = require("express");
var cons = require('consolidate');
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

	app.engine('html', cons.swig);
	app.set('view engine', 'html');
	app.set('views', __dirname + '/views');

    // Express middleware to populate 'req.cookies' so we can access cookies
//    app.use(express.cookieParser());

    // Express middleware to populate 'req.body' so we can access POST variables
//    app.use(express.bodyParser());



	app.get('/', function(req, res, next) {
		"use scrict";
//		res.send('HALLLO WEB');
		return res.render('main', {title:'Main-Title'});
	});


	app.get('/x', function(request, response) {
		people.insert({name:'test-name', date:new Date() }, function(err, inserted) {
			console.log ("inserted");

			var id = "";
			if (inserted) {
				id = inserted[0]['_id'];
			}
			console.log("id:" + JSON.stringify(inserted));			
			response.send('inserted:' + id);

		});
	});


	app.get('/a', function(request, response) {

		var doc = "hallo";
		response.send('server sendet: ' + doc);
		
	});


});


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
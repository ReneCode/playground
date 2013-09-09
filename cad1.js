
//
//  CAD-1
//

var express = require('express');
var cons = require('consolidate');
var app = express();
app.use(express.bodyParser());

var MongoClient = require('mongodb').MongoClient;

// connection-string to mongoDB
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/mydb';
console.log("starting cad1");

MongoClient.connect(mongoUri, function(err, db) {
	"use strict";
	if (err) {
		throw err;
	}

	var dbColCad = db.collection('cad'); 
	app.engine('html', cons.swig)
	app.set('view engine', 'html');
	app.set('views', __dirname + '/views');

	app.get('/', function(req, res, next) {
		"use strict";
		//cad.find({}, function(err, ))
		res.render('cad1');
	});

	app.get('/reload', function(req, res, next) {
		"use scrit";
		dbColCad.find().toArray( function(err, docs) {
			res.send(docs);
		} );
	});

	app.post('/action', function(req, res, next) {
		"use strict";
		var action = req.body.action;
		console.dir(req.body);
		dbColCad.insert(req.body, function(err, inserted) {
			res.send(inserted._id + " ok");
		});
	});
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});



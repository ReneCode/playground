var express = require("express");
var app = express();
app.use(express.logger());


MongoClient = require('mongodb').MongoClient ;
MONGOHQ_URL = 'mongodb://heroku:adf0fd4c52b89f381353631748c7074a@paulo.mongohq.com:10000/app17829332';
local = "mongodb://localhost:27017/app17829332";


app.get('/', function(request, response) {
	response.send('Hello World - That is my first Web-Site!');
	
	/*
	
	var mongoUri = process.env.MONGOLAB_URI || 
	  process.env.MONGOHQ_URL || 
	  'mongodb://localhost/mydb'; 
	

	console.log("URI:" + mongoUri);
	response.send('hello Mongo:' + mongoUri);
		
	MongoClient.connect(mongoUri, function(err, db) {
	    "use strict";
	    if(err) {
			response.send("error on mongo connect");
			throw err;
		}

		response.send('Hello World - That is my first Web-Site!');


	});
*/
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
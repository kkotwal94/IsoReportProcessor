var express = require('express'); //require express
var fs = require('fs'); //file
var mongoose = require('mongoose'); //require mongoose library
var app = express(); //declare app as our decorator
var server = require('http').Server(app); //Using https
var passport = require('passport'); //for login library
var db = require('./config/db'); //grabbing the url for our db


var connect = function() { //a function to connect to our db
	mongoose.connect(db.url, function(err, res) {
		if(err) {
			console.log('Error connecting to: ' + db.url + '. ' + err); 
		}else {
			console.log('Succeeded and connected to: ' + db.url);
		}
	});
};

connect(); //call function

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);


//Bootstrap our models
fs.readdirSync(__dirname + '/models').forEach(function(file) {
	if(~file.indexOf('.js')) require(__dirname + '/models/' + file);
});

// Bootstrap passport config
require('./config/passport')(app, passport);

// Bootstrap application settings
require('./config/express')(app, passport);
// Bootstrap routes
require('./config/routes')(app, passport);

server.listen(app.get('port'));


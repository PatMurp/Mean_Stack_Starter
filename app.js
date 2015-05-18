var express = require('express');

var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/starter-dev')

require('./config/express').addMiddleware(app)
require('./routes')(app)

app.listen(process.env.PORT || 4000, function() {
	console.log('Express server listening');
});
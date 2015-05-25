var express = require('express');

var app = module.exports.app = exports.app = express();
app.use(require('connect-livereload')());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/starter-dev')
var passport = require('passport');

require('./config/express').addMiddleware(app)
require('./routes')(app)
require('./config/passport')

app.listen(process.env.PORT || 4000, function() {
	console.log('Express server listening');
});
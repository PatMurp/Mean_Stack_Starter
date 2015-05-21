var express = require('express');
var bodyParser =  require('body-parser');
var cookieParser  = require('cookie-parser');
var errorHandler = require('errorHandler');
var morgan = require('morgan');
var passport = require('passport');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

exports.addMiddleware = function(app) {
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(morgan('dev'));
	app.use(cookieParser());
	app.use(express.static('client'));
	app.use(passport.initialize());
	app.use(errorHandler()); // Error handler - has to be last
}
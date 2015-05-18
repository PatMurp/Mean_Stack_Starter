var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var UserSchema = new Schema({
	name: String,
	email: String,
	password: String
});

module.exports = mongoose.model('users', UserSchema);
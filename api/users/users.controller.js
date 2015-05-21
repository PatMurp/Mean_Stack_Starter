var User = require('./user.model');
var passport = require('passport');
var jwt = require('express-jwt');

// error handling function
function handleError(res, err) {
	return res.send(500, err);
}

// get list of users
exports.index = function(req, res) {
	User.find(function(err, users) {
		if(err) { return handleError(res, err);}
		return res.status(200).json(users);
	});
};

// update existing user
exports.update = function(req, res) {
	User.findById(req.params.id, function(err, user) {
		user.name = req.body.name
		user.email = req.body.email
		user.password = req.body.password
		user.save(function(err) {
			if(err) { return handleError(res, err);}
			return res.status(200).json("Update sucessfull");
		});
	});
};

// delete a user 
exports.destroy = function(req, res) {
	User.findById(req.params.id, function(err, user) {
		user.remove(function(err) {
			if(err) { return handleError(res ,err);}
			return res.status(200).send("Deleted");
		});
	});
};

// register user
exports.register = function(req, res, next) {
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({ message: "Please fill out all fields" });
	}
	var user = new User();
	user.name = req.body.name
	user.username = req.body.username;
	user.setPassword(req.body.password)

	user.save(function(err) {
		if (err) { return next(err); }

		return res.json({ token: user.generateJWT()})
	});
};

// login user
exports.login = function(req, res, next) {
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({ message: "Please fill out all fields"});
	}
	passport.authenticate('local', function(err, user, info) {
		if(err) { return next(err); }

		if(user) {
			return res.json({ token: user.generateJWT()});
		} else {
			return res.status(401).json(info);
		}
	})(req, res, next);
};

// logout user
exports.logout = function(req, res) {
	req.logout();
	res.redirect('/login');
};

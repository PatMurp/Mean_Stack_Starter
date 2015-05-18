var User = require('./user.model')

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

// create a new user
exports.create = function(req, res) {
	User.create(req.body, function(err, user) {
		if(err) { return handleError(res, err);}
		return res.status(201).json(user);
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

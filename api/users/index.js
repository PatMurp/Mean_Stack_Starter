var express = require('express');
var controller = require('./users.controller');

var router = express.Router();

router.get('/', controller.index);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/logout', controller.logout)

module.exports = router;
'use strict';
var express = require('express');
var controller = require('../../controller/public/user');
var router = express.Router();
router.get('/login',controller.login);
router.post("/register",controller.register);
module.exports = router;
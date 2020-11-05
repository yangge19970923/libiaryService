'use strict';
var express = require('express');
var controller = require('../../controller/public/index');
var router = express.Router();

router.get("/isMobile", controller.isMobile);
router.get('/login',controller.login);
router.post("/register",controller.register);
router.get("/verifyImg",controller.verifyImg);
module.exports = router;
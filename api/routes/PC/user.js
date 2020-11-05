'use strict';
var express = require('express');
var controller = require('../../controller/PC/user');
var router = express.Router();
router.post("/collectNovel",controller.collectNovel);
router.post("/cancelCollectNovel",controller.cancelCollectNovel);
module.exports = router;
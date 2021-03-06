'use strict';
var express = require('express');
var controller = require('../../controller/PC/novel');
var router = express.Router();
router.get("/recommend",controller.recommend);
router.get("/findCollectNovel",controller.findCollectNovel);
router.get("/classification",controller.classification);
router.get("/classDetail",controller.classDetail);
router.post("/novelChapters",controller.novelChapters);
router.post("/novelDetal",controller.novelDetal);
router.get("/rank",controller.rank);
router.post("/search",controller.search);
module.exports = router;
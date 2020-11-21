'use strict';
var express = require('express');
var controller = require('../../controller/Mobile/novel');
var router = express.Router();

router.get("/recommend",controller.recommend);
router.post("/chapterNovel",controller.chapterNovel);
router.post("/novelContent",controller.novelContent);
router.get("/rankSort",controller.rankSort);
router.post('/rankDetail',controller.rankDetail);
router.post('/search',controller.search);
router.post("/bookShelf",controller.bookShelf);

module.exports = router;
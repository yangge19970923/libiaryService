var express = require('express');
var controller = require('../../controller/Mobile/user');
var router = express.Router();

router.post("/mCollection", controller.mCollection);
router.post("/cancelMCollection", controller.cancelMCollection);

module.exports = router;
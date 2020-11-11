'use strict';
var mongoose = require('mongoose');
var Novel = mongoose.model('Novel');
var common = require('../common');
const { reptile1, reptile2, reptile3, reptile4, reptile5 } = require("../../../public/untils/reptiles.js");

// 小说推荐
const recommend = async (req, res, next) => {
    const { idCardNumber } = req.query;
    const result = await reptile1("http://www.xbiquge.la/", "#wrapper>#main>.novelslist");
    if(result) {
        Novel.findOne({idCardNumber},(err, resources) => {
            if(resources && resources.novelInfo.length) {
                result.forEach((item, index) => {
                    resources.novelInfo.forEach((item2, index2) => {
                        if(item.urlId === item2.urlId) {
                            item.collectionColorShow = true;
                        }
                    })
                })
            }
            if(result.length) {
                common.sendJsonResponse(res, 200, {code: 1, result});
            }else {
                common.sendJsonResponse(res, 200, {code: -1, msg: "未获取到数据"});
            }
        })
    }
}

// 查询收藏起来的小说
const findCollectNovel = (req, res, next) => {
    const { idCardNumber } = req.query;
    Novel.findOne({idCardNumber},(err, data) => {
        if(err) {
            console.log(err);
            return;
        }
        if(data) {
            common.sendJsonResponse(res, 200, {code: 1, novelInfo: data.novelInfo});
        } else {
            common.sendJsonResponse(res, 200, {code: -1, msg: "未获取到数据"});
        }
    })
}

//小说排行
const rank = async (req, res, next) => {
    const result = await reptile5("http://www.xbiquge.la/paihangbang/", "#wrapper #main .box");
    if(result) {
        common.sendJsonResponse(res, 200, {code: 1, result});
    }
}

//小说分类
const classification = async (req, res, next) => {
    const result = await reptile2("http://www.xbiquge.la/", "#wrapper .nav ul");
    if(result) {
        common.sendJsonResponse(res, 200, {code: 1, result});
    }
}

//小说分类详细内容
const classDetail = async (req, res, next) => {
    const { href, idCardNumber } = req.query;
    const result = await reptile1("http://www.xbiquge.la" + href, "#wrapper #main #hotcontent .ll");
    if(result) {
        Novel.findOne({idCardNumber},(err, resources) => {
            if(resources && resources.novelInfo.length) {
                result.novelInfo.forEach((item, index) => {
                    resources.novelInfo.forEach((item2, index2) => {
                        if(item.urlId === item2.urlId) {
                            item.collectionColorShow = true;
                        }
                    })
                })
            }
            if(result.novelInfo.length) {
                common.sendJsonResponse(res, 200, {code: 1, result});
            }else {
                common.sendJsonResponse(res, 200, {code: -1, msg: "未获取到数据"});
            }
        })
    }
}

//小说章节内容
const novelChapters = async (req, res, next) => {
    const { urlId } = req.body;
    if(urlId) {
        const result = await reptile3(urlId, '#wrapper .box_con');
        if(result) {
            common.sendJsonResponse(res, 200, {code: 1, result});
        } else {
            common.sendJsonResponse(res, 200, {code: -1, msg: "未获取到数据"});
        }
    }
}

//小说详情内容
const novelDetal = async (req, res, next) => {
    const {chapterUrl} = req.body;
    const result = await reptile4("http://www.xbiquge.la" + chapterUrl, '#wrapper .content_read .box_con');
    if(result) {
        common.sendJsonResponse(res, 200, {code: 1, result});
    } else {
        common.sendJsonResponse(res, 200, {code: -1, msg: "未获取到数据"});
    }
}

module.exports = {
    recommend,
    findCollectNovel,
    classification,
    classDetail,
    novelChapters,
    novelDetal,
    rank
};
'use strict';
var mongoose = require('mongoose');
var MNovel = mongoose.model('MNovel');
var common = require('../common');
const { reptile1, reptile2, reptile3, reptile4, reptile5, reptile6 } = require("../../../public/untils/mReptiles.js");

// 小说推荐
const recommend = async (req, res, next) => {
    const result = await reptile1("http://m.biquge.info/","#rmtj .xbk");
    if(result.length) {
        common.sendJsonResponse(res, 200, {code: 1, result});
    }else {
        common.sendJsonResponse(res, 200, {code: -1, msg: "未获取到数据"});
    }
}

// 小说章节内容
const chapterNovel = async (req, res, next) => {
    const { urlId, idCardNumber } = req.body;
    const result = await reptile2("http://m.biquge.info" + urlId, '.cover')
    if(result) {
        MNovel.findOne({idCardNumber}, (err, resources) => {
            if(err) {
                console.log(err);
            }
            if(resources && resources.novelInfo.length) {
                resources.novelInfo.forEach((item,index) => {
                    if(item.urlId === result.urlId) {
                        result.collectionShow = true;
                    }
                })
            }
            common.sendJsonResponse(res, 200, {code: 1, result});
        })
    } else {
        common.sendJsonResponse(res, 200, {code: -1, msg: "未获取到数据"});
    }
}

//小说详情内容
const novelContent = async (req, res, next) => {
    console.log(req.body.urlId);
    const { urlId } = req.body;
    const result = await reptile3("http://m.biquge.info" + urlId.replace(/"/g,""), "#zj");
    if(result) {
        common.sendJsonResponse(res, 200, {code: 1, result});
    } else {
        common.sendJsonResponse(res, 200, {code: -1, msg: "未获取到数据"});
    }
}

//小说排行分类
const rankSort = async (req, res, next) => {
    const result = await reptile4('http://m.biquge.info/top.html','.sorttop ul li.prev');
    if(result.length) {
        common.sendJsonResponse(res, 200, {code: 1, result});
    } else {
        common.sendJsonResponse(res, 200, {code: -1, msg: "未获取到数据"});
    }
}

//小说排行榜详情内容
const rankDetail = async (req, res, next) => {
    var { urlId } = req.body;
    const result = await reptile5("http://m.biquge.info" + urlId,'.list .xbk');
    if(result) {
        common.sendJsonResponse(res, 200, {code: 1, result});
    } else {
        common.sendJsonResponse(res, 200, {code: -1, msg: "未获取到数据"});
    }
}

//小说搜索
const search = async (req, res, next) => {
    const {name} = req.body;
    const result = await reptile6(name, '.users .bookone');
    if(result.length) {
        common.sendJsonResponse(res, 200, {code: 1, result});
    } else {
        common.sendJsonResponse(res, 200, {code: -1, msg: "未获取到数据"});
    }
}

//书架
const bookShelf = async (req, res, next) => {
    const { idCardNumber } = req.body;
    MNovel.findOne({ idCardNumber }, (err, resources) => {
        if(err) {
            console.log(err);
            return;
        }
        if(resources.novelInfo.length) {
            common.sendJsonResponse(res, 200, {code: 1, result: resources.novelInfo});
        } else {
            common.sendJsonResponse(res, 200, {code: -1, result: '未查询到数据'});
        }
    })
}

module.exports = {
    recommend,
    chapterNovel,
    novelContent,
    rankSort,
    rankDetail,
    search,
    bookShelf
}
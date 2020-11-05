'use strict';
var mongoose = require('mongoose');
var common = require('../common');
var UUID = require('uuid'); //生成唯一的身份id;
var { setCrypto, createVerify } = require('../../../public/untils/base.js');
var User = mongoose.model('User');
var Novel = mongoose.model('Novel');


//收藏小说
const collectNovel = (req, res) => {
    // console.log(req.body);
    let novelInfo = []
    const {idCardNumber, novelInfoItem} = req.body;
    Novel.findOne({idCardNumber},(err, data) => {
        if(err) {
            common.sendJsonResponse(res, 200, {code: -1, msg: '未知错误'});
            return;
        }
        if(data) {
            data.novelInfo = data.novelInfo.filter((item, index) => {
                if(item.urlId !== novelInfoItem.urlId) {
                    return item;
                }
            })
            novelInfo.push(...data.novelInfo, novelInfoItem);
            Novel.update({idCardNumber}, {$set: {novelInfo}}).then(ress => {
                common.sendJsonResponse(res, 200, {code: 1, msg: '收藏成功'});
            }).catch(errr => {
                common.sendJsonResponse(res, 200, {code: -1, msg: '收藏失败'});
            })
        }else {
            novelInfo.push(novelInfoItem);
            const novel = new Novel({idCardNumber, novelInfo});
            novel.save().then(ress => {
                common.sendJsonResponse(res, 200, {code: 1, msg: '收藏成功'});
            }).catch(errr => {
                common.sendJsonResponse(res, 200, {code: -1, msg: '收藏失败'});
            })
        }
    })
}

//取消收藏
const cancelCollectNovel = (req, res) => {
    let novelInfo = []
    const {idCardNumber, novelInfoItem} = req.body;
    Novel.findOne({idCardNumber},(err, data) => {
        if(err) {
            common.sendJsonResponse(res, 200, {code: -1, msg: '未知错误'});
            return;
        }
        if(data) {
            data.novelInfo = data.novelInfo.filter((item, index) => {
                if(item.urlId !== novelInfoItem.urlId) {
                    return item;
                }
            })
            novelInfo.push(...data.novelInfo);
            Novel.update({idCardNumber}, {$set: {novelInfo}}).then(ress => {
                common.sendJsonResponse(res, 200, {code: 1, msg: '取消收藏成功'});
            }).catch(errr => {
                common.sendJsonResponse(res, 200, {code: -1, msg: '取消收藏失败'});
            })
        }
    })
}

module.exports = {
    collectNovel,
    cancelCollectNovel
}
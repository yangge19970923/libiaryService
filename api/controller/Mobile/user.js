'use strict';
var mongoose = require('mongoose');
var MNovel = mongoose.model('MNovel');
var common = require('../common');

var mCollection = async (req, res, next) => {
    const {idCardNumber, novelInfoItem} = req.body;
    var novelInfo = [];
    MNovel.findOne({idCardNumber}, (err, data) => {
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
            MNovel.update({idCardNumber}, {$set: {novelInfo}}).then(ress => {
                common.sendJsonResponse(res, 200, {code: 1, msg: '收藏成功'});
            }).catch(errr => {
                common.sendJsonResponse(res, 200, {code: -1, msg: '收藏失败'});
            })
        }else {
            novelInfo.push(novelInfoItem);
            const mNovel = new MNovel({idCardNumber, novelInfo});
            mNovel.save().then(ress => {
                common.sendJsonResponse(res, 200, {code: 1, msg: '收藏成功'});
            }).catch(errr => {
                common.sendJsonResponse(res, 200, {code: -1, msg: '收藏失败'});
            })
        }
    })
}

const cancelMCollection = async (req, res, next) => {
    const {idCardNumber, novelInfoItem} = req.body;
    let novelInfo = [];
    MNovel.findOne({idCardNumber},(err, data) => {
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
            MNovel.update({idCardNumber},{$set: {novelInfo}}).then(ress => {
                common.sendJsonResponse(res, 200, {code: 1, msg: '取消收藏成功'});
            }).catch(errr => {
                common.sendJsonResponse(res, 200, {code: -1, msg: '取消收藏失败'});
            });
        }
    })
}

module.exports = { 
    mCollection,
    cancelMCollection
};
'use strict';
var mongoose = require('mongoose');
var common = require('../common');
var { setCrypto } = require('../../../public/untils/base.js');
var User = mongoose.model('User');
//登录
module.exports.login = function(req,res) {
    var userName = req.userName;
    User.find({'userName':userName},function(err,data) {
        if (err) {
            common.sendJsonResponse(res, 500, err);
            return;
        }
        if(data.length) {
            common.sendJsonResponse(res, 200, data);
        }else {
            common.sendJsonResponse(res, 200, {errMsg:'未查询到该用户'})
        }
        
    })
}

//注册
module.exports.register = function(req,res) {
    if(req.body) {
        const { username, password, sex, email } = req.body;
        const user = new User({username, password: setCrypto(password), sex, email});
        user.save().then(ress => {
            console.log(ress);
            common.sendJsonResponse(res, 200, {msg: "创建成功"});
        }).catch(err => {
            console.log(err);
            common.sendJsonResponse(res, 500, {msg: "创建失败"});
        })
    }
}
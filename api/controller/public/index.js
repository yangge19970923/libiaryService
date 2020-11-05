'use strict';
var mongoose = require('mongoose');
var common = require('../common');
var UUID = require('uuid'); //生成唯一的身份id;
var { setCrypto, createVerify } = require('../../../public/untils/base.js');
var User = mongoose.model('User');

//判断是移动端打开还是pc端,true是pc端，false移动端
const isMobile = (req, res) => {
    console.log(req.query);
    if(req.query) {
        req.session.isMobile = req.query.isMobile;
        let data = req.query;
        common.sendJsonResponse(res, 200, {code: 1, data});
    }else {
        common.sendJsonResponse(res, 200, {code: -1, msg: '失败'});
    }
};

//登录
const login = function(req,res) {
    //req.query 获取get传值
    const { username, password, verCode } = req.query;
    if(verCode !== req.session.captcha ) {
        common.sendJsonResponse(res, 200, {code: -1, msg: '图形验证码错误'});
        return;
    }
    User.findOne({username, password: setCrypto(password)},function(err,data) {
        if (err) {
            common.sendJsonResponse(res, 500, err);
            return;
        }
        if(data) {
            common.sendJsonResponse(res, 200, {code:1, data});
        }else {
            common.sendJsonResponse(res, 200, {code:-1, msg:'未查询到该用户'})
        }
    })
}

//注册
const register = function(req,res) {
    if(req.body) {
        const { username, password, sex, email } = req.body;
        User.findOne({username},(err, data) => {
            if(data) {
                if(username === data.username) {
                    common.sendJsonResponse(res, 200, {code:-1, msg:'用户名已存在'});
                    return;
                }
            }else {
                const idCardNumber = UUID.v1();
                const user = new User({idCardNumber, username, password: setCrypto(password), sex, email});
                user.save().then(ress => {
                    console.log(ress);
                    common.sendJsonResponse(res, 200, {msg: "注册成功"});
                }).catch(err => {
                    console.log(err);
                    common.sendJsonResponse(res, 500, {msg: "注册失败"});
                })
            }   
        })
    }
}

//生成验证码
const verifyImg = async function(req, res) {
    var result = await createVerify(req);
    if(result) {
        common.sendJsonResponse(res, 200, {code: 1, result});
    }
}

module.exports = {
    isMobile,
    login,
    register,
    verifyImg
}
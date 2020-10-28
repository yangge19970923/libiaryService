
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    role: {
        // admin 超级管理员
	    // normal 普通用户
        type: String,
        // required: true
        default: 'admin'
    },
	// 0 启用状态
	// 1 禁用状态
	state: {
		type: Number,
		default: 0
	}
});

module.exports = mongoose.model('User',userSchema);
var createError = require('http-errors');
var express = require('express');
var path = require('path');

//引用session
var session=require("express-session");
var cookieParser=require("cookie-parser")
var logger = require('morgan');//日志插件
require('./api/model/db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(cookieParser())

// express中是把session信息存储在内存中
// 配置session
app.use(session({
    secret:"dsafsafsf", //设置签名秘钥 内容可以任意填写
    cookie:{ maxAge:60*60*1000 }, //设置cookie的过期时间，例：80s后    session和相应的cookie失效过期
    resave:true, //强制保存，如果session没有被修改也要重新保存
    saveUninitialized:false //如果原先没有session那么久设置，否则不设置
}))

// view engine setup
// 设置模板文件夹
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//公众接口
var pubilc = require("./api/routes/public/index");
app.use('/api/pubilc',pubilc);

//PC端api接口
var user = require('./api/routes/PC/user');
var config = require('./api/routes/PC/config');
var novel = require('./api/routes/PC/novel');
app.use('/api/user',user);
app.use('/api/config',config);
app.use('/api/novel',novel);

//移动端api接口

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

//mongodb的配置代码
var mongoose = require("mongoose");
var dbURL = require("../config/db").DB_URL;


var readline = require('readline');//用于一次一行地读取可读流,一旦调用此代码，Node.js 应用程序将不会终止，直到 readline.Interface 关闭
if(process.platform === 'win32') { //查询操作系统的位数
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('SIGINT',function() {
        process.emit('SIGINT');
    })
}

 
mongoose.connect(dbURL,{ useNewUrlParser: true,useUnifiedTopology: true });
 
mongoose.connection.on('connected',function() {
    console.log('Mongoose connected to ' + dbURL);
});
 
mongoose.connection.on('error',function(err) {
    console.log('Mongoose connection error: ' + err);
})
 
mongoose.connection.on('disconnected',function() {
    console.log('Mongoose disconnected.');
});
 
var gracefulShutdown = function(msg,callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
 
process.once('SIGUSR2',function() {
    gracefulShutdown('nodemon restart',function() {
        process.kill(process.pid,'SIGUSR2');
    });
});
 
process.on('SIGINT',function() {
    gracefulShutdown('app termination',function() {
        process.exit(0);
    });
});
 
process.on('SIGTERM',function() {
    gracefulShutdown('CMS shutdown',function() {
        process.exit(0);
    });
});
 
require('./admin/user');
require('./admin/novel');
require('./admin/mNovel');

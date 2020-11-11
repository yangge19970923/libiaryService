var cheerio = require('cheerio'); //服务器使用jq语法
var superagent = require('superagent'); //请求代理
const userAgents = require("./User-Agent.js"); //浏览器头部信息
const userAgent = userAgents[parseInt(Math.random()*userAgents.length)];
const baseUrl = "https://www.kuaidaili.com/free/inha/";

const grab = () =>{
    return new Promise((resolve, reject) => {
        superagent.get(baseUrl).end((err, res) => {
            if(err) {
                console.log(err);
            }
            console.log(res);
            // const $ = cheerio.load(res.text);
            // const info = [];
            // let num = $("#content .con-body #list #listnav ul li").slice(-2).find("a").text();
            // console.log(num);
            return;
            superagent.get(baseUrl + 1 + '/')
                .set({ 'User-Agent': userAgent })
                .end((errr, ress) => {
                    if(errr) {
                        // console.log(errr);
                    }
                    if(ress) {
                        let $ = cheerio.load(ress.text);
                        console.log($("#content .con-body #list table tbody tr"));
                        $("#content .con-body #list table tbody tr").each((index, item) => {
                            console.log($(item).find('td').eq(0).text());
                            info.push({
                                ip: $(item).find('td').eq(0).text(),
                                port: $(item).find('td').eq(1).text(),
                                degrees: $(item).find('td').eq(2).text(),
                                type: $(item).find('td').eq(3).text(),
                                position: $(item).find('td').eq(4).text(),
                                speed: $(item).find('td').eq(5).text(),
                                vverTime: $(item).find('td').eq(6).text()
                            })
                        })
                        // console.log(info);
                    }
                })
            // for(var i=1; i <= num; i++) {
                // setTimeout(() => {
                //     superagent.get(baseUrl + i + '/')
                //     // .set({ 'User-Agent': userAgent })
                //     .end((errr, ress) => {
                //         if(errr) {
                //             // console.log(errr);
                //         }
                //         if(ress) {
                //             let $ = cheerio.load(ress.text);
                //             console.log($("#content .con-body #list table tbody tr"));
                //             $("#content .con-body #list table tbody tr").each((index, item) => {
                //                 info.push({
                //                     ip: $(item).find('td').eq(0).text(),
                //                     port: $(item).find('td').eq(1).text(),
                //                     degrees: $(item).find('td').eq(2).text(),
                //                     type: $(item).find('td').eq(3).text(),
                //                     position: $(item).find('td').eq(4).text(),
                //                     speed: $(item).find('td').eq(5).text(),
                //                     vverTime: $(item).find('td').eq(6).text()
                //                 })
                //             })
                //             // console.log(info);
                //         }
                //     })
                // },1000);
                    
            // }
            ///free/inha/3724/
            // $("#content .con-body #list table tbody tr").each((index, item) => {
            //     info.push({
            //         ip: $(item).find('td').eq(0).text(),
            //         port: $(item).find('td').eq(1).text(),
            //         degrees: $(item).find('td').eq(2).text(),
            //         type: $(item).find('td').eq(3).text(),
            //         position: $(item).find('td').eq(4).text(),
            //         speed: $(item).find('td').eq(5).text(),
            //         vverTime: $(item).find('td').eq(6).text()
            //     })
            // })
        })
    })
}
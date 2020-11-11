var cheerio = require('cheerio'); //服务器使用jq语法
var superagent = require('superagent'); //请求代理
const userAgents = require("../javascripts/User-Agent.js"); //浏览器头部信息
const userAgent = userAgents[parseInt(Math.random()*userAgents.length)];
const reptile1 = (baseUrl, tag) => {
    return new Promise((resolve, reject) => {
        superagent.get(baseUrl)
        .set({ 'User-Agent': userAgent })
        .timeout({ response: 5000, deadline: 60000 })
        .end((err, sres) => {
            if(err) {
                console.log(err);
            }
            var $ = cheerio.load(sres.text);
            // var data = {};
            let result = {
                novelInfo: []
            };
            $(tag).find('.item').each((index, item) => {
                var $element = $(item);
                const imgSrc = $element.find(".image img").attr("src");
                const novelName = $element.find("dl dt a").text();
                const urlId = $element.find("dl dt a").attr("href");
                const synopsis = $element.find("dl dd").text();
                result.novelInfo.push({
                    imgSrc,
                    novelName,
                    urlId,
                    synopsis,
                    collectionColorShow: false
                })
            })
            resolve(result);
        })
    })
}

const reptile2 = (baseUrl, tag) => {
    return new Promise((resolve, reject) => {
        superagent.get(baseUrl)
        .set({ 'User-Agent': userAgent })
        .timeout({ response: 5000, deadline: 60000 })
        .end((err, sres) => {
            if(err) {
                console.log(err);  
                return;
            }
            var $ = cheerio.load(sres.text);
            let data = [];
            $(tag).find('li').each((index, item) => {
                console.log(index);
                if(index > 1 && index < 8) {
                    var $element = $(item);
                    let classify = $element.find("a").text();
                    let href = $element.find("a").attr("href");
                    data.push({title:classify, href: href});
                }
            })
            resolve(data);
        })
    })
}

const reptile3 = (baseUrl, tag) => {
    return new Promise((resolve, reject) => {
        superagent.get(baseUrl)
        .set({ 'User-Agent': userAgent })
        .timeout({ response: 5000, deadline: 60000 })
        .end((err, sres) => {
            if(err) {
                return;
            }
            var $ = cheerio.load(sres.text);
            const imgSrc = $(tag).eq(0).find("#sidebar #fmimg img").attr("src");
            const title = $(tag).eq(0).find("#maininfo #info h1").text();
            const author = $(tag).eq(0).find("#maininfo #info p").text();
            const updateTime = $(tag).eq(0).find("#maininfo #info p").eq(2).text();
            const update = $(tag).eq(0).find("#maininfo #info p").eq(3).find("a").text();
            const updateUrl = $(tag).eq(0).find("#maininfo #info p").eq(3).find("a").attr("href");
            const synopsis = $(tag).eq(0).find("#maininfo #intro p").text();
            const chapters = [];
            $(tag).eq(1).find("#list dl dd").each((index, item) => {
                var $element = $(item);
                chapters.push({
                    chapter: $element.find("a").text(),
                    chapterUrl: $element.find("a").attr('href')
                })
            })
            const info = {
                imgSrc,
                title,
                author,
                updateTime,
                update,
                updateUrl,
                synopsis,
                chapters
            }
            resolve(info);
        })
    })
}

const reptile4 = (baseUrl, tag) => {
    return new Promise((resolve, reject) => {
        superagent.get(baseUrl)
        .set({ 'User-Agent': userAgent })
        .timeout({ response: 5000, deadline: 60000 })
        .end((err, sres) => {
            if(err) {
                return;
            }
            var $ = cheerio.load(sres.text);
            const title = $(tag + " .bookname h1").text();
            const preChapter = $(tag + " .bookname .bottem1 a").eq(1).attr("href");
            const nextChapter = $(tag + " .bookname .bottem1 a").eq(3).attr("href");
            const content = $(tag + " #content").html();
            const info = {
                title,
                preChapter,
                nextChapter,
                content
            }
            resolve(info);
        })
    })
}

const reptile5 = (baseUrl, tag) => {
    return new Promise((resolve, reject) => {
        superagent.get(baseUrl)
        .set({ 'User-Agent': userAgent })
        .timeout({ response: 5000, deadline: 60000 })
        .end((err, sres) => {
            if(err) {
                console.log(err);
            }
            var info = [];
            var $ = cheerio.load(sres.text);
            $(tag).each((index, item) => {
                var rankArr = [];
                $(item).find("ul").each((index2, item2) => {
                    var sorts = [];
                    var classTitle = '';
                    $(item2).find('li').each((index3, item3) => {
                        if(index3 === 0) {
                            classTitle = $(item3).text().slice(0, 3);
                        }else if(index3 === ($(item2).find('li').length - 1)) {

                        }else {
                            sorts.push({
                                novelId: index3 - 1,
                                novelTitle: $(item3).find("a").text(),
                                urlId: $(item3).find('a').attr('href')
                            })
                        }
                    })
                    rankArr.push({
                        sortId: index2,
                        classTitle,
                        sorts
                    })
                })
                info.push({
                    id: index,
                    title: $(item).find("h3").text(),
                    showItem: 1,
                    rankArr
                })
            })
            resolve(info);
        })
    })
}

module.exports = {
    reptile1,
    reptile2,
    reptile3,
    reptile4,
    reptile5
}
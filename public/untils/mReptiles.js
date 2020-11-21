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
            var $ = cheerio.load(sres.text);
            var info = [];
            $(tag).each((index, item) => {
                if(index !== 0) {
                    info.push({
                        imgUrl: $(item).find(".tjimg img").attr('src'),
                        title: $(item).find(".tjxs .xsm a").text(),
                        urlId: $(item).find(".tjxs .xsm a").attr('href'),
                        author: $(item).find('.tjxs span').eq(1).text(),
                        introduction: $(item).find('.tjxs span').eq(2).text()
                    })
                    
                }
            })
            resolve(info);
        })
    })
}

const reptile2 = (baseUrl, tag) => {
    return new Promise((resolve, reject) => {
        superagent.get(baseUrl)
        .set({ 'User-Agent': userAgent })
        .timeout({ response: 5000, deadline: 60000 })
        .end((err, sres) => {
            var $ = cheerio.load(sres.text);
            var info = {};
            info.imgUrl = $(tag).find('.block .block_img2 img').attr('src');
            info.text = $(tag).find('.block .block_txt2 h2 a').text();
            info.urlId = $(tag).find('.block .block_txt2 h2 a').attr('href');
            info.author = $(tag).find('.block .block_txt2 p').eq(2).text();
            info.state = $(tag).find('.block .block_txt2 p').eq(4).text();
            info.upDate = $(tag).find('.block .block_txt2 p').eq(5).text();
            info.newest = $(tag).find('.block .block_txt2 p').eq(6).text();
            info.newestUrl = $(tag).find('.block .block_txt2 p').eq(6).find('a').attr('href');
            info.startReadUrl = $(tag).find('.ablum_read .margin_right a').attr('href');
            info.introduction = $(tag).find('.intro_info').text();
            info.PreUrlId = $(tag).find('.listpage .left a').attr('href');
            info.PreUrlId = info.PreUrlId ? info.PreUrlId : '';
            info.NextUrlId = $(tag).find('.listpage .right a').attr('href');
            info.NextUrlId = info.NextUrlId ? info.NextUrlId : '';
            info.collectionShow = false;
            info.listpage = [];
            info.chapters = [];
            $(tag).find('.chapter').eq(1).find('li').each((index, item) => {
                info.chapters.push({
                    urlId: $(item).find('a').attr('href'),
                    title: $(item).find('a').text()
                })
            })
            $(tag).find('.listpage select option').each((index, item) => {
                info.listpage.push({
                    text: $(item).text(),
                    urlId: $(item).attr('value')
                }) 
            })
            resolve(info);
        })
    })
}

const reptile3 = (baseUrl, tag) => {
    console.log(baseUrl);
    return new Promise((resolve, reject) => {
        console.log(baseUrl);
        superagent.get(baseUrl)
        .set({ 'User-Agent': userAgent })
        .timeout({ response: 5000, deadline: 60000 })
        .end((err, sres) => {
            // console.log(sres);
            var $ = cheerio.load(sres.text);
            var info = {};
            info.prePageUrl = $(tag).find('.zj .nr_page a').eq(0).attr('href');
            info.prePageText = $(tag).find('.zj .nr_page a').eq(0).text();
            info.backCatalogUrl = $(tag).find('.zj .nr_page a').eq(1).attr('href');
            info.backCatalogText = $(tag).find('.zj .nr_page a').eq(1).text();
            info.nextPageUrl = $(tag).find('.zj .nr_page a').eq(2).attr('href');
            info.nextPageText = $(tag).find('.zj .nr_page a').eq(2).text();
            info.content = $(tag).find('.zj #nr').html();
            info.title = $(tag).find('#header .zhong').text();
            // console.log(info);
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
                console.log(err);
                return;
            }
            var $ = cheerio.load(sres.text);
            var info = [];
            $(tag).each((index, item) => {
                info.push({
                    text: $(item).find('a').text(),
                    urlId: $(item).find('a').attr('href')
                })
            })
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
                return;
            }
            var $ = cheerio.load(sres.text);
            var info = {};
            info.bookList = [];
            $(tag).each((index, item) => {
                if(index) {
                    info.bookList.push({
                        imgUrl: $(item).find('.tjimg a img').attr('src'),
                        title: $(item).find('.tjxs .xsm a').text(),
                        urlId: $(item).find('.tjxs .xsm a').attr('href'),
                        author: $(item).find('.tjxs span').eq(1).text(),
                        introduction: $(item).find('.tjxs span').eq(2).text()
                    })
                } else {
                    info.title = $(item).text();
                }
            })
            resolve(info);
        })
    })
}

const reptile6 = (name, tag) => {
    return new Promise((resolve, reject) => {
        superagent.post("http://m.biquge.info/modules/article/search.php")
        .set({'Content-Type':'application/x-www-form-urlencoded'})
        .send({q:name})
        .end((err, sres) => {
            if(err) {
                console.log(err);
                return;
            }
            var $ = cheerio.load(sres.text);
            // console.log(sres.text);
            var info = [];
            $(tag).each((index, item) => {
                info.push({
                    name: $(item).find('td table tr').eq(0).find('td a font').text(),
                    urlId: $(item).find('td table tr').eq(0).find('td a').attr('href'),
                    newUrlId: $(item).find('td table tr').eq(1).find('td a').attr('href'),
                    newChapter: $(item).find('td table tr').eq(1).find('td a').text()
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
    reptile5,
    reptile6
}
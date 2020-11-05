var cheerio = require('cheerio'); //服务器使用jq语法
var superagent = require('superagent'); //请求代理
const reptile1 = (baseUrl, tag) => {
    return new Promise((resolve, reject) => {
        superagent.get(baseUrl).end((err, sres) => {
            if(err) {
                console.log(err);
            }
            var $ = cheerio.load(sres.text);
            var data = {};
            let novelInfo = [];
            $(tag).each((index, item) => {
                var $element = $(item);
                if(index) {
                    let imgSrc = $element.find(".tjimg img").attr("src");
                    let novelName = $element.find(".tjxs>.xsm>a").text();
                    let urlId = $element.find(".tjxs>.xsm>a").attr("href").replace(/\//g, '');
                    let author = $element.find(".tjxs span").eq(1).text();
                    let synopsis = $element.find(".tjxs span").eq(2).text();
                    novelInfo.push({
                        imgSrc,
                        novelName,
                        urlId,
                        author,
                        synopsis,
                        collectionColorShow: false
                    })
                }else {
                    let title = $element.text();
                    data.title = title;
                }
            })
            data.novelInfo = novelInfo;
            resolve(data);
        })
    })
}

const reptile2 = (baseUrl, tag) => {
    return new Promise((resolve, reject) => {
        superagent.get(baseUrl).end((err, sres) => {
            if(err) {
              return;  
            }
            var $ = cheerio.load(sres.text);
            let data = [];
            $(tag).each((index, item) => {
                var $element = $(item);
                let classify = $element.find("a.r3").text();
                let href = $element.find("a.r3").attr("href");
                data.push({title:classify, href: href});
            })
            resolve(data);
        })
    })
}

const reptile3 = (baseUrl, tag) => {
    return new Promise((resolve, reject) => {
        superagent.get(baseUrl).end((err, sres) => {
            if(err) {
                return;
            }
            var $ = cheerio.load(sres.text);
            const imgSrc = $(".cover>.block").find(".block_img2>img").attr("src");
            const title = $(".cover>.block").find(".block_txt2>h2>a").text();
            const author = $(".cover>.block").find(".block_txt2>p").eq(2).text();
            const updateTime = $(".cover>.block").find(".block_txt2>p").eq(5).text();
            const update = $(".cover>.block").find(".block_txt2>p").eq(6).text();
            const synopsis = $(".cover>.intro_info").text().split("【展开】")[0];
            const chapters = [];
            $(".cover .chapter").eq(0).find("li").each((index, item) => {
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
                synopsis,
                chapters
            }
            resolve(info);
        })
    })
}

module.exports = {
    reptile1,
    reptile2,
    reptile3
}
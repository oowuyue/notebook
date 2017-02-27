let fs = require('fs');
let request = require("request");
let cheerio = require("cheerio");
let mkdirp = require('mkdirp');


let rootDir = "E:\\wamp\\www\\mylodop\\";

mkdirp(rootDir + "lectures\\", function(err) {
    if (err) console.error(err)
    else request("http://www.cs.cmu.edu/~adamchik/15-121/lectures/").pipe(fs.createWriteStream(rootDir + "lectures\\" + "index.html"));
});


let options = {
    method: 'GET',
    headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
        'Cookie': 'aQQ_guid=7D7B2406-75BA-B136-AC36-BCD418F7D75A; isp=true; Hm_lvt_7c3a8b33688e717fde23187a359d7bad=1434334977,1434616113,1435029972,1435109023; Hm_lvt_7c3a8b33688e717fde23187a359d7bad=1434086391,1434332615,1434334977; Tracker_slotid=1; Tracker_adid=1; Tracker_pvid=1; Tracker_uid=mz0yuhubl85yqcwqm5mqqfa265syr01xeaw6zjfn; sessid=B7601E2E-1C4E-1FC3-7AF9-7E6155F8AF77; authAdminInfo=5ThkzjLpeJaHZaBDDrnWHpnqsHZ5grOcoyAla4wozDc%3D',
        'Accept': '/',
        'Connection': 'keep-alive'
    }
};

let do_fetch = function(url) {
    options.url = url;
    request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {

            let $ = cheerio.load(body);
            $("pre a").filter(function(i, el) {
                return $(this).text() !== 'Parent Directory';
            }).each(function(i, elem) {

                let aLink = $(this);
                let aHref = aLink.attr("href");

                if (aHref.charAt(aHref.length - 1) === "\/") {

                    let newDir = rootDir + "\\" + decodeURI(url.split("15-121/")[1] + aHref);
                    console.log("目录:" + newDir);
                    mkdirp(newDir, function(err) {
                        if (err) console.error(err)
                        else {
                            request(url + aHref).pipe(fs.createWriteStream(newDir + "index.html"));
                            do_fetch(url + aHref);
                        }
                    });
                }

                if (aHref.indexOf(".") > 0) {

                    let newFile = rootDir + "\\" + decodeURI(url.split("15-121/")[1] + aHref);
                    console.log("文件:" + newFile);
                    request(url + aHref).pipe(fs.createWriteStream(newFile));
                    return;
                }

            });

        } else {
            console.log(error);
        }
    });
};

do_fetch("http://www.cs.cmu.edu/~adamchik/15-121/lectures/");


/*-----------方式一--------------------------------
var do_fetch = function(page){
    options.url = url + page;
    request(options, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            var $ = cheerio.load(body);
            $(".table-striped tbody tr td img").each(function() {
                var src = $(this).attr('src');
                var filename = src.split("/");
                filename = '' + page + "_page" + filename[4] + filename[5];
                request(src).pipe(fs.createWriteStream(dir + "/" + filename));
            });
        }else{
            console.log(error);
        }
    });
}

for (var page=1; page<=max_page; ++page){
    do_fetch(page);
}
*/

/*----------方式二--------------------------------
for (var page=1; page<=max_page; ++page){
    options.url = url + page;
    request(options, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            var $ = cheerio.load(body);
            $(".table-striped tbody tr td img").each(function() {
                var src = $(this).attr('src');
                var filename = src.split("/");
                filename = '' + page + "_page" + filename[4] + filename[5];
                request(src).pipe(fs.createWriteStream(dir + "/" + filename));
            });
        }else{
            console.log(error);
        }
    });
}
 

/*-----------方式三--------------------------------
var do_fetch = function(page){
    options.url = "http://admin.hepaidai.dev:5000/adv/imgList?p=" + page;
    request(options, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            var $ = cheerio.load(body);
            $(".table-striped tbody tr td img").each(function() {
                var src = $(this).attr('src');
                var filename = src.split("/");
                filename = '' + page + "_page" + filename[4] + filename[5];
                request(src).pipe(fs.createWriteStream(dir + "/" + filename));
            });
        }else{
            console.log(error);
        }
    });
    if(page>=max_page){
        return ;
    }else{
        do_fetch(page+1);
    }
};
do_fetch(1);
*/

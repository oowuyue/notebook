var fs = require('fs');
var request = require("request");
var cheerio = require("cheerio");
var mkdirp = require('mkdirp');

var dir = './images';
var max_page = 3;
var url =  'http://admin.hepaidai.dev:5000/adv/imgList?p=';
var options = {
    method: 'GET',
    headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
        'Cookie': 'aQQ_guid=7D7B2406-75BA-B136-AC36-BCD418F7D75A; isp=true; Hm_lvt_7c3a8b33688e717fde23187a359d7bad=1434334977,1434616113,1435029972,1435109023; Hm_lvt_7c3a8b33688e717fde23187a359d7bad=1434086391,1434332615,1434334977; Tracker_slotid=1; Tracker_adid=1; Tracker_pvid=1; Tracker_uid=mz0yuhubl85yqcwqm5mqqfa265syr01xeaw6zjfn; sessid=B7601E2E-1C4E-1FC3-7AF9-7E6155F8AF77; authAdminInfo=5ThkzjLpeJaHZaBDDrnWHpnqsHZ5grOcoyAla4wozDc%3D',
        'Accept': '/',
        'Connection': 'keep-alive'
    }
};


mkdirp(dir, function(err) {
    if(err){
        console.log(err);
    }
});


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
 */

/*-----------方式三---------------------------------*/
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

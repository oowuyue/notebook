var http = require("http");
var https = require("https");
var url = require('url');
var querystring = require('querystring');
var crypto = require("crypto");
var fs = require('fs');


var server = http.createServer(function (request, response) {
    console.log(request.url);
    var args = url.parse(request.url, true).query;
    if (Object.hasOwnProperty.call(args, "code")) {
        getToken(args.code, getApi, response);
    } else if (Object.hasOwnProperty.call(args, "github_login")) {
        var code_url = "https://github.com/login/oauth/authorize";
        var state = crypto.createHash('md5').update(Math.random().toString(), 'utf-8').digest('hex');
        var params = {
            'client_id': "662de532889de1c07b01",
            'redirect_uri': "http://127.0.0.1:80",
            'response_type': "code",
            'scope': '',
            'state': state
        };
        code_url = code_url + "?" + querystring.stringify(params);
        response.writeHead(302, {
            'Location': code_url
        });
        response.end();
    }
});

var getToken = function (code, callback, response) {
    var code = code;
    var token_url = "https://github.com/login/oauth/access_token";
    var postdata = querystring.stringify({
        'client_id': '662de532889de1c07b01',
        'client_secret': 'ccd047349fafb45eca1eddb095065d234eec2f05',
        'redirect_uri': 'http://127.0.0.1:80',
        'grant_type': 'authorization_code',
        'code': code
    });
    var options = url.parse(token_url);
    options.method = "POST";
    options.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Content-Length": postdata.length
    };
    console.log('where1');
    var post_req = https.request(options, function (res) {
        var body = "";
        res.on('data', function (data) {
            body += data;
        }).on('end', function () {
            var resp = url.parse("https://api.github.com/user?" + body, true);
            var token = resp.query.access_token;
            console.log("[getToken ok]");
            callback(token, logApi, response);

        });
    });
    post_req.write(postdata);
    post_req.end();
    console.log('where2');
};

var getApi = function (token, callback, response) {

    var api_url = "https://api.github.com/user?access_token=" + token;
    var options = url.parse(api_url);
    options.method = "GET";
    options.headers = {
        'User-Agent': 'ohmy-auth'
    };
    //console.log(options);
    var req = https.request(options, (res) => {
        var info = "";
        res.on('data', (d) => {
            info += d;
        }).on('end', function () {
            console.log("[getApi ok]");
            callback(info, notifyOk, response);

        });
    });
    req.on('error', (e) => {
        console.error(e);
    });
    req.end();
};

var logApi = function (info, callback, response) {
    fs.writeFile('api.txt', info.toString(), (err) => {
        if (err)
            throw err;
        console.log("[logApi ok]");
        callback(info, 'api.txt', response);

    });
};

var notifyOk = function (info, filepath, response) {
    var allokInfo = "all is ok ; log " + info + " in " + filepath;
    console.log("[notifyOk]" + allokInfo);

    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end("[notifyOk]" + allokInfo);
    //return;
    //return allokInfo;
};

server.listen(80);

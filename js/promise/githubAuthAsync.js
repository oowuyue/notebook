var http = require("http");
var https = require("https");
var url = require('url');
var querystring = require('querystring');
var crypto = require("crypto");
var fs = require('fs');

var server = http.createServer(function(request, response) {
    var args = url.parse(request.url, true).query;
    if (Object.hasOwnProperty.call(args, "code")) {
        (async function() {
            var token = await getToken(args.code);
            var api = await getApi(token);
            var lastData = await logApi(api);

            console.info("[notifyOk]" + lastData);
            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/plain');
            response.end("[notifyOk]" + lastData);
        })();
    } 
    else if (Object.hasOwnProperty.call(args, "github_login")) {
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
server.listen(80);

function getToken(code) {
    return new Promise(function(resolve, reject) {
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
        var post_req = https.request(options, function(res) {
            var body = "";
            res.on('data', function(data) {
                body += data;
            }).on('end', function() {
                var resp = url.parse("https://api.github.com/user?" + body, true);
                var token = resp.query.access_token;
                console.log("[getToken ok]");
                resolve(token);
            });
        });
        post_req.on('error', (e) => {
            console.error(e);
            reject(e);
        });
        post_req.write(postdata);
        post_req.end();
    })
}

function getApi(token) {
    return new Promise(function(resolve, reject) {
        var api_url = "https://api.github.com/user?access_token=" + token;
        var options = url.parse(api_url);
        options.method = "GET";
        options.headers = {
            'User-Agent': 'ohmy-auth'
        };
        var req = https.request(options, (res) => {
            var info = "";
            res.on('data', (d) => {
                info += d;
            }).on('end', function() {
                console.log("[getApi ok]");
                resolve(info);
            });
        });
        req.on('error', (e) => {
            console.error(e);
            reject(e);
        });
        req.end();
    });
}

function logApi(api) {
    return new Promise(function(resolve, reject) {
        fs.writeFile('async_api.txt', api.toString(), (err) => {
            if (err)
                reject(err);
            console.log("[logApi ok]");
            resolve(api + "@@@@  async_api.txt");
        });
    });
}

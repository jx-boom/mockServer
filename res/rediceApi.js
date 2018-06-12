var querystring = require('querystring');
var http = require('http');
var host =require('../host');

function rediceApi(res,reqdata,req,href){
    var body = '';
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader("Content-Type","text/plain;charset=UTF-8");

    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT,DELETE,POST,PATCH');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept,authorization,tenant,authorization');
    req.on('data', function (chunk) {
        body+=chunk;
    });
    req.on('end', function () {
        // 解析参数
        var  body1 = querystring.parse(body);  //将一个字符串反序列化为一个对象
        var content = querystring.stringify(body1);
        var content = body;
        if(req.method.toLowerCase()=='options'){
            res.writeHead(200,{"Content-Type":"text/plain;charset=UTF-8"});
            res.end();
        }
        else{
            var header =req.headers;
            var method=req.method;
            try{
                var request= {
                    hostname: host.hostname,
                    port: host.port,
                    path: href,
                    method: method,
                    headers: header
                };

                var req1 = http.request(request, function (res1) {
                    // res.writeHead(res1.statusCode,{"Content-Type":'UTF-8'});
                    var chunks = [], size = 0;
                    res1.on("data" , function(chunk){ chunks.push(chunk); size += chunk.length; });
                    res1.on("end" , function(){
                        var buffer = Buffer.concat(chunks, size);
                        res.end(buffer)
                    });
                });
                req1.on('error', function (e) {
                    console.log(e);

                    console.log('problem with request: ' + e.message);
                    res.end();
                });
                req1.write(content);
                req1.end()


            } catch (e) {
                console.log(e);
                console.log(' 大 额');
            }

        }
    });
    return
}
module.exports =rediceApi
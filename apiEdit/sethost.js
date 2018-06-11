var querystring = require("querystring");
var host =require('../host');
function sethost(req, res, ApiList) {
    var body = "";
    req.on("data", function(chunk) {
        body += chunk;
    });
    req.on("end", function() {
        // 解析参数
        body = querystring.parse(body); //将一个字符串反序列化为一个对象
      host.hostname=body.hostname;
      host.port=body.port;
        res.end(host);
    });
}
module.exports = sethost;

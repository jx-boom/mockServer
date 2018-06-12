var querystring = require("querystring");
var fs = require("fs");
var path = require("path");
function getContent(req, res, groupList) {
    var body = "";
    req.on("data", function(chunk) {
        body += chunk;
    });
    req.on("end", function() {
        // 解析参数
        body = querystring.parse(body); //将一个字符串反序列化为一个对象
        // 、、body.apiName + "_" + body.method+'/'
        groupList.getOne(body.groupKey,function(content) {
            res.end(content);
        });
    });
}
module.exports = getContent;

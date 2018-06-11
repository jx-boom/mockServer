var querystring = require("querystring");
var fs = require("fs");
var path = require("path");
function deleteApi(req, res, ApiList) {
  var body = "";
  req.on("data", function(chunk) {
    body += chunk;
  });
  req.on("end", function() {
    // 解析参数
    body = querystring.parse(body); //将一个字符串反序列化为一个对象
    // 、、body.apiName + "_" + body.method+'/'



    ApiList.deleteApi(body.apiName , function(apiList) {

      fs.writeFile(
        path.resolve(__dirname, "..") + "\\json\\api.json",
        JSON.stringify(apiList),
        { flag: "w", encoding: "utf-8", mode: "0666" },
        function(err) {
          if (err) {
            console.log(err);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end({ data: "删除失败" });
            console.log("写文件结束 删除失败");
          } else {
            var data = JSON.stringify({ list: apiList });
            console.log("写文件结束");
            res.end(data);
          }
        }
      );
    });
  });
}
module.exports = deleteApi;

var querystring = require("querystring");
var fs = require("fs");
var uploadAPI = require("./uploadAPI");
var path = require("path");
function editApi(req, res, ApiList, app) {
  console.log("editApi");
  var body = "";
  req.on("data", function(chunk) {
    body += chunk;

  });
  req.on("end", function() {
    // 解析参数

   body = JSON.parse(body);

    // body= JSON.parse(body);
    // body = querystring.parse(body); //将一个字符串反序列化为一个对象
    // body.content= JSON.parse( body.content);
    var ar = [];
    ar[0] = body;


    ApiList.add(ar, function(err, apiList) {
      if (!err) {
        fs.writeFile(
          path.resolve(__dirname, "..") + "\\json\\api.json",
          JSON.stringify(apiList),
          { flag: "w", encoding: "utf-8", mode: "0666" },
          function(err) {
            if (err) {
              res.writeHead(500, { "Content-Type": "text/plain" });
            } else {
              res.end(apiList);
              uploadAPI(apiList, app);
            }
          }
        );
      } else {
        res.writeHead(500, { "Content-Type": "text/plain" });
      }
    });
  });
}
module.exports = editApi;

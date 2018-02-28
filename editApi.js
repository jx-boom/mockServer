var querystring = require('querystring');
var fs = require("fs");
var uploadAPI =require('./uploadAPI');
function editApi(req,res,ApiList,app) {
    console.log('editApi');
    var body =''
    req.on('data', function (chunk) {
        body+=chunk;
    });
    req.on('end', function () {
        // 解析参数
        body = querystring.parse(body);  //将一个字符串反序列化为一个对象
        // body.content= JSON.parse( body.content);
        if(body['content[]']){
            body.content=body['content[]'];
        }
            ApiList.add([body],function (err,apiList) {
           if(!err){

               fs.writeFile(__dirname+'\\json\\api.json',JSON.stringify(apiList),{flag:'w',encoding:'utf-8',mode:'0666'},function(err){
                   if(err){
                       res.writeHead(500, {'Content-Type': 'text/plain'});
                   }else{
                       res.end(apiList);
                       uploadAPI(apiList,app)
                   }

               })










           }     else{



               res.writeHead(500, {'Content-Type': 'text/plain'});
           }

            })
    }
    );


};
module.exports= editApi;
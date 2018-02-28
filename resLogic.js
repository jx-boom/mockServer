var resContent= require('./resContent');
var querystring = require('querystring');

function reslogic(req, res,Api,agrJson) {
    var body ='';
    console.log('reslogic');
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
    });


    setTimeout(function () {

        try{

            var logic =Api['logic'];
            var content = Api['content'];
            var contentType = Api['contentType'];
            var search =agrJson;

            if(logic.length==0){
                // 如果没逻辑 返回内容
                resContent(content[0])
            }
            logic= '(function(){'+   logic+'})() ';
           ;
            var responseText=  eval(logic);

            resContent(req, res,Api,responseText,contentType)
        }
        catch(err){
            console.log(err);
            // res.writeHead(500,{"Content-Type":"text/plain;charset=UTF-8"});
            res.end();
        }
    },200)






};
module.exports=reslogic;
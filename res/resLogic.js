var resContent= require('./resContent');
var querystring = require('querystring');
var group = require('../module/group');
function reslogic(req, res,Api,agrJson) {
    var body ='';

    res.setHeader('Access-Control-Allow-Origin', '*');

    req.on('data', function (chunk) {
        body+=chunk;
    });
    req.on('end', function () {
        // 解析参数
        console.log('reslogicend');
        body = querystring.parse(body);  //将一个字符串反序列化为一个对象
        // body.content= JSON.parse( body.content);
        try{
            var logic =Api['logic'];
            var content = Api['content'];
            var contentType = Api['contentType'];
            var search =agrJson;
            var $group= group.group;
            console.log($group);
            console.log('this is group');
            if(logic.length==0){
                // 如果没逻辑 返回内容
              return  resContent(req, res,Api,content[0],contentType)
            }
            logic= '(function(){'+   logic+'})() ';
            var responseText=  eval(logic);
            resContent(req, res,Api,responseText,contentType)
        }
        catch(err){
            console.log(err);
            // res.writeHead(500,{"Content-Type":"text/plain;charset=UTF-8"});
            res.end();
        }
    });


    // setTimeout(function () {


    // },200)






};
module.exports=reslogic;
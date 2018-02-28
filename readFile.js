var fs = require("fs");
var apiList =require('./urlList')
function readFile(uploadApi,app) {
    console.log('readFile');
    fs.readFile(__dirname+'\\json\\api.json','utf8',function(err, files){
        if (err||files.length==0) {
        }else{
            console.log('加载初始文件');
            files= JSON.parse(files);
            var list =[];
            for( var api in files){
                list.push(
                    {
                        "href": files[api]['realName'],
                        "logic": files[api]['logic'],
                        "method": files[api]['method'],
                        "content": files[api]['content'],
                        "contentType": files[api]['contentType']
                    }

                )

              }
            apiList.add(list,function (err,list) {
                console.log('结束添加初始API');
                uploadApi(list,app)

            })
        }

    });
};
module.exports= readFile;


var fs = require("fs");
var path =require('path')
function getAllApi(req,res,apiList) {
   ;
    fs.readFile(path.resolve(__dirname, '..')+'\\json\\api.json','utf8',function(err, files){
        if (err) {
            console.log('储存文件目录不存在');
        res.end()
        }else{
            res.end(files)
        }

    });
};
module.exports =getAllApi;
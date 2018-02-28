
var fs = require("fs");

function getAllApi(req,res,apiList) {
    console.log(__dirname);
    console.log('__dirname');
    fs.readFile(__dirname+'\\json\\api.json','utf8',function(err, files){
        if (err) {
            console.log('储存文件目录不存在');
        res.end()
        }else{
            res.end(files)
        }

    });
};
module.exports =getAllApi;
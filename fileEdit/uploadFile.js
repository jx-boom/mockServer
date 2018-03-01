var formidable = require('formidable');
var addApi =require('../apiEdit/addApi');
var fs = require("fs");
fs.readdir(__dirname+"\\json",function(err, files){
    if (err||files.length==0) {
        console.log('储存文件目录不存在');
        fs.mkdir(__dirname+"\\json",function(err,files){
            console.log("目录创建成功。");
        });
    }

});



function uploadFile(req,res,app) {
    console.log('uploadFile 事件');
    var form = formidable.IncomingForm({
        encoding : 'utf-8',//上传编码
        uploadDir : "json",//上传目录，指的是服务器的路径，如果不存在将会报错。
        keepExtensions : true,//保留后缀
        maxFieldsSize : 2 * 1024 * 1024//byte//最大可上传大小
    });
    var allFile=[];
    form.on('progress', function(bytesReceived, bytesExpected) {//在控制台打印文件上传进度
        var progressInfo = {
            value: bytesReceived,
            total: bytesExpected
        };
        console.log('[progress]: ' + JSON.stringify(progressInfo));
    })
        .on('file', function (filed, file) {
            allFile.push([file]);//收集传过来的所有文件
        })
        .on('end', function() {
            console.log('上传成功！');
        })
        .on('error', function(err) {
            console.error('上传失败：', err.message);
            next(err);
        })
        .parse(req,function(err, fields, files){
            if(err){
                console.log(err);
            }
            console.log(allFile);
            console.log('this is all file');
            allFile.forEach(function(file,index){
                var fieldName=file[0].name;
                var types = file[0].name.split('.');
                var date = new Date();
                var ms = Date.parse(date);
               // var fileName =form.uploadDir+"/"+types[0]+"."+String(types[types.length-1]);
                // console.log('重命名文件');
                // fs.renameSync(file[1].path,fileName);//重命名文件，默认的文件名是带有一串编码的，我们要把它还原为它原先的名字。

                addApi(app,fieldName,res);
            });
        });

};
module.exports=uploadFile;


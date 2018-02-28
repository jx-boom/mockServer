
var ApiList = require('./urlList');
var uploadFile =require('./uploadFile');
var responseFileList= require('./responseFileList');
var editApi =require('./editApi');
var getAllApi =require('./getAllApi');
var deleteApi =require('./deleteApi');
var fs = require('fs');





function get_file_content(filepath) {
    return fs.readFileSync(filepath);
}
function response(app) {


    console.log('加载请求');


    app.get('/',function (req,res) {
        res.end(get_file_content(__dirname + '\\' + 'index.html'))
    });

   app.get('/jquery.js',function (req,res) {
         res.end(get_file_content(__dirname + '\\' + 'jquery.js'))
    });
   app.get('/socket.io.js',function (req,res) {
         res.end(get_file_content(__dirname + '\\' + 'socket.io.js'))
    });
   app.get('/check.png',function (req,res) {
         res.end(get_file_content(__dirname + '\\' + 'check.png'))
    });
   app.get('/gt.png',function (req,res) {
         res.end(get_file_content(__dirname + '\\' + 'gt.png'))
    });
    app.get('/pp.png',function (req,res) {
        res.end(get_file_content(__dirname + '\\' + 'pp.png'))
    });
    app.get('/Ip.js',function (req,res) {
        res.end(get_file_content(__dirname + '\\' + 'Ip.js'))
    });

    app.get('/swipper.css',function (req,res) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(get_file_content(__dirname + '\\' + 'swipper.css'))
    });app.get('/swipper.js',function (req,res) {
        res.end(get_file_content(__dirname + '\\' + 'swipper.js'))
    });
  app.post('/upFile',function (req,res) {
      console.log('上传文件请求');
      uploadFile(req,res,app);
  });
  app.get('/apiContent',function (req,res) {
     responseFileList(req,res,ApiList);
 });
    app.get('/apiList',function (req,res) {
     getAllApi(req,res,ApiList)
 });
    app.post('/deleteApi',function (req,res) {
        deleteApi(req,res,ApiList)
    });
  app.post('/editApi',function (req,res) {

      editApi(req,res,ApiList,app)
  });



};
module.exports = response;

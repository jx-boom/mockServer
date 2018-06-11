
var ApiList = require('./module/urlList');
var uploadFile =require('./fileEdit/uploadFile');
var responseFileList= require('./res/responseFileList');
var editApi =require('./apiEdit/editApi');
var getAllApi =require('./apiEdit/getAllApi');
var deleteApi =require('./apiEdit/deleteApi');
var sethost = require('./apiEdit/sethost')
var fs = require('fs');





function get_file_content(filepath) {
    return fs.readFileSync(filepath);
}
function response(app) {

    app.get('/',function (req,res) {
        res.end(get_file_content(__dirname + '\\' + 'index.html'))
    });

   app.get('/jquery.js',function (req,res) {
         res.end(get_file_content(__dirname + '\\dist\\jquery.js'))
    });
   app.get('/socket.io.js',function (req,res) {
         res.end(get_file_content(__dirname + '\\dist\\socket.io.js'))
    });
   app.get('/check.png',function (req,res) {
         res.end(get_file_content(__dirname + '\\dist\\check.png'))
    });
   app.get('/gt.png',function (req,res) {
         res.end(get_file_content(__dirname + '\\dist\\gt.png'))
    });
    app.get('/pp.png',function (req,res) {
        res.end(get_file_content(__dirname + '\\dist\\pp.png'))
    });
    app.get('/Ip.js',function (req,res) {
        res.end(get_file_content(__dirname + '\\' + 'Ip.js'))
    });

    app.get('/swipper.css',function (req,res) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(get_file_content(__dirname + '\\dist\\' + 'swipper.css'))
    });
    app.get('/swipper.js',function (req,res) {
        res.end(get_file_content(__dirname + '\\dist\\' + 'swipper.js'))
    });
  app.post('/upFile',function (req,res) {
      uploadFile(req,res,app);
  });
  app.get('/apiContent',function (req,res) {
     responseFileList(req,res,ApiList);
 });
    app.get('/apiList',function (req,res) {
     getAllApi(req,res,ApiList)
 });
    app.post('/deleteApi',function (req,res) {
        console.log('777');
        deleteApi(req,res,ApiList)
    });
  app.post('/editApi',function (req,res) {
      console.log('666');

      editApi(req,res,ApiList,app)
  });
  app.post('/setHost',function (req,res) {
      sethost(req,res,ApiList,app)
  });



};
module.exports = response;

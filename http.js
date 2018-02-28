var http =require('http');
var resApi =require('./response');
var route =require('./route');
var readFile =require('./readFile');
var uploadApi =require('./uploadApi');
var os = require('os');
var fs =require('fs');
var cp  = require('child_process');
var ioConnect = require('./io/connect');
function getIPAdress(){
    console.log('getIPAdress');
    var interfaces = os.networkInterfaces();
    for(var devName in interfaces){
        var iface = interfaces[devName];
        for(var i=0;i<iface.length;i++){
            var alias = iface[i];
            if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                return alias.address;
            }
        }
    }
}
// 引入路由模块
var app = route();
// 初始化
resApi(app);

var server = http.createServer(app);
ioConnect(server)

// 创建 服务
var ip= getIPAdress();


fs.writeFile(__dirname+'\\Ip.js','function getIp() { return "'
    +ip+
    '"}',{flag:'w',encoding:'utf-8',mode:'0666'},function(err){
    if(err){
        error= true;
    }else{
    }

});


server.listen(8080,getIPAdress(), function () {
    console.log('listen ' + server.address().address+':'+server.address().port);
    cp.exec('start chrome http://'+server.address().address+':'+server.address().port)

    console.log('✡✡✡✡✡✡✡✡✡✡✡✡✡');
    console.log('⊙❤❤❤❤❤❤❤❤❤❤❤⊙');
    console.log('❤ X J I N G  ❤');
    console.log('⊙❤❤❤❤❤❤❤❤❤❤❤⊙');
    console.log('✡✡✡✡✡✡✡✡✡✡✡✡✡');
});
readFile(uploadApi,app);

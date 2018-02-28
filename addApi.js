var ApiList = require('./urlList');
var fs =require('fs');
// var handleError =require('./handleError');
function getFileContent(app,fileName,res,fn) {
    console.log('getFileContent');
    fs.readFile(fileName, 'utf-8', function (err, data) {
        console.log('readFile');
        var error =false;
        if (err) {
           error= true;
            fn(error,'读取文件失败','',res)
        }
        else {
           try{
            var value =JSON.parse(data);

            ApiList.add(value, (isErr,apiList) => {
                 if(isErr){
                     fn(error,'添加错误','',res)
                 }
                 else{

                     fs.writeFile(__dirname+'\\json\\api.json',JSON.stringify(apiList),{flag:'w',encoding:'utf-8',mode:'0666'},function(err){
                         if(err){
                             error= true;
                             fn(error,'写文件失败')
                         }else{
                             fn(error,value,apiList,res)

                         }

                     })














                 }
             });
           } catch(err){
               console.log(err);
               res.writeHead(500, {  });
               res.end()

           }
        }
    });
};
function addApi(app,filename,res) {
    console.log('addApi');
    getFileContent(app,filename, res,addToList)
}
function addToList (error,value,list,res) {
    console.log('addToList');
    if(error){
        res.writeHead(500, {  });
        res.end({"data": value});
       return false
   }

    if(res){
        console.log('加载读取完毕');
        res.writeHead(200, {'Content-Type': 'text/plain'});
       var data =JSON.stringify({"list": list})
        res.end(data);
    }
};

module.exports=addApi;
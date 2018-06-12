var url = require('url');
var urlList =require('../module/urlList');
var rediceApi =require('../res/rediceApi');
var host =require('../host');
var packingRes = function (res) {

    var end = res.end;
    res.end = function (data, encoding, callback) {
        if (data && !(data instanceof Buffer) && (typeof data !== 'function')) {
            if (typeof data === 'object') {
                data = JSON.stringify(data);
            } else if (typeof data === 'number') {
                data = data.toString();
            }
        }

        end.call(res, data, encoding, callback);
    };
    res.send = function (data, type) {
        res.writeHead(200,
            {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'get,post,put,PATCH,patch,delete,GET,POST,PUT,DELETE',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept,authorization,tenant',
                'Content-Type': 'text/' + (type || 'plain') + '; charset=UTF-8'
            }
        );
        res.end(data);
    };



    return res;
};

/**
 * 路由规则
 */
console.log('加载路由');
var route = function () {
    var self = this;
    this._get = {};
    this._post = {};
    this._patch = {};
    this._delete = {};
    this._put = {};
    function addWith(string) {
        // 添加/
        if (!string.startsWith('/')) {
            string = '/' + string;
        }
        if (!string.endsWith('/')) {
            string = string + '/';
        }
        return string
    };
    function deleteWith(string) {
        if (string.startsWith('/')) {
            string = string.slice(1,string.length)
        }
        if (string.endsWith('/')) {
            string =string.slice(0,string.length-1)
        }
        return string
    }
  function mapapiList(url,method,apiList,query,fn) {
      var arr = Object.keys(apiList);
      var length= arr.length;
      var index=0;
      var has =false;
       var url1= deleteWith(url);
      for( var api in apiList){
          var  apiName=api.split('_')[0];
          index++;
         var apiName1 =deleteWith(apiName);
          apiName1= '^'+apiName1+'$';
          var req= new RegExp(apiName,"g");
          var req1= new RegExp(apiName1,"g");
          if (req1.test(url1)){
              // 遍历寻找目标API
              if(method===apiList[api]['method']){
              has = true;
              var arr= req.exec(url);
              if(arr==null){
                  arr= req.exec(url);
              }

              var agrJson ={};
                  for( var i=0,l=apiList[api]['search'].length;i<l;i++){
                  agrJson[apiList[api]['search'][i]]=arr[i+1];
              }
for(var key in query){
    agrJson[key]  = query[key];
}
              fn(false,apiList[api],api,agrJson);
                  return
             }
          }
             if((length==index)&&!has){
                 fn(true);

             }
      }
  }
   function findApi(url,method,query,res,fn) {
      // 寻找存在API
       var error =true;
       var apiList= urlList.list();
       if( Object.keys(apiList).length==0){
           error = true;
           fn(error)
       }


       mapapiList(url,method,apiList,query,function (error,api,apiName,agrJson) {
           if(error){

               fn(error,api,apiName,agrJson,res)
           }else{
               fn(error,api,apiName,agrJson);
           }
       })


  }
   var handle = function (req, res) {
        packingRes(res);
        var Url = url.parse(req.url, true);
       var href =Url.href;
       var pathname = Url.pathname;
            if (!pathname.endsWith('/')) {
            pathname = pathname + '/';
        }

            var query = Url.query;

       var alldata = '';
            req.on('data', function (chunk) {
                     alldata += chunk;
            });
       var method = req.method.toLowerCase();
        if (req.headers['access-control-request-method']) {
            method = req.headers['access-control-request-method'].toLowerCase();
        };
        var  reqdata= req;
        findApi(pathname,method,query, res,function (err, api, apiName, agrJson,reqdata) {
            if (err) {
                // 路由不存在
                if (self['_' + method][pathname]) {
                    res.query = query;
                    self['_' + method][pathname](req, res, agrJson);
                }
                else {
                    if(host.hostname!=host.realAddress&&host.realPort!=host.port){
                        rediceApi(res,reqdata,req,href)
                    }

                   else{
                        res.writeHead(404,{'Content-Type':'UTF-8'});
                        res.end()
                    }
                }
            }
            else {
                if (self['_' + method][apiName] !== undefined) {
                    self['_' + method][apiName](req, res, api, agrJson);
                }
            }
        });
    }
    handle.get = function (string, callback) {
        string=  addWith(string)
        self._get[string] = callback;
    };
    handle.put = function (string, callback) {
        string=  addWith(string)
        self._get[string] = callback;
    };
    handle.delete = function (string, callback) {
        string=  addWith(string)
        self._delete[string] = callback;
    };
    handle.post = function (string, callback) {
        string=  addWith(string)
        self._post[string] = callback;
    };
    handle.patch = function (string, callback) {
        string=  addWith(string)
        self._patch[string] = callback;
    };

    handle.put = function (string, callback) {
        string=  addWith(string)
        self._put[string] = callback;
    };

    return handle;
};

module.exports = function () {
    return new route();
};
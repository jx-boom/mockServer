var url = require('url');
var urlList =require('../module/urlList');
var packingRes = function (res) {
    console.log('packingRes');
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
    console.log('route');
    this._get = {};
    this._post = {};
    this._patch = {};
    this._delete = {};
    this._put = {};
    /**
     * 处理请求
     *
     * @param {*} req
     * @param {*} res
     */
    function addWith(string) {
        // 添加/
        console.log('addWith');
        if (!string.startsWith('/')) {
            string = '/' + string;
        }
        if (!string.endsWith('/')) {
            string = string + '/';
        }
        return string
    };

   function findApi(url,fn) {
      // 寻找存在API
       console.log('findApi');
       var error =false;
       var apiList= urlList.list();
       if( Object.keys(apiList).length==0){
           error = true;
           fn(error)
       }

      for( var api in apiList){
         var req= new RegExp(api,"g");
          if (req.test(url)){
          // 遍历寻找目标API

              var arr= req.exec(url);
             if(arr==null){
                 arr= req.exec(url);
             }

              var agrJson ={};
              for( var i=0,l=apiList[api]['search'].length;i<l;i++){
                  agrJson[apiList[api]['search'][i]]=arr[i+1];
              }

                 fn(error,apiList[api],api,agrJson)
             break
        }
      }
      error= true;
      fn(error)

  }

    var handle = function (req, res) {
        console.log('handle');
        packingRes(res);
        var Url = url.parse(req.url, true);
        var pathname = Url.pathname;
        if (!pathname.endsWith('/')) {
            pathname = pathname + '/';
        }

        var query = Url.query;
        var method = req.method.toLowerCase();
        if(req.headers['access-control-request-method']){
            method=req.headers['access-control-request-method'].toLowerCase();
        }
        console.log('方式' + method + '--' + '名字' + pathname);
        findApi(pathname, (err,api,apiName,agrJson) => {
            if(err) {
                // 路由不存在

                if(self['_' + method][pathname]){
                    res.query=   query;


                    self['_' + method][pathname](req, res,agrJson);
                }else{
                    console.log(pathname+'路由不存在');
                    res.writeHead(404, {'Content-Type': 'text/plain'});
                    res.end();
                    return
                }



            }
            else{


                res.setHeader('Access-Control-Allow-Origin', '*');

                if(self['_' + method][apiName]!==undefined){

                    self['_' + method][apiName](req, res, api,agrJson);


                }
            }


        });





    };

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
        self._get[string] = callback;
    };
    handle.post = function (string, callback) {
        string=  addWith(string)
        self._post[string] = callback;
    };
    handle.patch = function (string, callback) {
        string=  addWith(string)
        self._patch[string] = callback;
    };
    return handle;
};

module.exports = function () {
    return new route();
};
var reslogic =require('../res/resLogic');
var path =require('path');

function uploadApi(apiList,app) {
    console.log('uploadApi');
    for( var url in apiList){
        var api =apiList[url];
        console.log('生成API名字' + url);
        app[api['method']](url, function (req, res,api,agrJson) {

            reslogic(req, res, api,agrJson)


        });


    }
};
module.exports= uploadApi;
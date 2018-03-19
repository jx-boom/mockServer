function responseFileList(req, res, ApiList) {
  console.log("responseFileList");
  var apiName = res.query.api;
  ApiList.getOne(apiName, function(api) {
    console.log("ApiList.getOne");
    console.log(api);
    console.log(1111111111111111111111111111111111111111);
    console.log();
    res.send({ api });
    res.end();
  });
}
module.exports = responseFileList;

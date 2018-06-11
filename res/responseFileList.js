function responseFileList(req, res, ApiList) {
  console.log("responseFileList");
  var apiName = res.query.api;
  ApiList.getOne(apiName, function(api) {
    res.send({ api });
    res.end();
  });
}
module.exports = responseFileList;

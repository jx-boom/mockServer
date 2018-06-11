class Rectangle {
  constructor() {
    this.apiList = {};
  }
  list() {
    return this.apiList;
  }
  add(apiList, fn) {

    var isErr = false;
    function addWith(string) {
      var name = string;
      if (!name.startsWith("/")) {
        name = "/" + name;
      }
      if (!name.endsWith("/")) {
        name = name + "/";
      }
      return name;
    }
    function replace(url) {
      // 正则匹配替换
      var reg = /\{(.*?)\}/g;
      var agrList = [];
      var x;

      while ((x = reg.exec(url))) {
        agrList.push(x[1]);
      }
      var regv = "(\\S+)";
      var reg = url.replace(reg, regv);
      return { apiName: reg, arg: agrList };
    }
    for (var i = 0, l = apiList.length; i < l; i++) {
      if (apiList[i].href !== "") {
        var apiName = addWith(apiList[i]["href"]);
        var value = replace(apiName);

        apiName = value.apiName + "_" + apiList[i].method + "/";
        if (!this.apiList[apiName]) {
          this.apiList[apiName] = {};
        }

        this.apiList[apiName]["realName"] = apiList[i]["href"];
        this.apiList[apiName]["search"] = value.arg;
        this.apiList[apiName]["logic"] = apiList[i].logic;
        this.apiList[apiName]["method"] = apiList[i].method;
        this.apiList[apiName]["content"] = apiList[i].content;
        this.apiList[apiName]["contentType"] = apiList[i].contentType;
        if (i == l - 1) {
          fn(isErr, this.apiList, "");
        }
      }
    }

    // }
  }
  getOne(api, fn) {

    if (this.apiList[api]) {
      fn(this.apiList[api]);
    } else {
      fn([]);
    }
  }
  deleteApi(apiName, fn) {

    if (this.apiList[apiName]) {
      delete this.apiList[apiName];
    }
    fn(this.apiList);
  }
  getApi(apiName) {
    console.log("getApi list");
    return this.apiList[apiName] ? this.apiList[apiName] : false;
  }
}
var Rectangles = new Rectangle();
module.exports = Rectangles;

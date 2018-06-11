function getArguments(value,fn) {
    var reg = /\{(.*?)\}/g,
        arr = [],
        x = null;
    while ((x = reg.exec(value)) != null) {
        arr.push(x[1])
    };
    fn(arr)
}
module.exports= getArguments;

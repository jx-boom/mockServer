function resContent(req, res,Api,responseText,contentType) {
    console.log('resContent');
    // res.writeHead(200,{"Content-Type":contentType});
    res.send(responseText);
    res.end();
};
module.exports= resContent;
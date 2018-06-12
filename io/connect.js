var  socket= require('socket.io');
var io ;


function connect(server) {
   io=  socket(server);

    io.on('connection', function(socket){

        socket.on('changeList', function(obj){
            //向所有客户端广播发布的消息
            io.emit('changeList', obj);
        });
    });
};
module.exports = connect;

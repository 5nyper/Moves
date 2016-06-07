var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
  console.log("User connected");
  socket.on('spot', function(data) {
    console.log("got spot, sending mark");
    socket.emit('mark', data);
    socket.broadcast.emit('mark', data);
  });
  socket.on('turn', function(data) {
    console.log("turning off");
    socket.emit('off', data);
    socket.broadcast.emit('off', data);
  });
  socket.on('disconnect', function () {
    console.log("User disconnected");
  });
});

server.listen(3000);

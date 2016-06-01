var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var moment = require('moment');

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
  console.log("User connected");
  socket.on('spot', function(data) {
    console.log("got spot, sending mark");
    socket.emit('mark', data);
    socket.broadcast.emit('mark', data);
    var interv = setInterval(function() {
      console.log(parseInt(moment().format('hmmss')) - data.time);
      if (parseInt(moment().format('hmmss')) - data.time > 120) {
        socket.emit('delete');
        socket.broadcast.emit('delete');
        clearInterval(interv);
      }
    }, 3000);
  });
  socket.on('disconnect', function () {
    console.log("User disconnected");
  });
});

server.listen(3000);

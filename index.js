var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('*', function(req, res){
res.sendFile(__dirname + '/page.html');
});

io.sockets.on('connection', function(socket) {
  socket.on('event', function(room) {
    console.log("New user connected to room " + room);
    socket.join(room);
  });
  socket.on('log', function(msg, room){
	console.log("emit to room " + room)
	socket.to(room).emit('log', msg, socket.id);
});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

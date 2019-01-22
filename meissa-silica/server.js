const port = process.env.PORT || 8888;
const express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);

app.use(express.static(__dirname + "/dist"));

app.get('/', function (req, res) {
    console.log("serving the", __dirname + '/dist/index.html');
    res.sendFile(__dirname + '/dist/index.html');
});

app.get("/send", function (req, res) {
    console.log("req", req.query);
    io.emit("chat message", req.query["text"]);
    res.send("Ok");
});

io.on('connection', function (socket) {
    console.log("user connected");
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
        console.log("server", msg);
    });
});

http.listen(port, function () {
    console.log('listening on *:' + port);
});

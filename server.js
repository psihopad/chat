const express = require("express");
const app = express();

app.use(express.static("public"));

app.get('/', function(request, respons) {
	respons.sendFile(__dirname + '/index.html');
});
server = app.listen("3000", () => console.log("Server is running..."));

const io = require("socket.io")(server);

io.on('connection', (socket) => {
	console.log('New user connected')

	socket.username = "Anonymous"

    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    socket.on('new_message', (data) => {
        io.sockets.emit('add_mess', {message : data.message, username : socket.username, className:data.className});
    })

    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})
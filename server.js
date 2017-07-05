var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'));

var server = require('http').Server(app);

var io = require('socket.io')(server);

// server listen on port 3000 or default port on env
server.listen(3000, function() {
	console.log('listening on port 3000');
})

//set up route for app
app.get('/', function (req, res) {
	res.render('index');
});

var userArr = [];
io.on('connection', function (socket) {
	console.log('New user connected: ' + socket.id);

	//server is listenning to events
	socket.on('user-send-registration', function (data){
		// registration fail - name (data) is already registered
		if(userArr.indexOf(data) >=0){
			socket.emit("server-send-registration-fail");
		} else {
			//registration success 
			userArr.push(data);
			socket.username = data;
			socket.emit("server-send-registration-success", data);

			//update online users list
			io.sockets.emit("server-update-userlist", userArr);

		}
	});

	// server handles logout request
	socket.on('user-send-logout-request', function (data){
		console.log("Current User: " + data);
		var userIndex = userArr.indexOf(data);
		console.log("Index of user: " + userIndex);
		userArr.splice(userIndex, 1);

		// server send logout success to that particular user
		socket.emit('server-send-logout-success');

		// server update online user list
		io.sockets.emit("server-update-userlist", userArr);
	});

	// server handle received message
	socket.on('user-send-message', function (data) {
		// server send message to everyone's chat output
		//console.log("Message: " + data.user + ": " + data.message);
		io.sockets.emit('server-send-message-to-all-users', data);
		
	});

	// notify other users that the current user is typing
	socket.on('user-is-typing', function (data){
		socket.broadcast.emit('server-send-typing-user', data);
	});

	socket.on('user-stop-typing', function (data) {
		console.log('stop-typing');
		socket.broadcast.emit('server-send-stop-typing', data);
	});
});
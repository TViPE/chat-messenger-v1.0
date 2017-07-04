var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.public('public'));

var server = require('http').Server(app);

var io = require('socket.io')(server);

// server listen on port 3000 or default port on env
server.listen(process.env.PORT ||  3000, function() {
	console.log('listening on port 3000');
})

//set up route for app
app.get('/', function (req, res) {
	res.render('index');
});

io.on('connection', function (socket){
	console.log('New user connected: ' + socket.id);

	//server is listenning to events
})
var socket = io.connect('https://tv-messenger.herokuapp.com');
//var socket = io.connect('http://localhost:3000');

socket.on('server-send-registration-fail', function(){
	window.alert("This name is already registerd. Please choose different name!");
});

socket.on('server-send-registration-success', function (data){
	$('#loginWindow').hide(2000);
	$('#chatWindow').show(1000);
	$('#currentUser').html(data);

});

socket.on('server-update-userlist', function (data){
	$('#onlineUsers').html("");
	data.forEach(function (user){
		$('#onlineUsers').append('<p class="onlineuser">' + user + '</p>')
	});
});

socket.on('server-send-logout-success', function(){
	$('#chatWindow').hide(2000);
	$('#loginWindow').show(1000);
});

socket.on('server-send-message-to-all-users', function (data){
	$('#messageTxt').val("");
	$('#chatOutputTxt').append('<p><strong>' + data.user + ':</strong> ' + data.message + '</p>');
	console.log('hhhh');
});

socket.on('server-send-typing-user', function (data){
	$('#feedback').html('<p><i>' + data + ' is typing</i></p>')
});

socket.on('server-send-stop-typing', function (data){
	$('#feedback').html('');
});

	
$(document).ready(function(){
	//window.alert('hello');
	$('#loginWindow').show();
	$('#chatWindow').hide();

	// registration
	$('#registerBtn').click(function(){
		socket.emit('user-send-registration', $('#usernameTxt').val());
	});

	// logout
	$('#logoutBtn').click(function() {
		socket.emit('user-send-logout-request', $('#currentUser').html());
	});

	// send message
	$('#messageBtn').click(function() {
		var messageObj = {
			user: $('#currentUser').html(),
			message: $('#messageTxt').val()
		}
		socket.emit('user-send-message', messageObj);
	});

	$('#messageTxt').focusin(function(){
		socket.emit('user-is-typing', $('#currentUser').html());
	});

	$('#messageTxt').focusout(function(){
		socket.emit('user-stop-typing', $('#currentUser').html());
	});
});
var socket = io.connect('http://localhost:3000');

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
	
$(document).ready(function(){
	//window.alert('hello');
	$('#loginWindow').show();
	$('#chatWindow').hide();

	$('#registerBtn').click(function(){
		socket.emit('user-send-registration', $('#usernameTxt').val());
	});

	//logout
	$('#logoutBtn').click(function() {
		socket.emit('user-send-logout-request', $('#currentUser').html());
	});
});
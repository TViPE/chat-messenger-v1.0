# chat-messenger-v1.0
A chat messenger application is built with socket.io, nodejs, expressjs, and bootstrap

## Project Overview
This project is a fullstack web application that applies the websocket communitcation between clients and server. Everytime the clients emit a new event, that event will be transfered and handled by the server. Depending on what kind of that event is, the server will either emit back the handle function to only the emitting socket client or broadcast the handle function to all other clients.

The application contains two layouts: login-window & chat-window
- **Login-window**: is the first layout when the client connect to http://localhost:3000. In this layout. The client will enter a name to register. If that name is already existed, a window will alert the client to pick a different name.

![alt text](https://github.com/TViPE/chat-messenger-v1.0/blob/master/public/img/login_screen.png)

- **Chat-window**: If the registration is passed, that client will be logged into chat-window. The leftside of the chat-window displays all the clients are currently connected to the server. The rightside of the chat-window contains the chat-output display, a welcome message to the client, message input, send message button, and logout button.

![alt text](https://github.com/TViPE/chat-messenger-v1.0/blob/master/public/img/chat_window_screen_01%20.png)


## Project Detail
### Server
The dependencies (modules) for the server: 
  + expressjs
  + ejs
  + socket.io
  + http

The server is setup to listen on port 3000. If the app is loaded on cloud (ex: heroku, etc.) the port should be modifed to **process.env.PORT**.

Below is the order of events that the server will listen to and have different handle functions that send back to either that client or broadcast to other clients.

1. Server waits for connection from client and create a socket to manage the connection between that client and server 
2. The client emits an event: 'user-send-registration'
  + If the registration is fail, server will emit: **"server-send-registraion-fail"**
  + If the registration succeeded:
    - server emit a event to the client just registered: **"server-send-registration-success"**
    - server update the online clients list, and notify to **all clients**: **"server-update-userlist"**.
3.The client emits an event to logout: **"user-send-logout-request"**.
  + Server will remove that client out of the array and send a notification to that client: **"server-send-logout-success"**.
  + when a client logged out, server will update the current online clients list: **"server-update-userlist"**.
4. The client type and send message: "user-send-message".
  + Server will listen to that message and send the message to chat window output of all clients: **"server-send-message-to-all-users"** with the message value.
5. When a client is typing message (using **focusin()**), a client will emit an event **"user-is-typing"** and with the message value
  + Server will broadcast that message to all other clients: **"server-send-typing-user"** and the message value
6. When a client focusout of the message input field (using **focusout()**), a client will emit an event **"user-stop-typing"**
  + + Server will broadcast that message to all other clients: **"server-send-stop-typing"**



## Reference
1. SOCKET.IO - https://socket.io/docs/

 




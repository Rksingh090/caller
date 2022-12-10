const express = require("express")
const cors = require("cors")

const app = express()
const http = require("http").Server(app);
const io = require('socket.io')(http);


app.use(cors(
    {
        origin: "http://localhost:3000/",
        credentials: true
    }
))

app.get('/', function(req, res) {
    res.send('hello');
 });
 
 //Whenever someone connects this gets executed
 io.on('connection', function(socket) {
    console.log('A user connected');
 
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
       console.log('A user disconnected');
    });
 });


 io.on("recievemessage", ({foruser, from, message}) => {
    console.log("recieved message", foruser, from);
    io.to("1").emit(message);
})

http.listen(3000, function() {
    console.log('listening on *:3000');
});
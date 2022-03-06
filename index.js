const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server);
app.use(express.static('public'));

io.on('connection',socket =>{
    socket.on('username',username =>{
        socket.username = username;
        io.emit('is_online', '✔️<i>' + socket.username + ' joined the chat..</i>');
    });

    socket.on('chat_message', message => {
        if(message !== "")
        io.emit('append', '<strong>' + socket.username + '</strong>: ' + message);
    });

    socket.on('disconnect', username => {
        
            io.emit('is_offline', '😥<i>' + socket.username + ' left the chat..</i>');
    });
} )     

const port = process.env.PORT || 8080;
server.listen(port,() => console.log(`running on port ${port}`));

app.get('/', (req,res) =>{
    res.render("index.ejs");
})


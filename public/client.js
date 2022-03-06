
const socket = io.connect('https://chatting-app-by-aman.herokuapp.com/');
// const socket = io.connect('http://localhost:8080');
const messages = document.querySelector('#messages')

// ask username
const username = prompt('Please tell me your name') || "anonymous";
// const password=prompt("password");


//socket.emit('password',password); 
socket.emit('username', username);


// submit text message without reload/refresh the page
    $('form').submit(e => {
        e.preventDefault(); // prevents page reloading
        socket.emit('chat_message', $('#txt').val());
        $('#txt').val('');
        
    });

    socket.on('append', msg =>{
        let li = $('<li>');
        li.html(msg);
            if(msg!=="")
        $('#messages').append(li);

            messages.scrollTop=messages.scrollHeight;
    });

// append text if someone is online
    socket.on('is_online', username => {
           
            $('#messages').append($('<li>').html(username));
            messages.scrollTop=messages.scrollHeight;
      
    });

    socket.on('is_offline', username => {
             
            $('#messages').append($('<li>').html(username));
            messages.scrollTop=messages.scrollHeight;
     
    });



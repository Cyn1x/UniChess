const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

app.use(express.static(path.join(__dirname, '../build')));

app.get('/', (req: any, res: any) => res.sendFile(__dirname + '/index.html'));

io.on('connect', (socket: any) => {
    io.emit('broadcast', '[Server]: A user has connected');
    
    socket.on('message', (msg: any) => {
        io.emit('message', msg);
    });
    
    socket.on('disconnect', function () {
        io.emit('broadcast', '[Server]: A user has disconnected');
    });
});

const port = process.env.PORT || 8080;
app.set('port', port);

http.listen(port, () => {
    console.log("[Server]: Listening on port %d", port); 
});

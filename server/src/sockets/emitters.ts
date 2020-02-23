import { Socket, Server } from 'socket.io';

const socketEmitter = (socket: Socket, io: Server) => {
    socket.on('message', (msg: any) => {
        io.emit('message', msg);
    });

    socket.on('room', (room: any) => {
        io.emit('room', room);
    })

    socket.on('join', (room: any) => {
        io.emit('join', room);
    })

    socket.on('game', (game: any) => {
        io.emit('game', game);
    })
    
    socket.on('disconnect', function () {
        console.log("A user has disconnected.")
        io.emit('broadcast', '[Server]: A user has disconnected');
    });
}

export default socketEmitter;

import { Socket, Server } from 'socket.io';

import socketEmitter from './sockets/emitters';

const initialiseIO = (io: Server) => {
    io.on('connect', (socket: Socket) => {
        console.log("A user has connected.")
        io.emit('broadcast', '[Server]: A user has connected');
        
        socketEmitter(socket, io);
    });
}

export default initialiseIO;

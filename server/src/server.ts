import express, {
    Application, Router, Request, Response, NextFunction
} from 'express';
import http from 'http';
import cors from 'cors';
import socketio, { Socket } from 'socket.io';
import { Server } from 'net';
import mongoose from 'mongoose';
import socketEmitter from './socket';
import bodyParser from 'body-parser';
import path from 'path';
const port = process.env.PORT || 8080;

const app: Application = express();
const router: Router = express.Router();
const server: Server = new http.Server(app);
const io: any = socketio(server);

const corsOptions = { origin: '*' };

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

router.use(express.static(path.join(__dirname, '../../client/build')));
router.get('/', (req: Request, res: any) => res.sendFile(__dirname, '../../client/build'))

server.listen(port, () => {
    console.log("[Server]: Listening on port %d", port); 
});

io.on('connect', (socket: Socket) => {
    console.log("A user has connected.")
    io.emit('broadcast', '[Server]: A user has connected');
    
    socketEmitter(socket, io);
});

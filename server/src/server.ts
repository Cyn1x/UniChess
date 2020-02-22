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
import dotenv from 'dotenv';

import authRoute from './routes/auth/auth';

const port = process.env.PORT || 8080;

const app: Application = express();
const router: Router = express.Router();
const server: Server = new http.Server(app);
const io: any = socketio(server);

const corsOptions = { origin: '*' };

dotenv.config();

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);
app.use('/api/user', authRoute);

router.use(express.static(path.join(__dirname, '../../client/build')));
router.get('/', (req: Request, res: Response) => res.sendFile(__dirname, '../../client/build'))

server.listen(port, () => {
    console.log("[Server]: Listening on port %d", port); 
});

io.on('connect', (socket: Socket) => {
    console.log("A user has connected.")
    io.emit('broadcast', '[Server]: A user has connected');
    
    socketEmitter(socket, io);
});

const DB_URI = `${process.env.DB_URL}://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_NAME}/${process.env.DB_PARAMS}`;

mongoose.connect(
    DB_URI,
    { useNewUrlParser: true,
    useUnifiedTopology: true }, 
    () => console.log('[Server]: Connected to database')
);

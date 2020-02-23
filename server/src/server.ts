import express, {
    Application, Router, Request, Response
} from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'net';
import socketio from 'socket.io';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';

import initialiseIO from './socket';
import initialiseDB from './database';
import initialiseAPI from './api';

const port = process.env.PORT || 8080;

const app: Application = express();
const router: Router = express.Router();
const server: Server = new http.Server(app);
const io: socketio.Server = socketio(server);

const corsOptions = { origin: '*' };

dotenv.config();

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

router.use(express.static(path.join(__dirname, '../../client/build')));
router.get('/', (req: Request, res: Response) => res.sendFile(__dirname, '../../client/build'));

initialiseIO(io);
initialiseDB();
initialiseAPI(app);

server.listen(port, () => {
    console.log("[Server]: Listening on port %d", port); 
});

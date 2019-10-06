import express, {
    Application, Router, Request, Response, NextFunction
} from 'express';
import http from 'http';
import cors from 'cors';
import SocketIO from "socket.io";

const port = process.env.PORT || 8080;

const app: Application = express();
const router: Router = express.Router();
const server: any = new http.Server(app);
const io: any = SocketIO(server);

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Server is running')
})

app.use(cors);
app.use(router);

server.listen(port, () => {
    console.log("[Server]: Listening on port %d", port); 
});

io.on('connect', (socket: any) => {
    console.log("A user has connected.")
    io.emit('broadcast', '[Server]: A user has connected');
    
    socket.on('message', (msg: any) => {
        io.emit('message', msg);
    });

    socket.on('room', (room: any) => {
        io.emit('room', room);
    })

    socket.on('game', (game: any) => {
        io.emit('game', game);
    })
    
    socket.on('disconnect', function () {
        console.log("A user has disconnected.")
        io.emit('broadcast', '[Server]: A user has disconnected');
    });
});

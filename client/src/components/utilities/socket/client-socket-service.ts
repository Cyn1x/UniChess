import * as io from 'socket.io-client';
import { ChatMessage } from '../store/chat/types';
import { RoomInfo, GameState } from '../store/game/types';

const EVENTS = {
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
    MESSAGE: 'message',
    ROOM: 'room',
    GAME: 'game',
};

export default class Socket {
    public user: string;
    public port: string;
    private onChange: (isConnected: boolean) => void;
    private onMessage: (message: { from: string, content: string, time: string }) => void;
    private onRoom: (room: RoomInfo) => void;
    private onGame: (game: GameState) => void;
    private socket: any;
    
    constructor(
        onChange: (isConnected: boolean) => void,
        onMessage: (message: { from: string, content: string, time: string }) => void,
        onRoom: (room: RoomInfo) => void,
        onGame: (game: GameState) => void
        )
    {
        this.onChange = onChange;
        this.onMessage = onMessage;
        this.onRoom = onRoom;
        this.onGame = onGame;
        this.socket = '';
        this.user = '';
        this.port = '';
    }
    
    public connect = (user: string, port: string) => {
        this.user = user;
        this.port = port;
        
        const host = `http://localhost:${port}`;
        this.socket = io.connect(host);
        // this.socket = io.connect();

        this.socket.on(EVENTS.CONNECT, this.onConnected);
    };
    
    public onConnected = () => {
        this.socket.on(EVENTS.MESSAGE, this.onMessage);
        this.socket.on(EVENTS.ROOM, this.onRoom);
        this.socket.on(EVENTS.GAME, this.onGame);
        this.onChange(true);
    };
    
    public sendMessage = (message: ChatMessage) => {
        if (typeof this.socket.emit === 'function') {
            this.socket.emit(EVENTS.MESSAGE, message)
            return;
        }
        this.error();
    };

    public createRoom = (room: string) => {
        if (typeof this.socket.emit === 'function') {
            this.socket.emit(EVENTS.ROOM, room)
            return;
        }
        this.error();
    };

    public joinRoom = (room: string) => {
        if (typeof this.socket.emit === 'function') {
            
            return;
        }
        this.error();
    }

    public gameState = (game: GameState) => {
        if (typeof this.socket.emit === 'function') {
            this.socket.emit(EVENTS.GAME, game);
            return;
        }
        this.error();
    }

    public disconnect = () => this.socket.close();

    error() {
        console.error('Cannot emit socket messages. Socket.io not connected.');
    }
}

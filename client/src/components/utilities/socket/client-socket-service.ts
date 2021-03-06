import io from 'socket.io-client';

import { ChatMessage } from '../store/chat/types';
import { RoomInfo } from '../store/lobby/types';
import { GameState } from '../store/game/types';

const EVENTS = {
    CONNECT: "connect",
    DISCONNECT: "disconnect",
    MESSAGE: "message",
    ROOM: "room",
    GAME: "game"
};

export default class Socket {
    public user: string;
    public port: string;
    private onChange: (isConnected: boolean) => void;
    private onSendMessage: (message: { from: string, content: string, time: string }) => void;
    private onSendRoom: (room: RoomInfo) => void;
    private onSendGame: (game: GameState) => void;
    private socket: any;
    
    constructor(
        onChange: (isConnected: boolean) => void,
        onSendMessage: (message: { from: string, content: string, time: string }) => void,
        onSendRoom: (room: RoomInfo) => void,
        onSendGame: (game: GameState) => void
        )
    {
        this.onChange = onChange;
        this.onSendMessage = onSendMessage;
        this.onSendRoom = onSendRoom;
        this.onSendGame = onSendGame;
        this.socket = "";
        this.user = "";
        this.port = "";
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
        this.socket.on(EVENTS.MESSAGE, this.onSendMessage);
        this.socket.on(EVENTS.ROOM, this.onSendRoom);
        this.socket.on(EVENTS.GAME, this.onSendGame);
        this.onChange(true);
    };
    
    public sendMessage = (message: ChatMessage) => {
        if (typeof this.socket.emit === "function") {
            this.socket.emit(EVENTS.MESSAGE, message)
            return;
        }
        this.error();
    };

    public sendRoom = (room: string) => {
        if (typeof this.socket.emit === "function") {
            this.socket.emit(EVENTS.ROOM, room)
            return;
        }
        this.error();
    };

    public gameState = (game: GameState) => {
        if (typeof this.socket.emit === "function") {
            this.socket.emit(EVENTS.GAME, game);
            return;
        }
        this.error();
    }

    public disconnect = () => this.socket.close();

    error() {
        console.error("Cannot emit socket messages. Socket.io not connected.");
    }
}

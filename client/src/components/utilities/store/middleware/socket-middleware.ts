import Socket from "../../socket/client-socket-service";
import { CONNECT_SOCKET } from "../socket/types";
import { ChatMessage, SEND_MESSAGE_REQUEST } from "../chat/types";
import { SEND_ROOM_REQUEST, RoomInfo } from "../lobby/types";
import { GameState, SEND_GAME_REQUEST } from "../game/types";
import { connectionChanged } from "../socket/actions";
import { messageReceived, messageSent } from "../chat/actions";
import { roomReceived, roomSent } from "../lobby/actions";
import { gameReceived, gameSent } from "../game/actions";

export const SocketMiddleware = (store: any) => {
    
    const onConnectionChange = (isConnected: boolean) => {
        store.dispatch(connectionChanged(isConnected));
    };
    const onIncomingMessage = (message: ChatMessage) => store.dispatch(messageReceived(message));
    const onIncomingRoom = (room: RoomInfo) => store.dispatch(roomReceived(room));
    const onIncomingGame = (game: GameState) => store.dispatch(gameReceived(game));

    const socket = new Socket(onConnectionChange, onIncomingMessage, onIncomingRoom, onIncomingGame);

    return (next: any) => (action: any) => {
        const messageState = store.getState().messageState;
        const socketState = store.getState().socketState;
        
        switch (action.type) {
            case CONNECT_SOCKET:
                socket.connect(messageState.user, process.env.PORT || socketState.port);
                break;
                
            case SEND_MESSAGE_REQUEST:
                socket.sendMessage(action.message);
                store.dispatch(messageSent());
                break;

            case SEND_ROOM_REQUEST:
                socket.sendRoom(action.room);
                store.dispatch(roomSent());
                break;

            case SEND_GAME_REQUEST:
                socket.gameState(action.game);
                store.dispatch(gameSent());
                break;

            default:
                break;
        }
        
        return next(action)
    };
};

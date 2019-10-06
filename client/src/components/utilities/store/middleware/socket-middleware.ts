import Socket from "../../socket/client-socket-service";
import { CONNECT_SOCKET, CREATE_ROOM, JOIN_ROOM, SEND_GAME } from "../socket/types";
import { ChatMessage, SEND_MESSAGE_REQUEST } from "../chat/types";
import { connectionChanged } from "../socket/actions";
import { messageReceived, messageSent } from "../chat/actions";
import { roomReceived, roomSent, gameReceived, gameSent } from "../game/actions";
import { RoomInfo, GameState } from "../game/types";

// TODO: Implement type definitions
export const SocketMiddleware = (store: any) => {
    
    const onConnectionChange = (isConnected: boolean) => {
        store.dispatch(connectionChanged(isConnected));
    };
    const onIncomingMessage = (message: ChatMessage) => store.dispatch(messageReceived(message));
    const onRoom = (room: RoomInfo) => store.dispatch(roomReceived(room));
    const onGame = (game: GameState) => store.dispatch(gameReceived(game));

    const socket = new Socket(onConnectionChange, onIncomingMessage, onRoom, onGame);

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

            case CREATE_ROOM:
                socket.createRoom(action.room);
                store.dispatch(roomSent());
                break;

            case JOIN_ROOM:
                // TODO: join rooms
                break;

            case SEND_GAME:
                socket.gameState(action.game);
                store.dispatch(gameSent());
                break;

            default:
                break;
        }
        
        return next(action)
    };
};

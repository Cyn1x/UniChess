import Socket from "../../socket/client-socket-service";
import { ChatMessage, SEND_MESSAGE_REQUEST } from "../chat/types";
import { CONNECT_SOCKET, connectionChanged } from "../socket/actions";
import { messageReceived, messageSent } from "../chat/actions";

// TODO: Implement type definitions
export const SocketMiddleware = (store: any) => {
    
    const onConnectionChange = (isConnected: boolean) => {
        store.dispatch(connectionChanged(isConnected));
    };

    const onIncomingMessage = (message: ChatMessage) => store.dispatch(messageReceived(message));

    const socket = new Socket(onConnectionChange, onIncomingMessage);

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

            default:
                break;
        }
        
        return next(action)
    };
};

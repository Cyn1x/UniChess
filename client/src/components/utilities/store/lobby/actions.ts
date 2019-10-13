import {
    SEND_ROOM_REQUEST,
    SEND_ROOM_RESPONSE,
    ROOM_RECIEVED,
    RoomInfo,
} from './types';

export const sendRoom = (room: RoomInfo) => {
    return {
        type: SEND_ROOM_REQUEST,
        room
    };
}

export const roomReceived = (room: RoomInfo) => {
    return {
        type: SEND_ROOM_RESPONSE,
        room
    };
};

export const roomSent = () => {
    return {
        type: ROOM_RECIEVED
    };
};

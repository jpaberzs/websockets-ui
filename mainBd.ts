import { User } from './src/types/user';
import { Room } from './src/types/room';

const rooms: Room[] = [];

export const createRoomBD = (roomId: string, user: User): Room => {
  const newRoom: Room = {
    roomId,
    roomUsers: [user],
  };

  rooms.push(newRoom);
  return newRoom;
};

export const getRooms = (): Room[] => rooms;

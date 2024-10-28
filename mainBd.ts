import { User } from './src/types/user';
import { Room } from './src/types/room';
import { getUsers } from './src/userBd';

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

export const getRoomByID = (roomId: string): Room | undefined => {
  return rooms.find((r) => r.roomId === roomId);
};

export const addUserToRoomBD = (roomId: string, randomUserIndex: string): Room | undefined => {
  const users = getUsers();

  const room = rooms.find((r) => r.roomId === roomId);
  const user = users.find((u) => u.index === randomUserIndex);

  if (room && user) {
    room.roomUsers.push(user);
    return room;
  }
};

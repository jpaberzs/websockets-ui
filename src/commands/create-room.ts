import { User } from '../types/user';
import { getUserById } from '../userBd';
import { createRoomBD } from './../../mainBd';

export const createRoom = (randomUserIndex: string, roomId: string) => {
  console.log('Create room trigered');

  const user: User | undefined = getUserById(randomUserIndex);

  if (!user) return console.log('User not found');

  createRoomBD(roomId, user);

  return;
};

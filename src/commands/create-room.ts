import { User } from '../types/user';
import { getUserById } from '../userBd';
import { createRoomBD } from './../../mainBd';
import { randomUUID } from 'node:crypto';

export const createRoom = (randomUserIndex: string) => {
  console.log('Create room trigered');

  const roomId = randomUUID();

  const user: User | undefined = getUserById(randomUserIndex);

  if (!user) return console.log('User not found');

  createRoomBD(roomId, user);

  return;
};

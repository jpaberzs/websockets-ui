import WebSocket, { WebSocketServer } from 'ws';
import { randomUUID } from 'node:crypto';
import { WsMessage } from './types/wsMessage';
import { reg, updateRoom } from './commands';
import { createRoom } from './commands/create-room';
import { addUserToRoomBD, getRoomByID } from '../mainBd';
import { createGame } from './commands/createGame';
import { Room } from './types/room';
import { User } from './types/user';
import { getUsers } from './userBd';

const wss = new WebSocketServer({ port: 3000 }, () => {
  console.log('WebSocket server started on localhost:3000');
});

export default wss.on('connection', (ws: WebSocket) => {
  const randomUserIndex = randomUUID();
  const roomId = randomUUID();
  const gameId = randomUUID();

  console.log('New client connected');

  ws.on('message', (message: string) => {
    const jsonString = Buffer.from(message).toString('utf-8');
    const parsedData: WsMessage = JSON.parse(jsonString);

    switch (parsedData.type) {
      case 'reg':
        reg(ws, parsedData.data, randomUserIndex);
        updateRoom(wss);
        break;
      case 'create_room':
        createRoom(randomUserIndex, roomId);
        updateRoom(wss);
        break;
      case 'add_user_to_room':
        console.log('Add user to room');

        const content: { indexRoom: string } = JSON.parse(parsedData.data);

        const room = addUserToRoomBD(content.indexRoom, randomUserIndex);
        updateRoom(wss);

        // const room: Room | undefined = getRoomByID(roomId);
        const users: User[] = getUsers();

        // users.forEach((user) => {
        //   room?.roomUsers.forEach((roomUser) => {
        //     if (user.index === roomUser.index) {
        //       console.log(roomUser.name);

        //     }
        //   });
        // });
        createGame(wss, gameId, randomUserIndex);
        // updateRoom(wss);
        break;
      default:
        console.log(`Unknown message type: ${parsedData.type}`);
        break;
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.on('error', (error: Error) => {
    console.error('WebSocket error:', error);
  });
});

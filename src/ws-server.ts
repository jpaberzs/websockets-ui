import WebSocket, { WebSocketServer } from 'ws';
import { randomUUID } from 'node:crypto';
import { WsMessage } from './types/wsMessage';
import { reg, updateRoom } from './commands';
import { createRoom } from './commands/create-room';

const wss = new WebSocketServer({ port: 3000 }, () => {
  console.log('WebSocket server started on localhost:3000');
});

export default wss.on('connection', (ws: WebSocket) => {
  const randomUserIndex = randomUUID();

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
        createRoom(randomUserIndex);
        updateRoom(wss);
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

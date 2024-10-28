import { WebSocket, WebSocketServer } from 'ws';
import { getRooms } from '../../mainBd';

export const updateRoom = (ws: WebSocketServer) => {
  console.log('Update room trigered');

  const allRooms = getRooms();

  const msg = JSON.stringify({
    type: 'update_room',
    data: JSON.stringify(allRooms),
    id: 0,
  });

  const server = ws;

  server.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });

  return;
};

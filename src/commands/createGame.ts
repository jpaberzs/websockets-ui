import { WebSocketServer } from 'ws';

export const createGame = (ws: WebSocketServer, idGame: string, idPlayer: string) => {
  console.log('Create Game Trigered');

  const msg = JSON.stringify({
    type: 'create_game',
    data: JSON.stringify({
      idGame,
      idPlayer,
    }),
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

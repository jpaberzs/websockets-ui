import { WebSocket } from 'ws';
import { createUser, getUsers } from '../userBd';
import { User } from '../types/user';

export const reg = (ws: WebSocket, data: string, randomUserIndex: string) => {
  console.log('Trigered registration');

  const content: User = JSON.parse(data);
  const users = getUsers();

  if (users.find((u) => u.name === content.name)) {
    ws.send(
      JSON.stringify({
        type: 'reg',
        data: JSON.stringify({
          index: 0,
          name: '',
          error: true,
          errorText: 'User already exists',
        }),
        id: 0,
      }),
    );
    return;
  }

  const newUser = createUser({ ...content, index: randomUserIndex, error: false });

  console.log(newUser);

  ws.send(
    JSON.stringify({
      type: 'reg',
      data: JSON.stringify({
        index: randomUserIndex,
        name: content.name,
        error: false,
        errorText: '',
      }),
      id: 0,
    }),
  );
};

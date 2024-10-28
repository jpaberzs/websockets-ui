import { User } from './types/user';

const users: User[] = [];

export const createUser = (props: { index: string; name: string; error: boolean }): User => {
  const { index, name } = props;
  const newUser = { index, name };

  users.push(newUser);
  return newUser;
};

export const getUsers = (): User[] => users;

export const getUserById = (id: string): User | undefined => users.find((u) => u.index === id);

import { User } from './types/user';

const users: User[] = [];

export const createUser = (props: { index: string; name: string; error: boolean }): User => {
  const { index, name, error } = props;
  const newUser = { index, name, error };

  users.push(newUser);
  return newUser;
};

export const getUsers = (): User[] => users;

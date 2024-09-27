import { User } from '../types/userTypes';

export const getLocalUser = (users: User[]): User | undefined => {
  return users.find((user) => user.isLocalUser === true);
};

export const getUserDataByUsername = (userName: string, users: User[]) => {
  return users.find((user) => user.username === userName);
};

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  isLocalUser?: boolean;
}

export interface UsersContextState {
  users: User[];
}

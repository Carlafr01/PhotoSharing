import { User } from '../types/userTypes';

interface UsersState {
  users: User[];
}

type UsersAction = { type: 'SET_USERS'; payload: User[] };

const initialUsersState: UsersState = {
  users: [],
};

export const usersReducer = (
  state: UsersState = initialUsersState,
  action: UsersAction
): UsersState => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

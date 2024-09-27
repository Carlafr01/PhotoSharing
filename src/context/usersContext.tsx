import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { usersReducer } from '../reducers/usersReducer';
import { fetchUsers } from '../utils/api';
import { User, UsersContextState } from '../types/userTypes';

const UsersContext = createContext<{
  state: UsersContextState;
  dispatch: React.Dispatch<any>;
}>({
  state: { users: [] },
  dispatch: () => null,
});

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(usersReducer, { users: [] });

  useEffect(() => {
    const loadUsers = async () => {
      const users = await fetchUsers();

      //Create "your" user (local user)
      const myUser: User = {
        id: users.length + 1,
        name: 'Carla Freitas',
        username: 'CFreitas',
        email: 'carla.freitas@example.com',
        isLocalUser: true,
      };

      const updatedUsers = [...users, myUser];
      dispatch({ type: 'SET_USERS', payload: updatedUsers });
    };

    loadUsers();
  }, []);

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);

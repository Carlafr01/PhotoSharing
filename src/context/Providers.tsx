import React, { ReactNode } from 'react';
import { PhotosProvider } from './photosContext';
import { UsersProvider } from './usersContext';
import { AlbumsProvider } from './albumsContext';

interface ProviderProps {
  children: ReactNode;
}

const Providers: React.FC<ProviderProps> = ({ children }) => {
  return (
    <PhotosProvider>
      <UsersProvider>
        <AlbumsProvider>{children}</AlbumsProvider>
      </UsersProvider>
    </PhotosProvider>
  );
};

export default Providers;

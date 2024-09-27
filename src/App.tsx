import Header from './shared/components/header/Header';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './shared/routes/routes';
import { PhotosProvider } from './context/photosContext';
import { UsersProvider } from './context/usersContext';
import { AlbumsProvider } from './context/albumsContext';

function App() {
  return (
    <PhotosProvider>
      <UsersProvider>
        <AlbumsProvider>
          <BrowserRouter>
            <Header text="PhotoShare" />
            <AppRoutes />
          </BrowserRouter>
        </AlbumsProvider>
      </UsersProvider>
    </PhotosProvider>
  );
}

export default App;

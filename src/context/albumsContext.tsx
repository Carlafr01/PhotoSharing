import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { albumsReducer } from '../reducers/albumsReducer';
import { fetchAlbums } from '../utils/api';
import { Album, AlbumsContextState } from '../types/albumTypes';
import { Photo } from '../types/photoTypes';

const AlbumsContext = createContext<{
  state: AlbumsContextState;
  dispatch: React.Dispatch<any>;
  loadAlbums: () => Promise<void>;
  setAlbumPhotos: (albumId: number, photos: Photo[]) => Promise<void>;
  addAlbum: (newAlbum: Album) => void;
  updateAlbum: (updatedAlbum: Album) => void;
  deleteAlbum: (id: number) => void;
}>({
  state: { albums: [], albumPhotos: [] },
  dispatch: () => null,
  loadAlbums: async () => {},
  setAlbumPhotos: async () => {},
  addAlbum: () => {},
  updateAlbum: () => {},
  deleteAlbum: () => {},
});

export const AlbumsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(albumsReducer, {
    albums: [],
    albumPhotos: [],
  });

  useEffect(() => {
    loadAlbums();
  }, []);

  const loadAlbums = async () => {
    const albums = await fetchAlbums();
    dispatch({ type: 'SET_ALBUMS', payload: albums });
  };

  const setAlbumPhotos = async (albumId: number, photos: Photo[]) => {
    dispatch({ type: 'SET_ALBUM_PHOTOS', payload: { id: albumId, photos } });
  };

  const addAlbum = (newAlbum: Album) => {
    const currentIds = state.albums.map((album) => album.id);
    const newId = currentIds.length > 0 ? Math.max(...currentIds) + 1 : 1;
    const albumWithId = { ...newAlbum, id: newId };

    dispatch({ type: 'ADD_ALBUM', payload: albumWithId });
  };

  const updateAlbum = (updatedAlbum: Album) => {
    dispatch({ type: 'UPDATE_ALBUM', payload: updatedAlbum });
  };

  const deleteAlbum = (id: number) => {
    dispatch({ type: 'DELETE_ALBUM', payload: id });
  };

  return (
    <AlbumsContext.Provider
      value={{
        state,
        dispatch,
        loadAlbums,
        setAlbumPhotos,
        addAlbum,
        updateAlbum,
        deleteAlbum,
      }}
    >
      {children}
    </AlbumsContext.Provider>
  );
};

export const useAlbums = () => useContext(AlbumsContext);

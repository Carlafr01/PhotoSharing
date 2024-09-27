import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { photosReducer } from '../reducers/photosReducer';
import { fetchPhotos } from '../utils/api';
import { Photo, PhotosContextState } from '../types/photoTypes';

const PhotosContext = createContext<{
  state: PhotosContextState;
  dispatch: React.Dispatch<any>;
  loadPhotos: (pageIndex: number, pageSize: number) => Promise<void>;
  addPhoto: (newPhoto: Photo) => void;
  updatePhoto: (updatedPhoto: Photo) => void;
  deletePhoto: (id: number) => void;
}>({
  state: { photos: [] },
  dispatch: () => null,
  loadPhotos: async () => {},
  addPhoto: () => {},
  updatePhoto: () => {},
  deletePhoto: () => {},
});

export const PhotosProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(photosReducer, { photos: [] });

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    const photos = await fetchPhotos();
    dispatch({ type: 'SET_PHOTOS', payload: photos });
  };

  const addPhoto = (newPhoto: Photo) => {
    const currentIds = state.photos.map((photo) => photo.id);
    const newId = currentIds.length > 0 ? Math.max(...currentIds) + 1 : 1;

    const photoWithId = { ...newPhoto, id: newId };
    dispatch({ type: 'ADD_PHOTO', payload: photoWithId });
  };

  const updatePhoto = (updatedPhoto: Photo) => {
    dispatch({ type: 'UPDATE_PHOTO', payload: updatedPhoto });
  };

  const deletePhoto = (id: number) => {
    dispatch({ type: 'DELETE_PHOTO', payload: id });
  };

  return (
    <PhotosContext.Provider
      value={{
        state,
        dispatch,
        loadPhotos,
        addPhoto,
        updatePhoto,
        deletePhoto,
      }}
    >
      {children}
    </PhotosContext.Provider>
  );
};

export const usePhotos = () => useContext(PhotosContext);

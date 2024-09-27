import { Album, Photo } from '../types/types';

interface AlbumsState {
  albums: Album[];
  albumPhotos: {
    id: number;
    photos: Photo[];
  }[];
}

type AlbumsAction =
  | { type: 'SET_ALBUMS'; payload: Album[] }
  | { type: 'SET_ALBUM_PHOTOS'; payload: { id: number; photos: Photo[] } }
  | { type: 'ADD_ALBUM'; payload: Album }
  | { type: 'UPDATE_ALBUM'; payload: Album }
  | { type: 'DELETE_ALBUM'; payload: number };

const initialAlbumsState: AlbumsState = {
  albums: [],
  albumPhotos: [],
};

export const albumsReducer = (
  state: AlbumsState = initialAlbumsState,
  action: AlbumsAction
): AlbumsState => {
  switch (action.type) {
    case 'SET_ALBUMS':
      return { ...state, albums: action.payload };
    case 'SET_ALBUM_PHOTOS': {
      const { id, photos } = action.payload;

      const existingAlbum = state.albumPhotos.find((album) => album.id === id);

      if (existingAlbum) {
        return {
          ...state,
          albumPhotos: state.albumPhotos.map((album) =>
            album.id === id ? { ...album, photos } : album
          ),
        };
      } else {
        return {
          ...state,
          albumPhotos: [...state.albumPhotos, { id, photos }],
        };
      }
    }
    case 'ADD_ALBUM':
      return { ...state, albums: [...state.albums, action.payload] };
    case 'UPDATE_ALBUM':
      return {
        ...state,
        albums: state.albums.map((album) =>
          album.id === action.payload.id ? action.payload : album
        ),
      };
    case 'DELETE_ALBUM':
      return {
        ...state,
        albums: state.albums.filter((album) => album.id !== action.payload),
      };
    default:
      return state;
  }
};

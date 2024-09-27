import { Photo } from '../types/photoTypes';

interface PhotosState {
  photos: Photo[];
}

type PhotosAction =
  | { type: 'SET_PHOTOS'; payload: Photo[] }
  | { type: 'ADD_PHOTO'; payload: Photo }
  | { type: 'UPDATE_PHOTO'; payload: Photo }
  | { type: 'DELETE_PHOTO'; payload: number };

const initialPhotosState: PhotosState = {
  photos: [],
};

export const photosReducer = (
  state: PhotosState = initialPhotosState,
  action: PhotosAction
): PhotosState => {
  switch (action.type) {
    case 'SET_PHOTOS':
      return { ...state, photos: action.payload };
    case 'ADD_PHOTO':
      return { ...state, photos: [action.payload, ...state.photos] };
    case 'UPDATE_PHOTO':
      return {
        ...state,
        photos: state.photos.map((photo) =>
          photo.id === action.payload.id ? action.payload : photo
        ),
      };
    case 'DELETE_PHOTO':
      return {
        ...state,
        photos: state.photos.filter((photo) => photo.id !== action.payload),
      };
    default:
      return state;
  }
};

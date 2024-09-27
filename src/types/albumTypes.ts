import { Photo } from './photoTypes';

export interface Album {
  userId: number;
  id: number;
  title: string;
  userName?: string;
}

export interface AlbumPhoto {
  id: number;
  photos: Photo[];
}

export interface AlbumsContextState {
  albums: Album[];
  albumPhotos: AlbumPhoto[];
}

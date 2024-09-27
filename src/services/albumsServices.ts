import { Album, AlbumPhoto } from '../types/albumTypes';
import { Photo } from '../types/photoTypes';
import { User } from '../types/userTypes';

export const updateAlbumWithUserName = (albums: Album[], users: User[]) => {
  return albums.map((album) => {
    const user = album ? users.find((user) => user.id === album.userId) : null;
    const updatedPhoto: Album = {
      ...album,
      userName: user ? user.username : 'Unknown',
    };

    return updatedPhoto;
  });
};

export const getAllAlbumsFromUserId = (userId: number, albums: Album[]) => {
  return albums.filter((album) => album.userId === userId);
};

export const sortAlbumsByPhotoCount = (
  albumPhotos: AlbumPhoto[],
  albums: Album[]
): Album[] => {
  const sortedAlbumIds = [...albumPhotos]
    .sort((a, b) => {
      return b.photos.length - a.photos.length;
    })
    .map((albumPhoto) => albumPhoto.id);

  return sortedAlbumIds
    .map((id) => albums.find((album) => album.id === id))
    .filter(Boolean) as Album[];
};

export const getAlbumById = (
  albumId: string,
  albums: Album[]
): Album | null => {
  return albums.find((e) => e.id === parseInt(albumId)) ?? null;
};

export const getAlbumOwner = (
  selectedAlbum: Album | null,
  users: User[]
): User | undefined => {
  return selectedAlbum
    ? users.find((e) => e.id === selectedAlbum.userId)
    : undefined;
};

export const getAlbumPhotos = (
  albumId: string,
  albumPhotos: AlbumPhoto[]
): Photo[] => {
  const selectedPhotos = albumPhotos.find((e) => e.id === parseInt(albumId));
  return selectedPhotos ? selectedPhotos.photos : [];
};

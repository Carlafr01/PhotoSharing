import { Album } from '../types/albumTypes';
import { Photo } from '../types/photoTypes';
import { User } from '../types/userTypes';

export const getAllPhotosFromAlbum = (albumId: number, photos: Photo[]) => {
  return photos.filter((photo) => photo.albumId === albumId);
};

export const updatePhotosWithUser = (
  photos: Photo[],
  albums: Album[],
  users: User[]
) => {
  return photos.map((photo) => {
    const album = albums.find((album) => album.id === photo.albumId);
    const user = album ? users.find((user) => user.id === album.userId) : null;
    const updatedPhoto: Photo = {
      ...photo,
      userId: album ? album.userId : undefined,
      userName: user ? user.username : 'Unknown',
    };

    return updatedPhoto;
  });
};

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Card from '../../../shared/components/card/Card';
import Modal from '../../../shared/components/modal/Modal';
import Input from '../../../shared/components/input/Input';

import { useAlbums } from '../../../context/albumsContext';
import { useUsers } from '../../../context/usersContext';
import { usePhotos } from '../../../context/photosContext';

import { getLocalUser } from '../../../services/usersServices';
import {
  getAlbumById,
  getAlbumOwner,
  getAlbumPhotos,
} from '../../../services/albumsServices';

import { Album } from '../../../types/albumTypes';
import { Photo } from '../../../types/photoTypes';
import { User } from '../../../types/userTypes';

import './AlbumDetails.scss';

const AlbumDetails: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const { state: albums } = useAlbums();
  const { state: photos, updatePhoto, deletePhoto } = usePhotos();
  const { state: users } = useUsers();
  const localUser = getLocalUser(users.users);

  const [selectedAlbumData, setSelectedAlbumData] = useState<Album | null>(
    null
  );
  const [selectedAlbumPhotos, setSelectedAlbumPhotos] = useState<Photo[]>([]);
  const [albumOwner, setAlbumOwner] = useState<User>();
  const [newPhotoTitle, setNewPhotoTitle] = useState<string>('');
  const [modalData, setModalData] = useState<{ isOpen: boolean; id?: number }>({
    isOpen: false,
    id: 0,
  });

  const isLocalUserPage = albumOwner?.username === localUser?.username;

  useEffect(() => {
    if (albumId) {
      const selectedAlbum = getAlbumById(albumId, albums.albums);
      const selectedOwner = getAlbumOwner(selectedAlbum, users.users);
      const selectedPhotos = getAlbumPhotos(albumId, albums.albumPhotos);
      setSelectedAlbumData(selectedAlbum ?? null);
      setAlbumOwner(selectedOwner);
      setSelectedAlbumPhotos(selectedPhotos ?? []);
    }
  }, [albumId, albums.albums, albums.albumPhotos, users.users]);

  const handleUpdatePhoto = () => {
    if (localUser && modalData.id && selectedAlbumData) {
      const updatedPhoto: Photo = {
        id: modalData.id,
        userId: localUser.id,
        title: newPhotoTitle,
        albumId: selectedAlbumData.id,
        url:
          selectedAlbumPhotos.find((photo) => photo.id === modalData.id)?.url ??
          '',
        thumbnailUrl:
          selectedAlbumPhotos.find((photo) => photo.id === modalData.id)
            ?.thumbnailUrl ?? '',
      };

      updatePhoto(updatedPhoto);
      setSelectedAlbumPhotos((prevPhotos) =>
        prevPhotos.map((photo) =>
          photo.id === modalData.id ? { ...photo, title: newPhotoTitle } : photo
        )
      );
      setModalData({ isOpen: false, id: undefined });
      setNewPhotoTitle('');
    }
  };

  const handleDeletePhoto = (photoId: number) => {
    deletePhoto(photoId);
    setSelectedAlbumPhotos((prevPhotos) =>
      prevPhotos.filter((photo) => photo.id !== photoId)
    );
  };

  return (
    <div className="album-photos">
      <p>
        {albumOwner?.username}'s Album: {selectedAlbumData?.title}.
      </p>
      <div className="photos-grid">
        {selectedAlbumPhotos.map((photo) => (
          <Card
            key={photo.id}
            id={photo.id}
            title={photo.title}
            interactive={isLocalUserPage}
            onEdit={() => setModalData({ isOpen: true, id: photo.id })}
            onDelete={handleDeletePhoto}
          >
            <img
              className="image-photo"
              src={photo.url}
              alt={`A view of ${photo.title}`}
            />
          </Card>
        ))}
        {modalData.isOpen && (
          <Modal
            title={'Edit Photo Title'}
            isOpen={modalData.isOpen}
            onConfirm={handleUpdatePhoto}
            onClose={() => setModalData({ isOpen: false })}
          >
            <div className="modal-edit-content">
              <Input
                type="text"
                value={newPhotoTitle}
                onChange={(e) => setNewPhotoTitle(e.target.value)}
              />
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AlbumDetails;

import React, { useEffect, useState } from 'react';
import { useAlbums } from '../../../context/albumsContext';
import Button from '../../../shared/components/button/Button';
import './MyAlbums.scss';
import { useUsers } from '../../../context/usersContext';
import {
  getAllAlbumsFromUserId,
  sortAlbumsByPhotoCount,
} from '../../../services/albumsServices';
import { usePhotos } from '../../../context/photosContext';
import { useNavigate } from 'react-router-dom';
import Search from '../../../shared/components/search/Search';
import Loading from '../../../shared/components/loading/Loading';
import Modal from '../../../shared/components/modal/Modal';
import Input from '../../../shared/components/input/Input';
import {
  getLocalUser,
  getUserDataByUsername,
} from '../../../services/usersServices';
import { getAllPhotosFromAlbum } from '../../../services/photosServices';
import { Album } from '../../../types/albumTypes';
import { User } from '../../../types/userTypes';
import Card from '../../../shared/components/card/Card';
import Dropdown from '../../../shared/components/dropdown/Dropdown';

const AlbumsFeed: React.FC = () => {
  const navigate = useNavigate();
  const {
    state: stateAlbums,
    setAlbumPhotos,
    addAlbum,
    updateAlbum,
    deleteAlbum,
  } = useAlbums();
  const { state: statePhotos } = usePhotos();
  const { state: stateUsers } = useUsers();
  const localUser = getLocalUser(stateUsers.users);

  const [albums, setAlbums] = useState<Album[]>([]);
  const [userData, setUserData] = useState<User>();
  const [userSearch, setUserSearch] = useState<string>(
    localUser?.username ?? ''
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [modalData, setModalData] = useState<{
    isOpen: boolean;
    type: 'create' | 'edit';
    id?: number;
  }>({
    isOpen: false,
    type: 'create',
  });
  const [newTitle, setNewTitle] = useState<string>('');

  const isLocalUserPage = userSearch === localUser?.username;

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [stateAlbums.albums]);

  const getPhotosAlbum = async (filteredAlbums: Album[]) => {
    if (filteredAlbums.length > 0) {
      setLoading(true);
      filteredAlbums.forEach((album) => {
        const photos = getAllPhotosFromAlbum(album.id, statePhotos.photos);
        setAlbumPhotos(album.id, photos);
      });
      setLoading(false);
    }
  };

  const handleSortAlbums = () => {
    const sortedAlbumPhotos = sortAlbumsByPhotoCount(
      stateAlbums.albumPhotos,
      albums
    );
    setAlbums(sortedAlbumPhotos);
  };

  const handleSearch = () => {
    const user = getUserDataByUsername(userSearch, stateUsers.users);
    setUserData(user);

    if (user) {
      const filteredAlbums = getAllAlbumsFromUserId(
        user.id,
        stateAlbums.albums
      );
      setAlbums(filteredAlbums);
      getPhotosAlbum(filteredAlbums);
    } else {
      setAlbums([]);
    }
  };

  const handleAddAlbum = () => {
    if (localUser) {
      const newAlbum = { id: 0, userId: localUser.id, title: newTitle };
      addAlbum(newAlbum);
      closeModal();
    }
  };

  const handleUpdateAlbum = () => {
    if (localUser && modalData.id) {
      const updatedAlbum = {
        id: modalData.id,
        userId: localUser.id,
        title: newTitle,
      };
      updateAlbum(updatedAlbum);
      closeModal();
    }
  };

  const closeModal = () => {
    setModalData({ isOpen: false, type: 'create' });
    setNewTitle('');
  };

  const openModal = (type: 'create' | 'edit', id?: number) => {
    setModalData({ isOpen: true, type, id });
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="container-my-albums">
          <div className="header-albums">
            <Search
              label="Username"
              placeholder="Search by username"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              onSearch={handleSearch}
            />
            <Button onClick={() => openModal('create')}>+ New Album</Button>
            <Dropdown
              title="Order By"
              options={['Number of photos']}
              onSelect={(option) => {
                if (option === 'Number of photos') {
                  handleSortAlbums();
                }
              }}
            />
          </div>
          <div className="page-title">
            {albums.length ? (
              <p>My Albums. By: {userData?.username}</p>
            ) : (
              <p>No data found</p>
            )}
          </div>
          <div className="albums-grid">
            {albums.map((album) => (
              <Card
                key={album.id}
                id={album.id}
                title={album.title}
                interactive={isLocalUserPage}
                onClick={() => navigate(`/album/${album.id}`)}
                onEdit={() => openModal('edit', album.id)}
                onDelete={deleteAlbum}
              />
            ))}
          </div>
        </div>
      )}
      {modalData.isOpen && (
        <Modal
          title={
            modalData.type === 'create'
              ? 'Create New Album'
              : 'Edit Album Title'
          }
          isOpen={modalData.isOpen}
          onConfirm={
            modalData.type === 'create' ? handleAddAlbum : handleUpdateAlbum
          }
          onClose={closeModal}
        >
          <div className="modal-edit-content">
            <Input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AlbumsFeed;

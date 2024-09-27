import React, { useState } from 'react';
import { useAlbums } from '../../context/albumsContext';
import Button from '../../shared/components/button/Button';
import './AddPhotos.scss';
import Input from '../../shared/components/input/Input';
import Select from '../../shared/components/select/Select';
import { usePhotos } from '../../context/photosContext';
import UploadPhoto from '../../shared/components/uploadPhoto/UploadPhoto';

const AddPhoto = () => {
  const { state: stateAlbums } = useAlbums();
  const { addPhoto } = usePhotos();
  const [title, setTitle] = useState('');
  const [albumId, setAlbumId] = useState<number | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const handleSubmit = () => {
    if (albumId && title && photoUrl) {
      const newPhoto = {
        albumId: albumId,
        id: 0,
        title: title,
        url: photoUrl,
        thumbnailUrl: photoUrl,
      };
      addPhoto(newPhoto);
    }
    setTitle('');
    setAlbumId(null);
  };

  const albumOptions = stateAlbums.albums.map((album) => ({
    value: album.id,
    label: `${album.id} - ${album.title}`,
  }));

  return (
    <section className="add-photo">
      <p>Add Photo</p>
      <div className="form-group">
        <div className="form-field">
          <Input
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            max={30}
          />
        </div>
        <div className="form-field">
          <Select
            options={albumOptions}
            value={albumId ?? ''}
            onChange={(value) => setAlbumId(Number(value))}
            label="Select Album"
            placeholder="Select an Album"
          />
        </div>
        <div className="form-field">
          <UploadPhoto onFileSelect={(url) => setPhotoUrl(url)} />
        </div>
        <div className="form-field">
          <Button
            onClick={handleSubmit}
            disabled={!photoUrl || !title || !albumId}
          >
            Upload Photo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AddPhoto;

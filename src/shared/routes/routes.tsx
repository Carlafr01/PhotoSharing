import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PhotosFeed from '../../pages/feed/PhotosFeed';
import AddPhoto from '../../pages/photos/AddPhotos';
import MyAlbums from '../../pages/albums/myAlbums/MyAlbums';
import AlbumDetails from '../../pages/albums/albumDetails/AlbumDetails';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PhotosFeed />} />
      <Route path="/add-photo" element={<AddPhoto />} />
      <Route path="/my-albums" element={<MyAlbums />} />
      <Route path="/album/:albumId" element={<AlbumDetails />} />
    </Routes>
  );
};

export default AppRoutes;

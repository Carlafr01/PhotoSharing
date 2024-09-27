import React, { useEffect, useRef, useState } from 'react';
import './PhotosFeed.scss';
import { useAlbums } from '../../context/albumsContext';
import { useUsers } from '../../context/usersContext';
import { usePhotos } from '../../context/photosContext';
import Loading from '../../shared/components/loading/Loading';
import { updatePhotosWithUser } from '../../services/photosServices';
import Card from '../../shared/components/card/Card';
import { Photo } from '../../types/photoTypes';

const PhotosFeed: React.FC = () => {
  const { state: statePhotos } = usePhotos();
  const { state: stateAlbums } = useAlbums();
  const { state: stateUsers } = useUsers();
  const loadMoreRef = useRef(null);
  const [updatedPhotos, setUpdatedPhotos] = useState<Photo[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const PHOTOS_PER_PAGE = 10;

  useEffect(() => {
    setLoading(true);
    if (
      statePhotos.photos.length > 0 &&
      stateUsers.users.length > 0 &&
      stateAlbums.albums.length > 0
    ) {
      const nextPhotos = statePhotos.photos.slice(
        (currentPage - 1) * PHOTOS_PER_PAGE,
        currentPage * PHOTOS_PER_PAGE
      );

      if (nextPhotos.length > 0) {
        const newUpdatedPhotos = updatePhotosWithUser(
          nextPhotos,
          stateAlbums.albums,
          stateUsers.users
        );

        setUpdatedPhotos((prevPhotos) => [...prevPhotos, ...newUpdatedPhotos]);
      }
    }
    setLoading(false);
  }, [currentPage, statePhotos, stateAlbums, stateUsers]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !loading) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      },
      {
        rootMargin: '100px',
      }
    );

    const currentLoadMoreRef = loadMoreRef.current;

    if (currentLoadMoreRef) {
      observer.observe(currentLoadMoreRef);
    }

    return () => {
      if (currentLoadMoreRef) {
        observer.unobserve(currentLoadMoreRef);
      }
    };
  }, [loading]);

  return (
    <div className="photos-feed">
      {updatedPhotos.length === 0 ? (
        <Loading />
      ) : (
        <div className="photo-item">
          {updatedPhotos.map((photo, index) => (
            <Card
              key={`${photo.id}${index}`}
              id={photo.id}
              title={photo.userName ?? ''}
            >
              <img
                className="image-feed"
                src={photo.url}
                alt={`A view of ${photo.title}`}
              />
            </Card>
          ))}
        </div>
      )}
      <p ref={loadMoreRef}>Loading More...</p>
    </div>
  );
};

export default PhotosFeed;

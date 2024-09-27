import { describe, it, expect } from 'vitest';
import { albumsReducer } from './albumsReducer';
import { Album } from '../types/albumTypes';
import { Photo } from '../types/photoTypes';

describe('albumsReducer', () => {
  const initialState = {
    albums: [],
    albumPhotos: [],
  };

  it('should set albums', () => {
    const albums: Album[] = [{ id: 1, title: 'Album 1', userId: 1 }];
    const state = albumsReducer(initialState, {
      type: 'SET_ALBUMS',
      payload: albums,
    });

    expect(state.albums).toEqual(albums);
  });

  it('should set album photos', () => {
    const initialStateWithAlbums = {
      albums: [{ id: 1, title: 'Album 1', userId: 1 }],
      albumPhotos: [],
    };
    const photos: Photo[] = [
      {
        id: 1,
        url: 'photo1.jpg',
        title: 'Photo 1',
        albumId: 1,
        thumbnailUrl: 'photo1.jpg',
      },
    ];
    const state = albumsReducer(initialStateWithAlbums, {
      type: 'SET_ALBUM_PHOTOS',
      payload: { id: 1, photos },
    });

    expect(state.albumPhotos).toEqual([{ id: 1, photos }]);
  });

  it('should add a new album', () => {
    const newAlbum: Album = { id: 0, title: 'Album 2', userId: 1 };
    const state = albumsReducer(initialState, {
      type: 'ADD_ALBUM',
      payload: { ...newAlbum },
    });

    expect(state.albums).toHaveLength(1);
    expect(state.albums[0]).toEqual({ ...newAlbum });
  });

  it('should update an existing album', () => {
    const existingAlbum: Album = { id: 1, title: 'Album 1', userId: 1 };
    const updatedAlbum: Album = { id: 1, title: 'Updated Album 1', userId: 1 };
    const state = albumsReducer(
      { albums: [existingAlbum], albumPhotos: [] },
      { type: 'UPDATE_ALBUM', payload: updatedAlbum }
    );

    expect(state.albums[0]).toEqual(updatedAlbum);
  });

  it('should delete an album', () => {
    const existingAlbum: Album = { id: 1, title: 'Album 1', userId: 1 };
    const state = albumsReducer(
      { albums: [existingAlbum], albumPhotos: [] },
      { type: 'DELETE_ALBUM', payload: 1 }
    );

    expect(state.albums).toHaveLength(0);
  });
});

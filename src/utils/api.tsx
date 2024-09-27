export const fetchUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  return response.json();
};

export const fetchAlbums = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/albums');
  return response.json();
};

export const fetchAlbumsByUserId = async (userId: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/albums`
  );
  return response.json();
};

export const fetchPhotos = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/photos`);
  return response.json();
};

export const fetchPhotosByAlbumId = async (albumId: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
  );
  return response.json();
};

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  userId?: number;
  userName?: string;
}

export interface PhotosContextState {
  photos: Photo[];
}

import React, { useState } from 'react';
import './UploadPhoto.scss';

interface UploadPhotoProps {
  onFileSelect: (file: string | null) => void;
}

const UploadPhoto: React.FC<UploadPhotoProps> = ({ onFileSelect }) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const handleFileChange = (file: File | null) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
      onFileSelect(url);
    }
  };

  return (
    <div className="upload-container">
      <label htmlFor="photo-upload" className="upload-label">
        Upload Photo
      </label>
      <input
        type="file"
        id="photo-upload"
        onChange={(e) =>
          handleFileChange(e.target.files ? e.target.files[0] : null)
        }
        accept="image/*"
        className="upload-input"
      />
      {photoUrl && (
        <img src={photoUrl} alt="Uploaded" className="uploaded-image" />
      )}
    </div>
  );
};

export default UploadPhoto;

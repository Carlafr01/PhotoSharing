import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Album } from '../../../types/albumTypes';
import Card from './Card';
import { Photo } from '../../../types/photoTypes';

const mockAlbum: Album = {
  id: 1,
  title: 'Test Album',
  userId: 1,
};

const mockPhoto: Photo = {
  id: 1,
  title: 'Test Photo',
  userId: 1,
  albumId: 1,
  url: 'example.com',
  thumbnailUrl: 'example.com',
};

describe('AlbumCard Component', () => {
  const onEdit = vi.fn();
  const onDelete = vi.fn();
  const onClick = vi.fn();

  it('renders the album title', () => {
    render(
      <Card
        id={mockAlbum.id}
        title={mockAlbum.title}
        interactive={true}
        onEdit={onEdit}
        onDelete={onDelete}
        onClick={onClick}
      />
    );
    const titleElement = screen.getByText(mockAlbum.title);
    expect(titleElement).toBeInTheDocument();
  });

  it('calls onClick with album id when clicked', () => {
    render(
      <Card
        id={mockAlbum.id}
        title={mockAlbum.title}
        interactive={true}
        onEdit={onEdit}
        onDelete={onDelete}
        onClick={onClick}
      />
    );
    const cardButton = screen.getByRole('button', { name: mockAlbum.title });
    fireEvent.click(cardButton);
    expect(onClick).toHaveBeenCalledWith(mockAlbum.id);
  });

  it('renders action buttons when interactive is true', () => {
    render(
      <Card
        id={mockAlbum.id}
        title={mockAlbum.title}
        interactive={true}
        onEdit={onEdit}
        onDelete={onDelete}
        onClick={onClick}
      />
    );
    const editButton = screen.getByLabelText('Edit');
    const deleteButton = screen.getByLabelText('Delete');
    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  it('calls onEdit when the edit button is clicked', () => {
    render(
      <Card
        id={mockAlbum.id}
        title={mockAlbum.title}
        interactive={true}
        onEdit={onEdit}
        onDelete={onDelete}
        onClick={onClick}
      />
    );
    const editButton = screen.getByLabelText('Edit');
    fireEvent.click(editButton);
    expect(onEdit).toHaveBeenCalledWith(mockAlbum.id);
  });

  it('calls onDelete when the delete button is clicked', () => {
    render(
      <Card
        id={mockAlbum.id}
        title={mockAlbum.title}
        interactive={true}
        onEdit={onEdit}
        onDelete={onDelete}
        onClick={onClick}
      />
    );
    const deleteButton = screen.getByLabelText('Delete');
    fireEvent.click(deleteButton);
    expect(onDelete).toHaveBeenCalledWith(mockAlbum.id);
  });

  it('does not render action buttons when interactive is false', () => {
    render(
      <Card
        id={mockAlbum.id}
        title={mockAlbum.title}
        interactive={false}
        onEdit={onEdit}
        onDelete={onDelete}
        onClick={onClick}
      />
    );

    const editButton = screen.queryByLabelText('Edit');
    const deleteButton = screen.queryByLabelText('Delete');

    expect(editButton).not.toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
  });
});

describe('PhotoCard Component', () => {
  const onEdit = vi.fn();
  const onDelete = vi.fn();
  const onClick = vi.fn();

  it('renders the photo title', () => {
    render(
      <Card
        id={mockPhoto.id}
        title={mockPhoto.title}
        interactive={true}
        onEdit={onEdit}
        onDelete={onDelete}
        onClick={onClick}
      />
    );
    const titleElement = screen.getByText(mockPhoto.title);
    expect(titleElement).toBeInTheDocument();
  });

  it('calls onClick with photo id when clicked', () => {
    render(
      <Card
        id={mockPhoto.id}
        title={mockPhoto.title}
        interactive={true}
        onEdit={onEdit}
        onDelete={onDelete}
        onClick={onClick}
      />
    );
    const cardButton = screen.getByRole('button', { name: mockPhoto.title });
    fireEvent.click(cardButton);
    expect(onClick).toHaveBeenCalledWith(mockPhoto.id);
  });

  it('renders action buttons when interactive is true', () => {
    render(
      <Card
        id={mockPhoto.id}
        title={mockPhoto.title}
        interactive={true}
        onEdit={onEdit}
        onDelete={onDelete}
        onClick={onClick}
      />
    );
    const editButton = screen.getByLabelText('Edit');
    const deleteButton = screen.getByLabelText('Delete');
    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  it('calls onEdit when the edit button is clicked', () => {
    render(
      <Card
        id={mockPhoto.id}
        title={mockPhoto.title}
        interactive={true}
        onEdit={onEdit}
        onDelete={onDelete}
        onClick={onClick}
      />
    );
    const editButton = screen.getByLabelText('Edit');
    fireEvent.click(editButton);
    expect(onEdit).toHaveBeenCalledWith(mockPhoto.id);
  });

  it('calls onDelete when the delete button is clicked', () => {
    render(
      <Card
        id={mockPhoto.id}
        title={mockPhoto.title}
        interactive={true}
        onEdit={onEdit}
        onDelete={onDelete}
        onClick={onClick}
      />
    );
    const deleteButton = screen.getByLabelText('Delete');
    fireEvent.click(deleteButton);
    expect(onDelete).toHaveBeenCalledWith(mockPhoto.id);
  });

  it('does not render action buttons when interactive is false', () => {
    render(
      <Card
        id={mockPhoto.id}
        title={mockPhoto.title}
        interactive={false}
        onEdit={onEdit}
        onDelete={onDelete}
        onClick={onClick}
      />
    );

    const editButton = screen.queryByLabelText('Edit');
    const deleteButton = screen.queryByLabelText('Delete');

    expect(editButton).not.toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Album } from '../../../types/albumTypes';
import Card from './Card';

const mockAlbum: Album = {
  id: 1,
  title: 'Test Album',
  userId: 1,
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
    const editButton = screen.getByRole('button', { name: /edit album/i });
    const deleteButton = screen.getByRole('button', { name: /delete album/i });
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
    const editButton = screen.getByRole('button', { name: /edit album/i });
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
    const deleteButton = screen.getByRole('button', { name: /delete album/i });
    fireEvent.click(deleteButton);

    expect(onDelete).toHaveBeenCalledWith(mockAlbum.id);
  });

  it('does not render action buttons when interactive is false', () => {
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

    const editButton = screen.queryByRole('button', { name: /edit album/i });
    const deleteButton = screen.queryByRole('button', {
      name: /delete album/i,
    });

    expect(editButton).not.toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
  });
});

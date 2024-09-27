import React from 'react';
import './Card.scss';
import { FaTrash, FaEdit } from 'react-icons/fa';

interface CardProps {
  id: number;
  title: string;
  interactive?: boolean;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onClick?: (id: number) => void;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  interactive = false,
  onEdit = () => null,
  onDelete = () => null,
  onClick = () => null,
  children,
}) => {
  return (
    <button className="card" onClick={() => onClick(id)}>
      {children || <div className="cover"></div>}{' '}
      <p className="card-title">{title}</p>
      {interactive && (
        <div className="card-actions">
          <button
            className="edit-button"
            aria-label="Edit"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(id);
            }}
          >
            <FaEdit />
          </button>
          <button
            className="delete-button"
            aria-label="Delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
          >
            <FaTrash />
          </button>
        </div>
      )}
    </button>
  );
};

export default Card;

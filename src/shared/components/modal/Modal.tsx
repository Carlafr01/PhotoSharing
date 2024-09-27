import React, { ReactNode } from 'react';
import './Modal.scss';
import Button from '../button/Button';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  onConfirm,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{title}</h2>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <Button onClick={onClose} type="reset" className="cancel-button">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="confirm-button">
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

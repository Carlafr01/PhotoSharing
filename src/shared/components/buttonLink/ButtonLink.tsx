import React from 'react';
import { Link } from 'react-router-dom';
import './ButtonLink.scss';

interface ButtonLinkProps {
  text: string;
  to: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ text, to }) => {
  return (
    <Link to={to} className="button-link">
      {text}
    </Link>
  );
};

export default ButtonLink;

import React from 'react';
import './Header.scss';
import ButtonLink from '../buttonLink/ButtonLink';

interface HeaderProps {
  text: string;
}

const Header: React.FC<HeaderProps> = ({ text }) => {
  return (
    <header className="app-header">
      <h1>{text}</h1>
      <nav>
        <ButtonLink text="Feed" to="/" />
        <ButtonLink text="Add Photo" to="/add-photo" />
        <ButtonLink text="My Albums" to="/my-albums" />
      </nav>
    </header>
  );
};

export default Header;

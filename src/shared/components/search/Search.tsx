import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './Search.scss';

interface SearchProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onSearch: () => void;
}

const Search: React.FC<SearchProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Search...',
  onSearch,
}) => {
  return (
    <div className="search-container">
      <p>{label}</p>
      <div className="input-button-container">
        <input
          type="text"
          className="search-input"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        <button className="search-button" onClick={onSearch}>
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default Search;

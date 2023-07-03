import React, { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import css from 'components/Searchbar/Searchbar.module.css';
import PropTypes from 'prop-types';

const Searchbar = ({ onSearchSubmit }) => {
  const [searchImage, setSearchImage] = useState('');

  const handleNameChange = event => {
    setSearchImage(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchImage.trim() === '') {
      alert('Введіть пошуковий запит!');
      return;
    }
    onSearchSubmit(searchImage);
    setSearchImage('');
  };

  return (
    <header className={css.Searchbar}>
      <form onSubmit={handleSubmit} className={css.SearchForm}>
        <button type="submit" className={css.SearchForm_button}>
          <ImSearch />
        </button>
        <input
          className={css.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          name="name"
          placeholder="Search images and photos"
          value={searchImage}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSearchSubmit: PropTypes.func,
};

export default Searchbar;

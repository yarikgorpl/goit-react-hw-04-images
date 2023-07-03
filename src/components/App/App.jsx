import React, { useState } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import css from './App.module.css';
import PropTypes from 'prop-types';

const App = () => {
  const [searchImage, setSearchImage] = useState('');

  const handleFormSubmit = searchImage => {
    setSearchImage(searchImage);
  };

  return (
    <div className={css.App}>
      <Searchbar onSearchSubmit={handleFormSubmit} />
      <ImageGallery searchImage={searchImage} />
    </div>
  );
};

App.propTypes = {
  onSearchSubmit: PropTypes.func,
  searchImage: PropTypes.string,
};

export default App;

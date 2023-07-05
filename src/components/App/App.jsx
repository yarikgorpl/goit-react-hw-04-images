import React, { useState, useEffect } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import css from './App.module.css';
import PropTypes from 'prop-types';
import getImages from 'services/api';
import LoadMore from 'components/LoadMore/LoadMore';
import { ThreeDots } from 'react-loader-spinner';

const App = () => {
  const [searchImage, setSearchImage] = useState('');
  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = () => {
      setIsLoading(true);

      getImages(searchImage, page)
        .then(response => response.json())
        .then(data => {
          if (data.total === 0) {
            return alert('По вашому запиту нічого не знайдено');
          }

          setImage(prevImage => [...prevImage, ...data.hits]);
        })
        .catch(error => {
          setError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    if (searchImage) {
      console.log(page);

      fetchImages();
    }
  }, [searchImage, page]);

  const resetQuery = () => {
    setImage([]);
    setPage(1);
    setError(null);
  };

  const onButtonClick = () => {
    setPage(prevPage => prevPage + 1);
  };
  const handleFormSubmit = searchImage => {
    resetQuery();
    setSearchImage(searchImage);
  };
  return (
    <div className={css.App}>
      {error && setError(error.message)}
      <Searchbar onSearchSubmit={handleFormSubmit} />
      {isLoading && <ThreeDots />}
      <ImageGallery image={image} />
      {image.length > 0 && searchImage && image.length % 12 === 0 && (
        <LoadMore onClick={onButtonClick} />
      )}
    </div>
  );
};

App.propTypes = {
  onSearchSubmit: PropTypes.func,
  searchImage: PropTypes.string,
};

export default App;

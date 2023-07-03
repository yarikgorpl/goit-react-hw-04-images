import React, { useState, useEffect } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import LoadMore from 'components/LoadMore/LoadMore';
import Modal from 'components/Modal/Modal';
import { ThreeDots } from 'react-loader-spinner';
import getImages from 'services/api';
import css from 'components/ImageGallery/ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ searchImage }) => {
  console.log(searchImage);
  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [showModal, setShowModal] = useState(false);

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
      console.log(searchImage);
      console.log(page);
      fetchImages();
    } else {
      resetQuery();
    }
  }, [searchImage, page]);

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const imageForModal = data => {
    setActiveImage(data);
  };

  const onButtonClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const resetQuery = () => {
    setPage(1);
    setImage([]);
  };

  return (
    <>
      {error && <h1>Помилка,спробуйте пізніше</h1>}
      {isLoading && <ThreeDots />}
      {showModal && (
        <Modal onToggleModal={toggleModal}>
          <img src={activeImage.largeImageURL} alt={activeImage.tags} />
        </Modal>
      )}
      <ul className={css.ImageGallery}>
        {image &&
          image.map(el => (
            <ImageGalleryItem
              key={el.id}
              imageClick={() => imageForModal(el)}
              openModal={toggleModal}
              {...el}
            />
          ))}
      </ul>
      {image.length > 0 && searchImage && image.length % 12 === 0 && (
        <LoadMore onClick={onButtonClick} />
      )}
    </>
  );
};

ImageGallery.propTypes = {
  key: PropTypes.string,
  imageClick: PropTypes.func,
  openModal: PropTypes.func,
};

export default ImageGallery;

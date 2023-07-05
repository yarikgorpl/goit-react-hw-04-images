import React, { useState } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';
import css from 'components/ImageGallery/ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ image }) => {
  const [activeImage, setActiveImage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const imageForModal = data => {
    setActiveImage(data);
  };

  return (
    <>
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
    </>
  );
};

ImageGallery.propTypes = {
  key: PropTypes.string,
  imageClick: PropTypes.func,
  openModal: PropTypes.func,
};

export default ImageGallery;

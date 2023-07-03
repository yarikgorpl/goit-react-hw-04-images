import React, { Component } from 'react';
import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

class ImageGalleryItem extends Component {
  render() {
    const { webformatURL, tags, imageClick, openModal } = this.props;
    return (
      <li className={css.ImageGalleryItem}>
        <img
          className={css.ImageGalleryItem_image}
          src={webformatURL}
          alt={tags}
          onClick={() => {
            openModal();
            imageClick();
          }}
        />
      </li>
    );
  }
}
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  imageClick: PropTypes.func,
  openModal: PropTypes.func,
};
export default ImageGalleryItem;

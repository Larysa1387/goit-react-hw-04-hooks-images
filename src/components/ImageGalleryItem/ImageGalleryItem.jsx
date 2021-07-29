import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  webformatURL,
  tags,

  largeImage,
  modalOpen,
}) => {
  const sendLargeImage = () => {
    modalOpen(largeImage);
  };
  return (
    <li className={s.ImageGalleryItem}  onClick={sendLargeImage}>
      <img src={webformatURL} alt={tags} className={s.ImageGalleryItem_image} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  modalOpen: PropTypes.func.isRequired,
};

export default ImageGalleryItem;

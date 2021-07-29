import React from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';


const ImageGallery = ({ images, modalOpen }) => {
  return (
    <ul className={s.ImageGallery}>
      {images.map(({ webformatURL, tags, id, largeImageURL }) => (
        <ImageGalleryItem
          webformatURL={webformatURL}
          largeImage={largeImageURL}
          tags={tags}
          key={id}
          modalOpen={modalOpen}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf( PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
  modalOpen: PropTypes.func.isRequired,
};

export default ImageGallery;

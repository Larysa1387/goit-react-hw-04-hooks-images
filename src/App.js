import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import imageAPI from './services/imageApi/imageApi.jsx';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Loader from './components/Loader';
import Button from './components/Button';
import Modal from './components/Modal';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

export default function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [largeImage, setLargeImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      searchImagesFetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const searchImagesFetch = () => {
    setLoading(true);
    imageAPI
      .fetchImage(searchQuery, page)
      .then((imagesArr) => {
        if (page === 1) {
          setImages(imagesArr.hits)
        } else {
          setImages((prevState) => [...prevState, ...imagesArr.hits]);
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      })
      .catch((error) => setError(error))
      .finally(() =>{
        setLoading(false);
        setPage((prevPage) => prevPage + 1);
      });
  };

  const handleFormSubmit = (searchQuery) => {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
    setError(null);
  };

  const modalOpen = (largeImage) => {
    setShowModal(true);
    setLargeImage(largeImage);
  };

  const modalClose = () => {
    setShowModal(false);
    setLargeImage('');
  };

  return (
    <div>
      <ToastContainer autoClose={3000} />
      <Searchbar onSubmit={handleFormSubmit} />
      {error && (
        <h1 style={{ display: 'flex', justifyContent: 'center'}}>
          {error.message}
        </h1>
      )}

      {images && <ImageGallery images={images} modalOpen={modalOpen} />}
      {showModal && <Modal modalClose={modalClose} largeImage={largeImage} />}
      {loading && <Loader />}
      {images.length !== 0 && <Button onClick={searchImagesFetch} />}
    </div>
  );
};

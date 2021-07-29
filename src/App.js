import { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import imageAPI from './services/imageApi/imageApi.jsx';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Loader from './components/Loader';
import Button from './components/Button';
import Modal from './components/Modal';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';
class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    largeImage: '',
    loading: false,
    error: null,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.searchImagesFetch();
    }
    else if (this.state.page !== 1) {
        window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  searchImagesFetch = () => {
    const { searchQuery, page } = this.state;
    this.setState({ loading: true });
    imageAPI
      .fetchImage(searchQuery, page)
      .then((imagesArr) => this.checkNewFetchImages(imagesArr.hits))
      .catch((error) => this.setState({ error }))
      .finally(() =>
        this.setState({ loading: false }),
      );
  };

  checkNewFetchImages = (imagesArr) => {
    imagesArr === []
      ? this.setState({
        images: imagesArr,
        page:1,
        })
      : this.setState((prevState) => ({
          images: [...prevState.images, ...imagesArr],
          page: prevState.page + 1,
        }));
  };

  handleFormSubmit = (searchQuery) => {
    this.setState({
      searchQuery,
      images: [],
      page: 1,
      error:null,
    });
  };

  // onClickLoadMore = () => {
  //   this.searchImagesFetch();
  //   this.scrollGallery();
  // };

  // scrollGallery = () => {
  //   setTimeout(() => {
  //     window.scrollTo({
  //       top: document.documentElement.scrollHeight,
  //       behavior: 'smooth',
  //     });
  //   }, 500);
  // };

  modalOpen = (largeImage) => {
    this.setState({
      showModal: true,
      largeImage,
    });
  };

  modalClose = () => {
    this.setState({
      showModal: false,
      largeImage: '',
    });
  };

  render() {
    const { loading, error, images, showModal, largeImage } = this.state;
    return (
      <div>
        <ToastContainer autoClose={3000} />
        {error && <h1>error.message</h1>}
        <Searchbar onSubmit={this.handleFormSubmit} />

        {images && <ImageGallery images={images} modalOpen={this.modalOpen} />}
        {showModal && (
          <Modal modalClose={this.modalClose} largeImage={largeImage} />
        )}
        {loading && <Loader />}
        {images.length !== 0 && <Button onClick={this.searchImagesFetch} />}
      </div>
    );
  }
}

export default App;

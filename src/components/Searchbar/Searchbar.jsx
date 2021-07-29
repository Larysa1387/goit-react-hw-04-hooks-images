import React, { Component } from 'react';
import { toast } from 'react-toastify';

import s from './Searchbar.module.css';


class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleInputChange = (e) => {
    const { value } = e.currentTarget;
    this.setState({searchQuery:value.toLowerCase()});
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      toast.warn('Tipe your query!');
      return
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchForm_button}>
            <span className={s.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={s.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

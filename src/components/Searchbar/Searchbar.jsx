import React, { useState } from 'react';
import { toast } from 'react-toastify';

import s from './Searchbar.module.css';

export default function Searchbar({onSubmit}) {
  const [searchQuery, setSearchQuery] = useState('');

const handleSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      toast.warn('Tipe your query!');
      return
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  const handleInputChange = (e) => {
    const { value } = e.currentTarget;
    setSearchQuery(value.toLowerCase());
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchForm_button}>
          <span className={s.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={s.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};

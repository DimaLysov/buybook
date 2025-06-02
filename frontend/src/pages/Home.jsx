import React, { useState, useEffect } from 'react';

import Book from '../components/Book';
import { getBooks } from '../api/book';
import { getСategories } from '../api/category';


function Home() {
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
        const dataCategories = await getСategories();
        setCategories(dataCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredBooks = books.filter(book => {
    const matchesTitle = book.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory ? String(book.category) === String(selectedCategory) : true;
    return matchesTitle && matchesCategory;
  });

  return (
    <div className="home-content">
      <h1 className="home-title">Доступные книги</h1>
      <input
        type="text"
        className="book-search"
        placeholder="Поиск по названию..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <select
        className="book-category-select"
        value={selectedCategory}
        onChange={e => setSelectedCategory(e.target.value)}
      >
        <option value="">Все категории</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
      {loading && <div className="home-loading">Загрузка...</div>}
      {error && <div className="home-error">Ошибка: {error}</div>}
      <div className="books-list">
        {filteredBooks.map(book => (
          <Book key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default Home;
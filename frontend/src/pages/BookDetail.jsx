import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { getBook } from '../api/book';
import { getAuthor } from '../api/author';
import { getCategory } from '../api/category';

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [author, setAuthor] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBook(id);
        setBook(data);
        const authorData = await getAuthor(data.author);
        setAuthor(authorData);
        const categoryData = await getCategory(data.category);
        setCategory(categoryData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="book-detail-page"><div className="book-detail-modal">Загрузка...</div></div>;
  if (error) return <div className="book-detail-page"><div className="book-detail-modal">Ошибка: {error}</div></div>;
  if (!book) return <div className="book-detail-page"><div className="book-detail-modal">Книга не найдена</div></div>;

  return (
    <div className="book-detail-page">
      <div className="book-detail-modal">
        <div className="book-detail-content">
          <Link to="/" className="book-detail-back">← Назад к списку</Link>
          <h2 className="book-detail-title">{book.title}</h2>
          <div className="book-detail-info">
            <p className="book-detail-price"><b>Цена:</b> {book.price} ₽</p>
            <p className="book-detail-description"><b>Описание:</b> {book.description}</p>
            <p className="book-detail-stock"><b>В наличии:</b> {book.stock_quantity}</p>
            <p className="book-detail-author"><b>Автор:</b> <Link to={`/author/${book.author}`} className="book-detail-author-link"><b>{author.full_name}</b></Link></p>
            <p className="book-detail-category"><b>Категория:</b> {category.name}</p>
          </div>
        </div>
        {book.image_url && book.image_url !== 'string' && (
          <img src={book.image_url} alt={book.title} className="book-detail-image" />
        )}
      </div>
    </div>
  );
}

export default BookDetail;

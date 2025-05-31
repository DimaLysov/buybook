import React from 'react';
import { Link } from 'react-router-dom';

function Book({ book }) {
  return (
    <Link to={`/book/${book.id}`} className="book-card-link" style={{ textDecoration: 'none' }}>
      <div className="book-card">
        {book.image_url && book.image_url !== 'string' && (
          <img src={book.image_url} alt={book.title} className="book-image" />
        )}
        <h2 className="book-title">{book.title}</h2>
        <div className="book-info">
          <span className="book-price">Цена: {book.price} ₽</span>
        </div>
      </div>
    </Link>
  );
}

export default Book;

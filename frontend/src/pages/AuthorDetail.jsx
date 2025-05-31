import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { getAuthor } from '../api/author';
import { getBooks } from '../api/book';

function AuthorDetail() {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authorData = await getAuthor(id);
        setAuthor(authorData);
        const allBooks = await getBooks();
        setBooks(allBooks.filter(b => String(b.author) === String(id)));
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
  if (!author) return <div className="book-detail-page"><div className="book-detail-modal">Автор не найден</div></div>;

  return (
    <div className="book-detail-page">
      <div className="book-detail-modal">
        <Link to="/" className="book-detail-back">← Назад к списку</Link>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 className="book-detail-title">{author.full_name}</h2>
          <div className="book-detail-info">
            <p><b>Биография:</b> {author.biography}</p>
            <h3 style={{marginTop: 24, marginBottom: 12}}>Книги автора:</h3>
            <ul style={{paddingLeft: 18}}>
              {books.length === 0 && <li>Нет книг</li>}
              {books.map(book => (
                <li key={book.id} style={{margin: '8px 0'}}>
                  <Link to={`/book/${book.id}`} style={{color: '#000000'}}>{book.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorDetail;

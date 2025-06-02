import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { getBook } from '../api/book';
import { getAuthor } from '../api/author';
import { getCategory } from '../api/category';
import { getReviewBook, deleteReview, addReview, editReview } from '../api/review';
import Review from '../components/Review';

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [author, setAuthor] = useState(null);
  const [category, setCategory] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 1, text: '' });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBook(id);
        setBook(data);
        const authorData = await getAuthor(data.author);
        setAuthor(authorData);
        const categoryData = await getCategory(data.category);
        setCategory(categoryData);
        const reviewsData = await getReviewBook(id);
        setReviews(reviewsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      const reviewsData = await getReviewBook(id);
      setReviews(reviewsData);
    } catch (err) {
      alert('Ошибка при удалении отзыва: ' + err.message);
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    setAdding(true);
    try {
      const requestBody = {
        rating: Number(newReview.rating),
        text: newReview.text,
        date: new Date().toISOString(),
        book: Number(id),
      };
      await addReview(requestBody);
      setShowAddReview(false);
      setNewReview({ rating: 1, text: '' });
      const reviewsData = await getReviewBook(id);
      setReviews(reviewsData);
    } catch (err) {
      alert('Ошибка при добавлении отзыва: ' + err.message);
    } finally {
      setAdding(false);
    }
  };

  const handleEditReview = async (reviewId, updatedFields) => {
    try {
      await editReview(reviewId, updatedFields);
      const reviewsData = await getReviewBook(id);
      setReviews(reviewsData);
    } catch (err) {
      alert('Ошибка при редактировании отзыва: ' + err.message);
    }
  };

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
          <div className="book-reviews-section">
            <h3 className="book-reviews-title">Отзывы о книге</h3>
            <button className="review-add-btn" onClick={() => setShowAddReview(v => !v)}>
              {showAddReview ? 'Отмена' : 'Добавить отзыв'}
            </button> 
            {showAddReview && (
              <form className="review-add-form" onSubmit={handleAddReview}>
                <label>
                  Оценка:
                  <select value={newReview.rating} onChange={e => setNewReview(r => ({ ...r, rating: e.target.value }))} required>
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </label>
                <label>
                  Отзыв:
                  <textarea value={newReview.text} onChange={e => setNewReview(r => ({ ...r, text: e.target.value }))} required rows={3} />
                </label>
                <button type="submit" disabled={adding}>Сохранить</button>
              </form>
            )}
            {reviews.length === 0 && <div className="book-reviews-empty">Пока нет отзывов</div>}
            {reviews.map(review => (
              <Review key={review.id} review={review} onDelete={handleDeleteReview} onEdit={handleEditReview} />
            ))}
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

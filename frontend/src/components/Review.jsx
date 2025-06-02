import React, { useState } from 'react';

function Review({ review, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(review.text);
  const [editRating, setEditRating] = useState(review.rating);
  const [saving, setSaving] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(review.text);
    setEditRating(review.rating);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    if (onEdit) {
      await onEdit(review.id, { text: editText, rating: editRating });
    }
    setSaving(false);
    setIsEditing(false);
  };

  return (
    <div className="review-card">
      <div className="review-header">
        <span className="review-rating">Оценка: {review.rating} / 5</span>
        <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
        {onDelete && !isEditing && (
          <button className="review-delete-btn" onClick={() => onDelete(review.id)} title="Удалить отзыв">✕</button>
        )}
        {onEdit && !isEditing && (
          <button className="review-edit-btn" onClick={handleEdit} title="Редактировать отзыв">✎</button>
        )}
      </div>
      {isEditing ? (
        <form className="review-edit-form" onSubmit={handleSave}>
          <textarea
            className="review-edit-textarea"
            value={editText}
            onChange={e => setEditText(e.target.value)}
            rows={3}
            required
          />
          <div className="review-edit-controls">
            <label>
              Оценка:
              <select value={editRating} onChange={e => setEditRating(Number(e.target.value))}>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </label>
            <button type="submit" className="review-save-btn" disabled={saving}>Сохранить</button>
            <button type="button" className="review-cancel-btn" onClick={handleCancel}>Отмена</button>
          </div>
        </form>
      ) : (
        <div className="review-text">{review.text}</div>
      )}
    </div>
  );
}

export default Review;

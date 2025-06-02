const BASE_URL = process.env.REACT_APP_PATH_URL_API;

export const getReviewBook = async (book_id) => {
    const response = await fetch(`${BASE_URL}/review/by-book/${book_id}/`);
    if (!response.ok) {
      throw new Error('Ошибка при загрузке данных отзывов по книге');
    }
    return await response.json();
  };

export const deleteReview = async (id) => {
  const response = await fetch(`${BASE_URL}/review/${id}/`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Ошибка при удалении отзыва');
  }
  return;
};

export const addReview = async (requestBody) => {
  const response = await fetch(`${BASE_URL}/review/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
  if (!response.ok) {
    throw new Error(`Ошибка при добавлении отзыва: ${response.statusText}`);
}
  return await response.json();
};

export const editReview = async (id, requestBody) => {
    console.log('updateOrderAmount', id, requestBody);
  const response = await fetch(`${BASE_URL}/review/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
  if (!response.ok) {
    throw new Error('Ошибка при обновлении отзыва');
  }
  return await response.json();
};
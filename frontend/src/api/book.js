const BASE_URL = process.env.REACT_APP_PATH_URL_API;

export const getBooks = async () => {
    const response = await fetch(`${BASE_URL}/book/`);
    if (!response.ok) {
      throw new Error('Ошибка при загрузке данных книг');
    }
    return await response.json();
  };

export const getBook = async (id) => {
    const response = await fetch(`${BASE_URL}/book/${id}/`);
    if (!response.ok) {
      throw new Error('Ошибка при загрузке данных книги');
    }
    return await response.json();
  };
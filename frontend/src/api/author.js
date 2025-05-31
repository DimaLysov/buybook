const BASE_URL = process.env.REACT_APP_PATH_URL_API;

export const getAuthor = async (id) => {
    const response = await fetch(`${BASE_URL}/author/${id}/`);
    if (!response.ok) {
      throw new Error('Ошибка при загрузке данных автора');
    }
    return await response.json();
  };

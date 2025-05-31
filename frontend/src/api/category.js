const BASE_URL = process.env.REACT_APP_PATH_URL_API;

export const getСategories = async () => {
    const response = await fetch(`${BASE_URL}/category/`);
    if (!response.ok) {
      throw new Error('Ошибка при загрузке данных категорий');
    }
    return await response.json();
  };


export const getCategory = async (id) => {
    const response = await fetch(`${BASE_URL}/category/${id}/`);
    if (!response.ok) {
      throw new Error('Ошибка при загрузке данных категории');
    }
    return await response.json();
  };

// Configuration des API
const API_URL = import.meta.env.VITE_API_URL;

export const API_ENDPOINTS = {
  // Authentification
  AUTH: {
    LOGIN: `${API_URL}/auth/login`,
    REGISTER: `${API_URL}/auth/register`,
    REFRESH: `${API_URL}/auth/refresh`,
    ALL_USERS: `${API_URL}/auth/allusers`,
  },
  // Produits
  PRODUCTS: {
    BASE: `${API_URL}/products`,
    CREATE: `${API_URL}/products/create`,
    GET_BY_CODE: (code) => `${API_URL}/products/${code}`,
    UPDATE: (code) => `${API_URL}/products/edit/${code}`,
    DELETE: (code) => `${API_URL}/products/delete/${code}`,
    DELETE_ALL: `${API_URL}/products/delete`,
  },
};
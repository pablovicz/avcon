import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://127.0.0.1:5000';

const api = axios.create({
    baseURL: `${BASE_URL}/`
});

export default api;
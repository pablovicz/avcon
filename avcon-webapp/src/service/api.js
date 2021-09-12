import axios from 'axios';

//const BASE_URL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
    //baseURL: `${BASE_URL}/`
    baseURL: "http://127.0.0.1:5000/"
});

export default api;
import axios from 'axios';
import router from '../router'; // Import instance router dari router/index.js

const api = axios.create({
    baseURL: 'http://localhost/informatics25/backend/api',
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');

            if (router.currentRoute.value.path !== '/login') {
                router.push('/login?session=expired');
            }
        }
        return Promise.reject(error);
    }
);

export default api;
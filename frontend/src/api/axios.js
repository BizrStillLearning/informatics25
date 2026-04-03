import axios from 'axios';
import router from '../router';
import { useAuthStore } from '../stores/authStore';
import Swal from 'sweetalert2';

const api = axios.create({
    baseURL: 'http://localhost/informatics25/backend/api',
    withCredentials: true
});

api.interceptors.request.use((config) => {
    const authStore = useAuthStore();
    if (authStore.token) {
        config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const authStore = useAuthStore();

        if (error.response && error.response.status === 401) {
            if (router.currentRoute.value.path !== '/login') {

                await Swal.fire({
                    title: 'Sesi Berakhir!',
                    text: 'Token Anda sudah habis, silakan login kembali.',
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Login Sekarang',
                    allowOutsideClick: false
                });

                authStore.logout();

                router.push('/login');
            }
        }
        return Promise.reject(error);
    }
);

export default api;
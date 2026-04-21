import axios from 'axios';
import router from '../router';
import { useAuthStore } from '../stores/authStore';
import Swal from 'sweetalert2';

const api = axios.create({
    // Cukup sampai /api saja
    baseURL: 'http://localhost:8080/api',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


let isAlertActive = false;

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const authStore = useAuthStore();

        if (error.response && error.response.status === 401) {
            if (router.currentRoute.value.path !== '/login') {

                authStore.logout();

                if (!isAlertActive) {
                    isAlertActive = true;

                    await Swal.fire({
                        title: 'Sesi Berakhir!',
                        text: 'Token Anda tidak valid atau sudah kedaluwarsa. Silakan login kembali.',
                        icon: 'warning',
                        confirmButtonColor: '#155dfc',
                        confirmButtonText: 'Login Sekarang',
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    }).then(() => {
                        isAlertActive = false;
                        router.push('/login');
                    });
                }
            }
        }

        return Promise.reject(error);
    }
);

export default api;
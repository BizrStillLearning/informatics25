import { defineStore } from 'pinia';
import api from '../api/axios';
import router from '../router';
import Swal from 'sweetalert2';

export const useAuthStore = defineStore('auth', {
    state: () => {
        const getInitialProfile = () => {
            try {
                const data = localStorage.getItem('profile');
                return data ? JSON.parse(data) : null;
            } catch (e) {
                return null;
            }
        };

        return {
            token: localStorage.getItem('token') || null,
            role: localStorage.getItem('role') || null,
            profile: getInitialProfile(),
            authTimer: null,
        };
    },

    getters: {
        isAuthenticated: (state) => !!state.token,
    },

    actions: {
        async login(username, password) {
            try {
                const response = await api.post('/login', { username, password });

                if (response.data.status) {
                    const userRole = response.data.user?.role || response.data.role;

                    this.token = response.data.token;
                    this.role = userRole;
                    this.profile = response.data.profile;

                    localStorage.setItem('token', this.token);
                    localStorage.setItem('role', this.role);
                    localStorage.setItem('profile', JSON.stringify(this.profile));

                    this.setAutoLogout(30000);

                    return { success: true, role: this.role };
                }
                return { success: false, message: response.data.message };
            } catch (err) {
                console.error("Login Error:", err);
                return {
                    success: false,
                    message: err.response?.data?.message || 'Gagal terhubung ke server.'
                };
            }
        },

        setAutoLogout(duration) {
            if (this.authTimer) clearTimeout(this.authTimer);

            this.authTimer = setTimeout(() => {
                this.handleSessionExpired();
            }, duration);
        },

        async handleSessionExpired() {
            if (this.token) {
                await Swal.fire({
                    title: 'Sesi Berakhir',
                    text: 'Waktu sesi Anda telah habis (30 detik). Silakan login kembali.',
                    icon: 'info',
                    confirmButtonText: 'OK',
                    allowOutsideClick: false
                });
                this.logout();
                router.push('/login');
            }
        },

        async checkSessionAPI() {
            try {
                const response = await api.get('/check-session');
                if (!response.data.status) {
                    this.logout();
                    return false;
                }
                return true;
            } catch (err) {
                this.logout();
                return false;
            }
        },

        logout() {
            if (this.authTimer) clearTimeout(this.authTimer);

            this.token = null;
            this.role = null;
            this.profile = null;
            this.authTimer = null;

            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('profile');
        },
    }
});
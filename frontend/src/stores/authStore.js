import { defineStore } from 'pinia';
import api from '../api/axios';
import router from '../router';
import Swal from 'sweetalert2';

export const useAuthStore = defineStore('auth', {
    state: () => {
        const getStorageJSON = (key) => {
            try {
                const data = localStorage.getItem(key);
                return data ? JSON.parse(data) : null;
            } catch (e) {
                return null;
            }
        };

        return {
            token: localStorage.getItem('token') || null,
            role: localStorage.getItem('role') || null,
            username: localStorage.getItem('username') || null,
            user: getStorageJSON('user'),
            profile: getStorageJSON('profile'),
            authTimer: null,
        };
    },

    getters: {
        isAuthenticated: (state) => !!state.token,
    },

    actions: {
        async login(username, password) {
            try {
                // Sesuai route Go: r.POST("/api/auth/login", ...)
                const response = await api.post('/auth/login', { username, password });

                if (response.data.status) {
                    const userData = response.data.user;
                    const profileData = response.data.profile || null;
                    const userToken = response.data.token;

                    // Go mengirim role dalam userData
                    const userRole = (userData?.role || '').toLowerCase();
                    const userLoginName = userData?.username || username;

                    // Update State
                    this.token = userToken;
                    this.role = userRole;
                    this.username = userLoginName;
                    this.user = userData;
                    this.profile = profileData;

                    // Update LocalStorage
                    localStorage.setItem('token', userToken);
                    localStorage.setItem('role', userRole);
                    localStorage.setItem('username', userLoginName);
                    localStorage.setItem('user', JSON.stringify(userData));
                    localStorage.setItem('profile', JSON.stringify(profileData));

                    // Set Auto Logout (default 24 jam jika tidak ada expires_in)
                    const duration = response.data.expires_in || 86400;
                    this.setAutoLogout(duration * 1000);

                    return { success: true, role: this.role };
                }
                return { success: false, message: response.data.message || 'Login gagal' };
            } catch (err) {
                console.error("Login Error:", err);
                return {
                    success: false,
                    message: err.response?.data?.message || 'Gagal terhubung ke server backend.'
                };
            }
        },

        async checkSessionAPI() {
            try {
                const response = await api.get('/system/check-session');

                if (response.data.status && response.data.user) {
                    const userData = response.data.user;
                    const userRole = (userData.role || '').toLowerCase();

                    this.user = userData;
                    this.username = userData.username;
                    this.role = userRole;
                    if (response.data.profile) this.profile = response.data.profile;

                    localStorage.setItem('user', JSON.stringify(userData));
                    localStorage.setItem('username', userData.username);
                    localStorage.setItem('role', userRole);

                    if (response.data.profile) {
                        localStorage.setItem('profile', JSON.stringify(response.data.profile));
                    }

                    return true;
                }

                this.logout();
                return false;
            } catch (err) {
                console.error("Check Session Error:", err);
                if (err.response?.status === 401) {
                    this.logout();
                }
                return false;
            }
        },

        setAutoLogout(duration) {
            if (this.authTimer) clearTimeout(this.authTimer);
            if (duration > 0) {
                this.authTimer = setTimeout(() => {
                    this.handleSessionExpired();
                }, duration);
            }
        },

        async handleSessionExpired() {
            if (this.token) {
                this.logout();
                await Swal.fire({
                    title: 'Sesi Berakhir',
                    text: 'Sesi Anda telah habis. Silakan login kembali.',
                    icon: 'info',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#155dfc',
                });
            }
        },

        logout() {
            if (this.authTimer) clearTimeout(this.authTimer);

            this.token = null;
            this.role = null;
            this.username = null;
            this.user = null;
            this.profile = null;
            this.authTimer = null;

            localStorage.clear();
            router.push('/login');
        },
    }
});
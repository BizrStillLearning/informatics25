import { defineStore } from 'pinia';
import api from '../api/axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        role: localStorage.getItem('role') || null,
        profile: JSON.parse(localStorage.getItem('profile')) || null, // Parse JSON string
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
    },

    actions: {
        async login(username, password) {
            try {
                const response = await api.post('/login.php', { username, password });

                if (response.data.status) {
                    // 1. Update State
                    this.token = response.data.token;
                    this.role = response.data.role;
                    this.profile = response.data.profile;

                    // 2. Simpan ke LocalStorage
                    localStorage.setItem('token', this.token);
                    localStorage.setItem('role', this.role);
                    localStorage.setItem('profile', JSON.stringify(this.profile));

                    return { success: true, role: this.role };
                }
                return { success: false, message: response.data.message };
            } catch (err) {
                return {
                    success: false,
                    message: err.response?.data?.message || 'Gagal terhubung ke server.'
                };
            }
        },

        logout() {
            this.token = null;
            this.role = null;
            this.profile = null;
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('profile');
        }
    }
});
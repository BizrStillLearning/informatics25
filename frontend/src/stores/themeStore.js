import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
    state: () => {
        const savedTheme = localStorage.getItem('theme');

        return {
            isDark: savedTheme ? savedTheme === 'dark' : true
        };
    },
    actions: {
        toggleTheme() {
            this.isDark = !this.isDark;
            this.applyTheme();
        },
        applyTheme() {
            if (this.isDark) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        },
        initTheme() {
            this.applyTheme();
        }
    }
});
import { defineStore } from 'pinia';
import i18n from '../i18n';

export const useLangStore = defineStore('lang', {
    state: () => ({
        currentLocale: localStorage.getItem('user-lang') || 'ID'
    }),
    actions: {
        setLanguage(langCode) {
            this.currentLocale = langCode;
            i18n.global.locale.value = langCode;
            localStorage.setItem('user-lang', langCode);
        }
    }
});
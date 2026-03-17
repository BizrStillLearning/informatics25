<script setup>
import { ref, onMounted, computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import {
  Menu, X, GraduationCap, Moon, Sun,
  LayoutDashboard, Languages, ChevronDown
} from 'lucide-vue-next';
import { useThemeStore } from "../stores/themeStore.js";
import { useLangStore } from "../stores/langStore.js";

const themeStore = useThemeStore();
const langStore = useLangStore();
const { t } = useI18n();
const route = useRoute();

const isOpen = ref(false);
const isLangOpen = ref(false);

const navLinks = [
  { name: 'home', path: '/' },
  { name: 'students', path: '/students' },
  { name: 'event', path: '/events' },
];

const languages = [
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'EN', name: 'English', flag: '🇺🇸' },
  { code: 'AR', name: 'العربية', flag: '🇸🇦' },
  { code: 'JP', name: '日本語', flag: '🇯🇵' },
  { code: 'CN', name: '中文', flag: '🇨🇳' },
  { code: 'KR', name: '한국어', flag: '🇰🇷' },
];

const currentLang = computed(() =>
    languages.find(l => l.code === langStore.currentLocale) || languages[0]
);

const selectLang = (lang) => {
  langStore.setLanguage(lang.code);
  isLangOpen.value = false;
};

const closeMenu = () => { isOpen.value = false; };
const isActive = (path) => route.path === path;

onMounted(() => {
  window.addEventListener('click', (e) => {
    if (!e.target.closest('.lang-picker')) isLangOpen.value = false;
  });
});
</script>

<template>
  <nav class="bg-white/80 dark:bg-primary-950/80 backdrop-blur-md sticky top-0 z-[100] border-b border-primary-100 dark:border-primary-800 shadow-sm nav-transition">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-20">

        <div class="flex items-center">
          <RouterLink to="/" class="flex items-center gap-2 group">
            <div class="bg-secondary-600 dark:bg-dark-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-500 shadow-lg shadow-secondary-600/20 dark:shadow-dark-600/20">
              <GraduationCap class="h-6 w-6 text-white" />
            </div>
            <span class="font-black text-xl tracking-tighter text-primary-900 dark:text-white uppercase">
                Informatics<span class="text-secondary-600 dark:text-dark-600 italic">25</span>
            </span>
          </RouterLink>
        </div>

        <div class="hidden md:flex items-center">
          <div class="flex items-center space-x-2 mr-6">
            <RouterLink
                v-for="link in navLinks"
                :key="link.path"
                :to="link.path"
                class="relative px-4 py-2 text-sm font-bold tracking-tight transition-all duration-300 uppercase"
                :class="isActive(link.path)
                  ? 'text-secondary-600 dark:text-dark-600'
                  : 'text-primary-500 dark:text-primary-400 hover:text-secondary-600 dark:hover:text-dark-600'"
            >
              {{ t(`nav.${link.name}`) }}
              <span v-if="isActive(link.path)" class="absolute bottom-0 left-0 w-full h-0.5 bg-secondary-600 dark:bg-dark-600 rounded-full"></span>
            </RouterLink>
          </div>

          <div class="h-6 w-[1px] bg-primary-200 dark:bg-primary-800 mx-4"></div>

          <div class="relative lang-picker mr-2">
            <button
                @click="isLangOpen = !isLangOpen"
                class="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary-50/50 dark:bg-primary-900 border border-primary-100 dark:border-primary-700 hover:border-secondary-600/50 dark:hover:border-dark-600/50 transition-all active:scale-95 group"
            >
              <Languages class="w-4 h-4 text-secondary-600 dark:text-dark-600" />
              <span class="text-[10px] font-black uppercase tracking-widest text-primary-700 dark:text-primary-300">{{ currentLang.code }}</span>
              <ChevronDown class="w-3 h-3 text-primary-400 group-hover:rotate-180 transition-transform duration-300" />
            </button>

            <transition v-motion :initial="{ opacity: 0, y: 10, scale: 0.95 }" :enter="{ opacity: 1, y: 0, scale: 1 }">
              <div v-if="isLangOpen" class="lang-dropdown border border-primary-100 dark:border-primary-800 bg-white dark:bg-primary-900 shadow-2xl">
                <div class="p-2 space-y-1">
                  <button
                      v-for="lang in languages"
                      :key="lang.code"
                      @click="selectLang(lang)"
                      class="lang-item w-full rounded-lg"
                      :class="currentLang.code === lang.code
                        ? 'bg-secondary-50 text-secondary-600 dark:bg-dark-900 dark:text-dark-400'
                        : 'text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-800'"
                  >
                    <span class="text-lg">{{ lang.flag }}</span>
                    <span class="uppercase tracking-tight text-[11px] font-black">{{ lang.name }}</span>
                  </button>
                </div>
              </div>
            </transition>
          </div>

          <button
              @click="themeStore.toggleTheme()"
              class="mr-4 p-2.5 rounded-xl bg-primary-50 dark:bg-primary-800 text-primary-600 dark:text-dark-400 hover:ring-2 hover:ring-secondary-600/20 dark:hover:ring-dark-600/20 transition-all active:scale-90"
          >
            <Sun v-if="themeStore.isDark" class="w-5 h-5" />
            <Moon v-else class="w-5 h-5" />
          </button>

          <RouterLink
              to="/login"
              class="flex items-center gap-2 bg-primary-900 dark:bg-dark-600 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-800 dark:hover:bg-dark-700 transition-all shadow-xl shadow-secondary-600/10 dark:shadow-dark-600/20 active:scale-95"
          >
            <LayoutDashboard class="w-4 h-4" />
            {{ t('nav.admin') }}
          </RouterLink>
        </div>

        <div class="flex items-center md:hidden gap-3">
          <button @click="isLangOpen = !isLangOpen" class="p-2 rounded-lg bg-primary-50 dark:bg-primary-800 text-secondary-600 dark:text-dark-400 font-black text-xs">{{ currentLang.code }}</button>
          <button @click="themeStore.toggleTheme()" class="p-2 rounded-lg bg-primary-50 dark:bg-primary-800 text-primary-600 dark:text-amber-400">
            <Sun v-if="themeStore.isDark" class="w-5 h-5" />
            <Moon v-else class="w-5 h-5" />
          </button>
          <button @click="isOpen = !isOpen" class="p-2 text-primary-600 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-800 rounded-lg transition-colors">
            <component :is="isOpen ? X : Menu" class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>

    <Transition v-motion :initial="{ opacity: 0, y: -20 }" :enter="{ opacity: 1, y: 0 }">
      <div v-if="isOpen" class="md:hidden bg-white dark:bg-primary-950 border-t border-primary-100 dark:border-primary-800 shadow-2xl">
        <div class="px-4 py-6 space-y-2">
          <RouterLink
              v-for="link in navLinks" :key="link.path" :to="link.path" @click="closeMenu"
              class="block px-5 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all"
              :class="isActive(link.path)
                ? 'bg-secondary-50 dark:bg-dark-600/10 text-secondary-600 dark:text-dark-600'
                : 'text-primary-600 dark:text-primary-400'"
          >
            {{ t(`nav.${link.name}`) }}
          </RouterLink>
          <div class="pt-4 border-t border-primary-100 dark:border-primary-800 space-y-4">
            <div class="grid grid-cols-3 gap-2">
              <button v-for="lang in languages" :key="lang.code" @click="selectLang(lang)" class="py-3 bg-primary-50 dark:bg-primary-900 rounded-xl text-xs font-black text-primary-700 dark:text-primary-300 flex items-center justify-center gap-2">
                {{ lang.flag }} {{ lang.code }}
              </button>
            </div>
            <RouterLink to="/login" @click="closeMenu"
                        class="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white bg-primary-900 dark:bg-dark-600 active:scale-95 transition-all shadow-lg shadow-primary-900/20">
              <LayoutDashboard class="w-5 h-5" /> {{ t('nav.admin') }}
            </RouterLink>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>
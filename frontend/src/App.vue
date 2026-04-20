<script setup>
import { ref, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useThemeStore } from "./stores/themeStore.js";
import { useAuthStore } from "./stores/authStore.js";

const authStore = useAuthStore();
const isLoading = ref(false);
const router = useRouter();
const route = useRoute();
const themeStore = useThemeStore();
const { t, locale } = useI18n();

router.beforeEach((to, from, next) => {
  const hasSeenWelcome = sessionStorage.getItem('protocol_init');
  if (to.path === '/' && !hasSeenWelcome) {
    isLoading.value = false;
  } else {
    isLoading.value = true;
  }
  next();
});

router.afterEach(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 400);
});

onMounted(async () => {
  themeStore.applyTheme();
  const savedToken = localStorage.getItem('token');
  if (savedToken && authStore.isAuthenticated) {
    try { await authStore.checkSessionAPI(); } catch (err) { console.error(err); }
  }
  updateTitle();
});

const updateTitle = () => {
  const titleKey = route.meta.titleKey;
  document.title = titleKey ? `${t(titleKey)} - Informatics 25` : 'Informatics 25';
};

watch([locale, () => route.path], updateTitle);
</script>

<template>
  <div class="antialiased bg-white dark:bg-primary-950 min-h-screen selection:bg-secondary-600/30">

    <Transition
        enter-active-class="transition duration-300 ease-out"
        leave-active-class="transition duration-400 ease-in"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
    >
      <div v-if="isLoading" class="fixed inset-0 z-[9999] bg-white dark:bg-primary-950 flex flex-col items-center justify-center">
        <div class="relative flex items-center justify-center scale-75"> <div class="w-20 h-20 border-2 border-primary-100 dark:border-primary-800 rounded-full animate-[spin_4s_linear_infinite]"></div>
          <div class="absolute w-20 h-20 border-t-2 border-secondary-600 dark:border-dark-600 rounded-full animate-spin"></div>
          <span class="absolute text-[10px] font-black text-primary-900 dark:text-white tracking-widest uppercase">IF25</span>
        </div>
      </div>
    </Transition>

    <router-view v-slot="{ Component }">
      <transition
          mode="out-in"
          enter-active-class="transition duration-300 ease-out"
          leave-active-class="transition duration-200 ease-in"
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
      >
        <component :is="Component" />
      </transition>
    </router-view>

  </div>
</template>

<style>
.transition-all {
  transition-duration: 300ms !important;
}
</style>
<script setup>
import { ref,onMounted,watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Footer from "./components/Footer.vue";
import { useThemeStore } from "./stores/themeStore.js";

const isLoading = ref(false);
const router = useRouter();
const route = useRoute();
const themeStore = useThemeStore();
const { t, locale } = useI18n();

router.beforeEach((to, from, next) => {
  isLoading.value = true;
  next();
});

router.afterEach(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});

onMounted(() => {
  themeStore.applyTheme();
});

const updateTitle = () => {
  const titleKey = route.meta.titleKey;
  if (titleKey) {
    document.title = `${t(titleKey)} - Informatics 25`;
  } else {
    document.title = 'Informatics 25';
  }
};

watch(locale, () => {
  updateTitle();
});

watch(() => route.path, () => {
  updateTitle();
});
</script>

<template>
  <div class="antialiased bg-white dark:bg-primary-950 min-h-screen transition-colors duration-500 selection:bg-secondary-600 selection:text-white">

    <Transition
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1 }"
        :leave="{ opacity: 0, transition: { duration: 800 } }"
    >
      <div v-if="isLoading" class="fixed inset-0 z-[9999] bg-white dark:bg-primary-950 flex flex-col items-center justify-center">

        <div class="relative flex items-center justify-center">
          <div class="w-24 h-24 border-4 border-primary-100 dark:border-primary-800 rounded-3xl animate-[spin_3s_linear_infinite]"></div>

          <div class="absolute w-24 h-24 border-t-4 border-secondary-600 dark:border-dark-600 rounded-3xl animate-spin"></div>

          <div class="absolute flex items-center justify-center">
            <span class="text-xl font-black text-primary-900 dark:text-white animate-pulse tracking-tighter">
              IF<span class="text-secondary-600 dark:text-dark-600">25</span>
            </span>
          </div>
        </div>

        <div class="mt-8 flex flex-col items-center gap-2">
          <p class="text-[10px] font-black text-primary-900 dark:text-white uppercase tracking-[0.4em] animate-pulse">
            Initializing <span class="text-secondary-600 dark:text-dark-600 italic">System</span>
          </p>
          <div class="w-32 h-1 bg-primary-100 dark:bg-primary-900 rounded-full overflow-hidden">
            <div class="h-full bg-secondary-600 dark:bg-dark-600 animate-[loading-bar_1.5s_infinite]"></div>
          </div>
        </div>

        <div class="absolute w-64 h-64 bg-secondary-600/10 dark:bg-dark-600/10 rounded-full blur-[100px] animate-pulse"></div>
      </div>
    </Transition>

    <Navbar />

    <router-view v-slot="{ Component }">
      <transition
          v-motion
          :initial="{ opacity: 0, y: 15, filter: 'blur(10px)' }"
          :enter="{ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 600, ease: 'easeOut' } }"
          mode="out-in"
      >
        <component :is="Component" />
      </transition>

      <Footer />
    </router-view>

  </div>
</template>

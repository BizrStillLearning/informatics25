<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Share2,
  Maximize2,
  Info,
  X
} from 'lucide-vue-next';

import Image1 from '../assets/img/makrab/makrab1.jpg'
import Image2 from '../assets/img/makrab/makrab2.jpg'
import Image3 from '../assets/img/makrab/makrab3.jpg'
import Image4 from '../assets/img/makrab/makrab4.jpg'
import Image5 from '../assets/img/makrab/makrab5.jpg'
import Image6 from '../assets/img/makrab/makrab6.jpg'
import Image7 from '../assets/img/makrab/makrab7.jpg'
import MainLayout from "../components/layouts/landing/MainLayout.vue";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const slug = route.params.slug || 'makrab';

const isModalOpen = ref(false);
const selectedImage = ref('');

const eventDetail = computed(() => {
  const itemKey = slug.includes('makrab') ? 'makrab' : 'others';

  return {
    title: t(`galleryEventDetail.items.${itemKey}.title`),
    category: t(`galleryEventDetail.items.${itemKey}.category`),
    description: t(`galleryEventDetail.items.${itemKey}.desc`),
    date: '10 - 11 Januari 2026',
    location: 'Villa Guntur, Pacet',
    participants: '120 Mahasiswa',
    mainImage: Image1,
    gallery: [
      Image2,
      Image3,
      Image4,
      Image5,
      Image6,
      Image7,
    ]
  };
});

const openImage = (img) => {
  selectedImage.value = img;
  isModalOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  isModalOpen.value = false;
  document.body.style.overflow = 'auto';
};

const goBack = () => router.back();
</script>

<template>
  <MainLayout>
    <div class="bg-white dark:bg-primary-950 min-h-screen pb-20 transition-colors duration-500 selection:bg-secondary-600 selection:text-white">
      <section class="relative h-[60vh] md:h-[80vh] w-full overflow-hidden bg-primary-950">
        <div class="absolute inset-0 z-0">
          <img
              :src="eventDetail.mainImage"
              class="w-full h-full object-cover opacity-60 dark:opacity-40 scale-105"
              v-motion
              :initial="{ scale: 1.2, opacity: 0 }"
              :enter="{ scale: 1.05, opacity: 0.5, transition: { duration: 1500 } }"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-white dark:from-primary-950 via-transparent to-black/20 z-10"></div>
        </div>

        <div class="relative z-20 max-w-7xl mx-auto px-6 pt-10 flex justify-between items-center">
          <button
              @click="goBack"
              class="group flex items-center gap-3 bg-white/10 dark:bg-primary-900/40 backdrop-blur-xl border border-white/20 dark:border-primary-800 text-white px-6 py-3 rounded-2xl hover:bg-white hover:text-primary-900 transition-all duration-500 shadow-2xl"
          >
            <ArrowLeft class="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span class="text-[10px] font-black uppercase tracking-widest">{{ t('galleryEventDetail.back') }}</span>
          </button>

          <button class="w-12 h-12 bg-white/10 dark:bg-primary-900/40 backdrop-blur-xl border border-white/20 dark:border-primary-800 text-white rounded-2xl flex items-center justify-center hover:bg-secondary-600 transition-all duration-500 shadow-2xl">
            <Share2 class="w-5 h-5" />
          </button>
        </div>

        <div class="absolute bottom-0 left-0 w-full z-20 pb-12 md:pb-20">
          <div class="max-w-7xl mx-auto px-6">
            <div
                v-motion
                :initial="{ opacity: 0, y: 50 }"
                :enter="{ opacity: 1, y: 0, transition: { delay: 400, duration: 800 } }"
                class="max-w-4xl"
            >
              <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-1.5 bg-secondary-600 dark:bg-dark-600 rounded-full shadow-[0_0_15px_rgba(21,93,252,0.5)]"></div>
                <span class="text-secondary-600 dark:text-dark-400 font-black uppercase tracking-[0.4em] text-[10px]">
                {{ eventDetail.category }}
              </span>
              </div>
              <h1 class="text-5xl md:text-[5.5rem] font-black text-primary-900 dark:text-white leading-[0.9] tracking-tighter uppercase">
                {{ eventDetail.title }}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section class="max-w-7xl mx-auto px-6 mt-16 md:mt-24 relative z-20">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">

          <div class="lg:col-span-4 space-y-8 order-2 lg:order-1">
            <div
                v-motion
                :initial="{ opacity: 0, x: -30 }"
                :enter="{ opacity: 1, x: 0, transition: { delay: 600 } }"
                class="bg-primary-50/50 dark:bg-primary-900/20 backdrop-blur-md rounded-[3rem] p-10 border border-primary-100 dark:border-primary-800 space-y-10 shadow-sm"
            >
              <div class="flex items-center gap-5 group">
                <div class="w-14 h-14 bg-white dark:bg-primary-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500">
                  <Calendar class="w-7 h-7 text-secondary-600 dark:text-dark-400" />
                </div>
                <div class="flex flex-col">
                  <p class="text-[9px] text-primary-400 font-black uppercase tracking-widest mb-1">{{ t('galleryEventDetail.info.date') }}</p>
                  <p class="text-sm font-black text-primary-900 dark:text-primary-100 tracking-tight">{{ eventDetail.date }}</p>
                </div>
              </div>

              <div class="flex items-center gap-5 group">
                <div class="w-14 h-14 bg-white dark:bg-primary-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500">
                  <MapPin class="w-7 h-7 text-red-500 dark:text-red-400" />
                </div>
                <div class="flex flex-col">
                  <p class="text-[9px] text-primary-400 font-black uppercase tracking-widest mb-1">{{ t('galleryEventDetail.info.location') }}</p>
                  <p class="text-sm font-black text-primary-900 dark:text-primary-100 tracking-tight">{{ eventDetail.location }}</p>
                </div>
              </div>

              <div class="flex items-center gap-5 group">
                <div class="w-14 h-14 bg-white dark:bg-primary-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500">
                  <Users class="w-7 h-7 text-secondary-500 dark:text-dark-500" />
                </div>
                <div class="flex flex-col">
                  <p class="text-[9px] text-primary-400 font-black uppercase tracking-widest mb-1">{{ t('galleryEventDetail.info.participants') }}</p>
                  <p class="text-sm font-black text-primary-900 dark:text-primary-100 tracking-tight">{{ eventDetail.participants }}</p>
                </div>
              </div>
            </div>
          </div>

          <div
              v-motion
              :initial="{ opacity: 0, y: 30 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 800 } }"
              class="lg:col-span-8 order-1 lg:order-2 space-y-8"
          >
            <div class="flex items-center gap-4">
              <Info class="w-8 h-8 text-secondary-600 dark:text-dark-600" />
              <h2 class="text-3xl font-black text-primary-900 dark:text-white tracking-tighter uppercase">{{ t('galleryEventDetail.about') || t('galleryEventDetail.info.about') }}</h2>
            </div>

            <p class="text-primary-500 dark:text-primary-400 text-xl leading-relaxed font-medium">
              {{ eventDetail.description }}
            </p>

            <div class="pt-8 flex flex-wrap gap-4">
              <span class="px-5 py-2 bg-secondary-50 dark:bg-dark-900/20 text-secondary-600 dark:text-dark-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-secondary-100 dark:border-dark-800">#Informatika25</span>
              <span class="px-5 py-2 bg-primary-50 dark:bg-primary-900/40 text-primary-400 dark:text-primary-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary-100 dark:border-primary-800">#SolidaritasTanpaBatas</span>
            </div>
          </div>
        </div>
      </section>

      <section class="max-w-7xl mx-auto px-6 mt-32 relative">
        <div class="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div class="max-w-xl">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-1.5 bg-secondary-600 dark:bg-dark-600 rounded-full shadow-lg shadow-secondary-600/20"></div>
              <span class="text-secondary-600 dark:text-dark-400 font-black uppercase tracking-[0.4em] text-[10px]">{{ t('galleryEventDetail.visualArchive') }}</span>
            </div>
            <h2 class="text-4xl md:text-5xl font-black text-primary-900 dark:text-white tracking-tighter uppercase leading-none">
              {{ t('galleryEventDetail.items.makrab.title').split(' ')[0] }} <span class="text-secondary-600 dark:text-dark-600 italic">{{ t('galleryEventDetail.items.makrab.title').split(' ').slice(1).join(' ') }}</span>
            </h2>
          </div>
          <div class="bg-secondary-600 dark:bg-dark-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-secondary-600/20">
            {{ eventDetail.gallery.length }} {{ t('galleryEventDetail.totalPhotos') }}
          </div>
        </div>

        <div class="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          <div
              v-for="(img, idx) in eventDetail.gallery"
              :key="idx"
              v-motion
              :initial="{ opacity: 0, scale: 0.9 }"
              :visible="{ opacity: 1, scale: 1, transition: { delay: idx * 50 } }"
              class="relative group rounded-[2.5rem] overflow-hidden break-inside-avoid shadow-sm hover:shadow-2xl transition-all duration-700 cursor-pointer border-4 border-white dark:border-primary-800 bg-primary-100 dark:bg-primary-900"
              @click="openImage(img)"
          >
            <img :src="img" class="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110" />

            <div class="absolute inset-0 bg-secondary-600/30 dark:bg-dark-600/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
              <div class="w-16 h-16 bg-white dark:bg-primary-950 rounded-full flex items-center justify-center shadow-2xl transform scale-50 group-hover:scale-100 transition-all duration-500">
                <Maximize2 class="w-7 h-7 text-secondary-600 dark:text-dark-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Teleport to="body">
        <Transition name="fade">
          <div v-if="isModalOpen" class="fixed inset-0 z-[9999] flex items-center justify-center bg-primary-950/95 backdrop-blur-xl p-4 md:p-12" @click.self="closeModal">
            <button
                @click="closeModal"
                class="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 md:w-16 md:h-16 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all z-[10000] border border-white/10"
            >
              <X class="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <div class="relative max-w-5xl w-full h-full flex items-center justify-center">
              <img
                  :src="selectedImage"
                  class="max-w-full max-h-full object-contain rounded-2xl shadow-[0_0_100px_rgba(21,93,252,0.3)] select-none pointer-events-none"
              />
            </div>
          </div>
        </Transition>
      </Teleport>

    </div>
  </MainLayout>

</template>

<style scoped>
.columns-1 > div {
  margin-bottom: 2rem;
}

h1, h2 {
  letter-spacing: -0.05em;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  h1 {
    font-size: 3rem;
  }
}
</style>
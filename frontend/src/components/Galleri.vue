<script setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import {
  Search,
  Camera,
  Sparkles
} from 'lucide-vue-next';

import Gallery1 from '../assets/img/makrab/makrab1.jpg'
import Gallery2 from '../assets/img/ba/ba1.jpg';
import Gallery3 from '../assets/img/bukber/bukber1.jpg';

const { t } = useI18n();

const photos = [
  { id: 1, slug: 'makrab-angkatan-2025', title: 'Makrab Angkatan', category: 'Makrab', image: Gallery1 },
  { id: 2, slug: 'baitul-arqam-2026', title: 'BA Mahasiswa 2026', category: 'Kuliah', image: Gallery2 },
  { id: 3, slug: 'bukber-2026', title: 'Bukber 2026', category: 'Lain-lain', image: Gallery3 },
];

const categories = ['Semua', 'Makrab', 'Kuliah', 'Lain-lain'];
const activeCategory = ref('Semua');

const filteredPhotos = computed(() => {
  if (activeCategory.value === 'Semua') return photos;
  return photos.filter(photo => photo.category === activeCategory.value);
});
</script>

<template>
  <section id="gallery" class="py-16 md:py-32 bg-white dark:bg-primary-950 relative overflow-hidden transition-colors duration-500">

    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
      <div class="absolute top-1/4 -left-20 w-64 h-64 md:w-96 md:h-96 bg-secondary-100/20 dark:bg-dark-900/10 rounded-full blur-[80px] md:blur-[120px]"></div>
      <div class="absolute bottom-1/4 -right-20 w-64 h-64 md:w-96 md:h-96 bg-primary-200/20 dark:bg-primary-900/10 rounded-full blur-[80px] md:blur-[120px]"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 md:px-6 relative z-10">

      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12 md:mb-24">
        <div class="max-w-2xl">
          <div class="flex items-center gap-3 mb-4 md:mb-6">
            <div class="w-10 md:w-14 h-1 md:h-1.5 bg-secondary-600 dark:bg-dark-600 rounded-full"></div>
            <span class="text-secondary-600 dark:text-dark-400 font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-xs">
              {{ t('gallery.badge') }}
            </span>
          </div>
          <h2 class="text-4xl md:text-7xl font-black text-primary-900 dark:text-white leading-[0.9] tracking-tighter uppercase">
            {{ t('gallery.title_part1') }} <br/>
            <span class="text-secondary-600 dark:text-dark-600 italic">{{ t('gallery.title_highlight') }}</span>
          </h2>
        </div>

        <div class="w-full lg:w-auto overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
          <div class="flex flex-nowrap lg:flex-wrap gap-2 bg-primary-50/50 dark:bg-primary-900/50 backdrop-blur-xl p-1.5 md:p-2 rounded-2xl md:rounded-[2rem] border border-primary-100 dark:border-primary-800 shadow-inner w-max lg:w-full">
            <button
                v-for="cat in categories"
                :key="cat"
                @click="activeCategory = cat"
                class="whitespace-nowrap px-6 md:px-8 py-2.5 md:py-3 rounded-xl md:rounded-[1.2rem] font-black text-[9px] md:text-[10px] uppercase tracking-widest transition-all duration-500"
                :class="activeCategory === cat
                ? 'bg-secondary-600 dark:bg-dark-600 text-white shadow-lg'
                : 'text-primary-400 dark:text-primary-500 hover:text-primary-900 dark:hover:text-white'"
            >
              {{ cat }}
            </button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
        <RouterLink
            v-for="(photo, idx) in filteredPhotos"
            :key="photo.id"
            :to="`/gallery/${photo.slug}`"
            v-motion
            :initial="{ opacity: 0, scale: 0.95, y: 30 }"
            :visible="{ opacity: 1, scale: 1, y: 0, transition: { delay: idx * 50, duration: 800 } }"
            class="group relative h-[400px] md:h-[520px] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden bg-primary-900 border-[8px] md:border-[12px] border-white dark:border-primary-900 shadow-xl md:shadow-2xl hover:-translate-y-2 md:hover:-translate-y-4 transition-all duration-700 block"
        >
          <div class="w-full h-full bg-primary-100 dark:bg-primary-950 flex items-center justify-center overflow-hidden">
            <img
                :src="photo.image"
                class="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-90 group-hover:opacity-100"
                :alt="photo.title"
                loading="lazy"
            />
          </div>

          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500"></div>

          <div class="absolute top-4 md:top-8 left-4 md:left-8 z-20">
            <div class="bg-white/10 backdrop-blur-md border border-white/20 px-3 md:px-5 py-1.5 md:py-2 rounded-xl md:rounded-2xl flex items-center gap-2">
              <Camera class="w-3 h-3 md:w-4 md:h-4 text-secondary-400 dark:text-dark-400" />
              <span class="text-[8px] md:text-[10px] font-black text-white uppercase tracking-widest">{{ photo.category }}</span>
            </div>
          </div>

          <div class="absolute bottom-0 left-0 w-full p-6 md:p-12 z-20">
            <div class="flex items-center justify-between gap-4">
              <div class="w-full translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 transition-transform duration-700">
                <h3 class="text-white text-xl md:text-3xl font-black tracking-tighter uppercase leading-none">{{ photo.title }}</h3>
              </div>

              <div class="hidden sm:flex w-10 h-10 md:w-14 md:h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl md:rounded-3xl items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-700 transform scale-50 group-hover:scale-100 group-hover:rotate-12 shrink-0">
                <Search class="w-5 h-5 md:w-6 md:h-6" />
              </div>
            </div>
          </div>
        </RouterLink>
      </div>

      <div v-if="filteredPhotos.length === 0" class="py-20 md:py-40 text-center">
        <div class="w-16 h-16 md:w-20 md:h-20 bg-primary-50 dark:bg-primary-900 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-inner">
          <Sparkles class="w-8 h-8 md:w-10 md:h-10 text-primary-200 dark:text-primary-700 animate-pulse" />
        </div>
        <p class="text-primary-400 dark:text-primary-600 font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs">
          {{ t('gallery.empty') }}
        </p>
      </div>

    </div>
  </section>
</template>

<style scoped>
h2 { letter-spacing: -0.06em; }

/* Menghilangkan scrollbar tapi tetap bisa scroll */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
import {
  MoveRight,
  Users,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Music2,
  Play,
  Pause,
  Image as ImageIcon,
  Briefcase,
  CalendarDays
} from 'lucide-vue-next';

// Styles Swiper
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const modules = [Autoplay, EffectFade, Pagination, Navigation];

const audioPlayer = ref(null);
const isPlaying = ref(false);

const musicUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

const slides = [
  { image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070' },
  { image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2069' },
  { image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070' }
];

const stats = [
  { label: 'Mahasiswa', value: '120+', icon: Users, color: 'text-blue-500' },
  { label: 'Kegiatan', value: '45+', icon: CalendarDays, color: 'text-purple-500' },
  { label: 'Project', value: '30+', icon: Briefcase, color: 'text-cyan-500' },
];

const toggleMusic = () => {
  if (isPlaying.value) {
    audioPlayer.value.pause();
  } else {
    audioPlayer.value.play();
  }
  isPlaying.value = !isPlaying.value;
};
</script>

<template>
  <div class="bg-white min-h-screen">
    <section class="relative h-[92vh] w-full overflow-hidden bg-black group">
      <audio ref="audioPlayer" :src="musicUrl" loop></audio>

      <div class="absolute inset-0 z-0">
        <swiper
            :modules="modules"
            :effect="'fade'"
            :speed="1500"
            :loop="true"
            :autoplay="{ delay: 5000, disableOnInteraction: false }"
            :pagination="{ clickable: true }"
            :navigation="{ prevEl: '.prev-btn', nextEl: '.next-btn' }"
            class="h-full w-full"
        >
          <swiper-slide v-for="(slide, index) in slides" :key="index">
            <div class="relative h-full w-full">
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60 z-10"></div>
              <img :src="slide.image" class="h-full w-full object-cover scale-105" />
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <div class="relative z-50 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-center lg:items-start text-center lg:text-left -mt-20">
        <div
            v-motion
            :initial="{ opacity: 0, x: -30 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 800 } }"
            class="max-w-3xl"
        >
          <div class="inline-flex items-center gap-2 bg-blue-600/30 border border-blue-400/40 text-blue-200 px-4 py-2 rounded-full mb-8 backdrop-blur-md">
            <Sparkles class="w-4 h-4 animate-pulse" />
            <span class="text-xs font-bold uppercase tracking-[0.2em]">Informatics Class of 25</span>
          </div>

          <h1 class="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 drop-shadow-2xl">
            The Golden <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 uppercase tracking-tighter">
              Generation
            </span>
          </h1>

          <p class="text-gray-300 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed font-medium drop-shadow-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias hic ipsum nam repellendus similique!
          </p>

          <div class="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
            <button class="w-full sm:w-auto flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-blue-600/40 hover:-translate-y-1 active:scale-95">
              <Users class="w-6 h-6" />
              Lihat Mahasiswa
              <MoveRight class="w-5 h-5 ml-2" />
            </button>

            <button class="w-full sm:w-auto flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white border border-white/30 px-10 py-5 rounded-2xl font-bold text-lg transition-all hover:-translate-y-1 active:scale-95 shadow-lg">
              <ImageIcon class="w-6 h-6" />
              Galeri Angkatan
            </button>
          </div>
        </div>
      </div>

      <div class="absolute inset-0 z-[60] pointer-events-none flex items-center justify-between px-6">
        <button class="prev-btn pointer-events-auto w-14 h-14 rounded-full bg-black/20 backdrop-blur-md text-white border border-white/10 flex items-center justify-center hover:bg-blue-600 transition-all opacity-0 group-hover:opacity-100">
          <ChevronLeft class="w-8 h-8" />
        </button>
        <button class="next-btn pointer-events-auto w-14 h-14 rounded-full bg-black/20 backdrop-blur-md text-white border border-white/10 flex items-center justify-center hover:bg-blue-600 transition-all opacity-0 group-hover:opacity-100">
          <ChevronRight class="w-8 h-8" />
        </button>
      </div>

      <div
          @click="toggleMusic"
          class="absolute bottom-32 right-8 z-[70] flex items-center gap-4 bg-black/50 backdrop-blur-2xl p-4 rounded-3xl border border-white/10 cursor-pointer hover:bg-black/70 transition-all shadow-2xl"
      >
        <div
            class="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg transition-all shadow-blue-500/30"
            :class="{ 'animate-spin-slow': isPlaying }"
        >
          <Pause v-if="isPlaying" class="w-6 h-6 text-white" />
          <Play v-else class="w-6 h-6 text-white ml-1" />
        </div>
        <div class="hidden sm:block pr-4 text-left">
          <p class="text-[10px] text-blue-400 font-black uppercase tracking-widest leading-none mb-1">Background Music</p>
          <p class="text-sm text-white font-bold">Lagu Angkatan 25</p>
        </div>
      </div>

      <div class="absolute bottom-0 left-0 w-full z-40 pointer-events-none">
        <svg class="w-full h-[80px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.23,103.19,114.4,117.29,172,118.71c57.59,1.42,114.44-12.79,149.39-22.27Z" fill="#ffffff"></path>
        </svg>
      </div>
    </section>

    <section class="py-24 bg-white relative z-50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div
              v-for="(item, idx) in stats"
              :key="idx"
              v-motion
              :initial="{ opacity: 0, y: 30 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: idx * 200 } }"
              class="group p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 flex flex-col items-center text-center hover:bg-white hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] transition-all duration-500"
          >
            <div class="w-20 h-20 rounded-3xl bg-white shadow-md flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <component :is="item.icon" :class="['w-10 h-10', item.color]" />
            </div>
            <h3 class="text-5xl font-black text-gray-900 mb-3 tracking-tight">{{ item.value }}</h3>
            <p class="text-gray-400 font-bold uppercase tracking-widest text-xs">{{ item.label }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.animate-spin-slow {
  animation: spin 12s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Pagination Dots */
:deep(.swiper-pagination) {
  bottom: 120px !important;
  z-index: 80 !important;
}

:deep(.swiper-pagination-bullet) {
  background: white !important;
  opacity: 0.2;
  width: 10px;
  height: 10px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

:deep(.swiper-pagination-bullet-active) {
  background: #3b82f6 !important;
  width: 32px;
  border-radius: 10px;
  opacity: 1;
}
</style>
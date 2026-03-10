<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, EffectCreative, Pagination, Navigation } from 'swiper/modules';
import {
  Users,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Image as ImageIcon,
  Sparkles,
  MousePointer2
} from 'lucide-vue-next';

// Styles Swiper
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const { t, tm, rt } = useI18n();
const modules = [Autoplay, EffectCreative, Pagination, Navigation];

const audioPlayer = ref(null);
const isPlaying = ref(false);
const activeIndex = ref(0);

const musicUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

const slideImages = [
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070',
  'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2069',
  'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070'
];

const slides = computed(() => {
  const messages = tm('hero.slides');
  return messages.map((item, index) => ({
    image: slideImages[index],
    title: rt(item.title),
    subtitle: rt(item.subtitle)
  }));
});

const onSlideChange = (swiper) => {
  activeIndex.value = swiper.realIndex;
};

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
  <div class="bg-white min-h-screen w-full overflow-x-hidden font-sans selection:bg-blue-600 selection:text-white">
    <section class="relative h-[90vh] md:h-screen w-full overflow-hidden bg-[#070707] group/hero">
      <audio ref="audioPlayer" :src="musicUrl" loop></audio>

      <div class="absolute inset-0 z-0 pointer-events-none">
        <transition name="fade-bg">
          <img
              :key="activeIndex"
              :src="slides[activeIndex]?.image"
              class="h-full w-full object-cover opacity-20 blur-sm scale-110 transition-all duration-1000"
          />
        </transition>
        <div class="absolute inset-0 bg-black/60"></div>
      </div>

      <swiper
          @slideChange="onSlideChange"
          :grabCursor="true"
          :effect="'creative'"
          :creativeEffect="{
            limitProgress: 2,
            prev: {
              shadow: true,
              origin: 'left center',
              translate: ['-10%', 0, -200],
              rotate: [0, 100, 0],
              opacity: 1 // Tetap terlihat penuh agar tidak hitam
            },
            next: {
              origin: 'right center',
              translate: ['10%', 0, -200],
              rotate: [0, -100, 0],
              opacity: 0 // Muncul bertahap
            },
          }"
          :speed="2500"
          :loop="true"
          :modules="modules"
          :autoplay="{ delay: 5000, disableOnInteraction: false }"
          :pagination="{ clickable: true, dynamicBullets: true }"
          :navigation="{ prevEl: '.custom-prev', nextEl: '.custom-next' }"
          class="h-full w-full main-hero-swiper z-10"
      >
        <swiper-slide v-for="(slide, index) in slides" :key="index">
          <div class="relative h-full w-full flex items-center justify-center px-6 md:px-10 overflow-hidden">
            <div class="absolute inset-0 z-0 pointer-events-none transition-all duration-[4000ms] ease-out"
                 :class="activeIndex === index ? 'scale-100 opacity-60' : 'scale-150 opacity-100'">
              <img :src="slide.image" class="h-full w-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black"></div>
            </div>

            <div class="relative z-10 text-center w-full max-w-7xl mx-auto pointer-events-none">
              <div
                  v-motion
                  :initial="{ opacity: 0, scale: 0.8 }"
                  :enter="{ opacity: 1, scale: 1, transition: { delay: 1000, duration: 800 } }"
                  class="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-blue-400 px-5 py-2 rounded-full mb-6 md:mb-10 backdrop-blur-xl"
              >
                <Sparkles class="w-4 h-4 animate-pulse" />
                <span class="text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">{{ slide.subtitle }}</span>
              </div>

              <h1
                  v-motion
                  :initial="{ opacity: 0, y: 50, rotateX: -45 }"
                  :enter="{ opacity: 1, y: 0, rotateX: 0, transition: { delay: 1200, duration: 1200 } }"
                  class="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black text-white leading-none mb-8 md:mb-12 tracking-tighter uppercase pointer-events-auto"
              >
                {{ slide.title }}
              </h1>

              <div
                  v-motion
                  :initial="{ opacity: 0, y: 30 }"
                  :enter="{ opacity: 1, y: 0, transition: { delay: 1500 } }"
                  class="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 pointer-events-auto"
              >
                <button class="w-full sm:w-auto flex items-center justify-center gap-4 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 md:px-12 md:py-6 rounded-2xl font-bold text-sm md:text-xl transition-all shadow-[0_20px_50px_rgba(37,99,235,0.3)] active:scale-95 uppercase tracking-tighter">
                  <Users class="w-5 h-5 md:w-6 md:h-6" />
                  {{ t('hero.buttons.students') }}
                </button>
                <button class="w-full sm:w-auto flex items-center justify-center gap-4 bg-white/5 hover:bg-white/10 backdrop-blur-2xl text-white border border-white/10 px-8 py-4 md:px-12 md:py-6 rounded-2xl font-bold text-sm md:text-xl transition-all active:scale-95 uppercase tracking-tighter">
                  <ImageIcon class="w-5 h-5 md:w-6 md:h-6" />
                  {{ t('hero.buttons.gallery') }}
                </button>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>

      <div class="absolute inset-x-0 bottom-24 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-50 pointer-events-none flex justify-center md:justify-between px-6 md:px-10 gap-4 md:gap-0">
        <button class="custom-prev pointer-events-auto w-14 h-14 md:w-18 md:h-18 rounded-full bg-white/5 backdrop-blur-md text-white border border-white/10 flex items-center justify-center hover:bg-blue-600 transition-all shadow-2xl group/btn active:scale-90 md:opacity-0 group-hover/hero:opacity-100">
          <ChevronLeft class="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <button class="custom-next pointer-events-auto w-14 h-14 md:w-18 md:h-18 rounded-full bg-white/5 backdrop-blur-md text-white border border-white/10 flex items-center justify-center hover:bg-blue-600 transition-all shadow-2xl group/btn active:scale-90 md:opacity-0 group-hover/hero:opacity-100">
          <ChevronRight class="w-6 h-6 md:w-8 md:h-8" />
        </button>
      </div>

      <div @click="toggleMusic" class="absolute bottom-8 right-6 md:bottom-12 md:right-12 z-50 flex items-center gap-4 bg-black/40 backdrop-blur-3xl p-3 md:p-4 rounded-[2.5rem] border border-white/10 cursor-pointer hover:bg-black/60 transition-all shadow-2xl group/music">
        <div class="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]" :class="{ 'animate-spin-slow': isPlaying }">
          <Pause v-if="isPlaying" class="w-5 h-5 text-white" />
          <Play v-else class="w-5 h-5 text-white ml-0.5" />
        </div>
        <div class="hidden sm:block text-left pr-4 select-none">
          <p class="text-[10px] text-blue-400 font-bold uppercase tracking-[0.2em] mb-1.5 leading-none">
            {{ t('hero.music.status') }}
          </p>
          <p class="text-[11px] md:text-xs text-white font-black uppercase tracking-wide leading-none">
            {{ t('hero.music.name') }}
          </p>
        </div>
      </div>

      <div class="absolute bottom-0 left-0 w-full z-20 pointer-events-none">
        <svg class="w-full h-[50px] md:h-[100px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.23,103.19,114.4,117.29,172,118.71c57.59,1.42,114.44-12.79,149.39-22.27Z" fill="#ffffff"></path>
        </svg>
      </div>

      <div class="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-2 text-white/30 animate-bounce">
        <span class="text-[10px] font-bold uppercase tracking-widest">Scroll</span>
        <MousePointer2 class="w-4 h-4" />
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

/* Transisi Base Background */
.fade-bg-enter-active, .fade-bg-leave-active {
  transition: opacity 1.5s ease;
}
.fade-bg-enter-from, .fade-bg-leave-to {
  opacity: 0;
}

:deep(.swiper-pagination) {
  bottom: 40px !important;
  z-index: 60 !important;
}

@media (min-width: 768px) {
  :deep(.swiper-pagination) {
    bottom: 80px !important;
  }
}

:deep(.swiper-pagination-bullet) {
  background: white !important;
  opacity: 0.2;
  width: 10px;
  height: 10px;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

:deep(.swiper-pagination-bullet-active) {
  background: #3b82f6 !important;
  width: 35px;
  border-radius: 20px;
  opacity: 1;
}
</style>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import emblaCarouselVue from 'embla-carousel-vue';
import Autoplay from 'embla-carousel-autoplay';
import {
  Users, Image as ImageIcon, Terminal, ChevronLeft,
  ChevronRight, Activity, MapPin, Clock, Sun
} from 'lucide-vue-next';

// Assets
import Slider1 from '../assets/img/swiper/slider1.jpg';
import Slider2 from '../assets/img/swiper/slider2.jpg';
import Slider3 from '../assets/img/swiper/slider3.jpg';
import Slider4 from '../assets/img/swiper/slider4.jpg';

const props = defineProps({
  typedText: { type: String, default: '' }
});

const { t, tm, rt } = useI18n();
const slideImages = [Slider1, Slider2, Slider3, Slider4];

// Embla Setup
const [emblaRef, emblaApi] = emblaCarouselVue({
  loop: true,
  duration: 30,
  dragFree: true
}, [Autoplay({ delay: 8000, stopOnInteraction: false })]);

const selectedIndex = ref(0);

// Real-time Clock Logic
const currentTime = ref('');
const updateClock = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
};

let clockInterval;
onMounted(() => {
  if (emblaApi.value) emblaApi.value.on('select', () => {
    selectedIndex.value = emblaApi.value.selectedScrollSnap();
  });

  updateClock();
  clockInterval = setInterval(updateClock, 1000);
});

onUnmounted(() => {
  clearInterval(clockInterval);
});

const slides = computed(() => {
  const messages = tm('hero.slides');
  if (!Array.isArray(messages)) return [];
  return messages.map((item, index) => ({
    image: slideImages[index] || slideImages[0],
    title: rt(item.title)
  }));
});
</script>

<template>
  <div class="relative h-full w-full bg-primary-950 p-4 md:p-8 flex items-center justify-center">

    <div class="absolute top-12 left-12 z-50 pointer-events-none hidden xl:block">
      <div class="bg-black/40 backdrop-blur-xl border border-white/10 p-5 rounded-[1.5rem] shadow-2xl flex flex-col gap-4 min-w-[220px]">
        <div class="flex items-center gap-3">
          <div class="p-2 bg-emerald-500/20 rounded-lg">
            <MapPin class="w-4 h-4 text-emerald-500" />
          </div>
          <div class="flex flex-col text-left">
            <span class="text-[9px] font-black text-white/40 uppercase tracking-widest">Region_Node</span>
            <span class="text-xs font-bold text-white uppercase">Mulyorejo, Surabaya</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
          <div class="flex flex-col text-left">
            <div class="flex items-center gap-1.5 mb-1">
              <Clock class="w-3 h-3 text-secondary-400" />
              <span class="text-[8px] font-bold text-white/30 uppercase">Local_Time</span>
            </div>
            <span class="text-sm font-mono font-black text-white leading-none">{{ currentTime }}</span>
          </div>
          <div class="flex flex-col text-left">
            <div class="flex items-center gap-1.5 mb-1">
              <Sun class="w-3 h-3 text-orange-400" />
              <span class="text-[8px] font-bold text-white/30 uppercase">Temp_Index</span>
            </div>
            <span class="text-sm font-mono font-black text-white leading-none">32°C</span>
          </div>
        </div>
      </div>
    </div>

    <div class="h-[85vh] w-full max-w-[1600px] overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/5 bg-black/20" ref="emblaRef">
      <div class="flex h-full">
        <div v-for="(slide, index) in slides" :key="index" class="relative min-w-full h-full flex-[0_0_100%] p-4 md:p-10">
          <div class="grid grid-cols-12 grid-rows-6 h-full gap-4 md:gap-6">

            <div class="col-span-12 row-span-4 lg:col-span-8 lg:row-span-6 relative overflow-hidden rounded-[2.5rem] border border-white/10 group">
              <img
                  :src="slide.image"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-[10000ms] ease-out"
                  :class="selectedIndex === index ? 'scale-110' : 'scale-100'"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/20 to-transparent"></div>

              <div class="absolute bottom-0 left-0 p-8 md:p-12 w-full transition-all duration-1000 delay-300"
                   :class="selectedIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'">
                <h1 class="text-4xl md:text-7xl font-black text-white leading-[0.85] tracking-tighter uppercase mb-6 drop-shadow-2xl">
                  {{ slide.title }}
                </h1>
                <div class="flex gap-4">
                  <router-link to="/students" class="px-8 py-4 bg-secondary-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center gap-3 hover:bg-secondary-700 transition-all shadow-xl shadow-secondary-600/20">
                    <Users class="w-4 h-4" /> {{ t('hero.buttons.students') }}
                  </router-link>
                </div>
              </div>
            </div>

            <div class="col-span-6 row-span-2 lg:col-span-4 lg:row-span-2 bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 p-8 flex flex-col justify-between transition-all duration-1000 delay-500"
                 :class="selectedIndex === index ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'">
              <div class="flex justify-between items-start">
                <div class="flex items-center gap-2">
                  <div class="p-1.5 bg-secondary-500/20 rounded-lg">
                    <Terminal class="w-4 h-4 text-secondary-500" />
                  </div>
                  <span class="text-[9px] font-mono text-white/40 uppercase tracking-[0.2em]">Batch_Motto</span>
                </div>
                <span class="text-[8px] font-bold text-secondary-400 opacity-50 font-mono tracking-tighter">EST_2025</span>
              </div>
              <div class="space-y-3">
                <p class="text-[10px] font-mono text-secondary-500/60 uppercase">>> RUN batch_vision.sh</p>
                <p class="text-xs md:text-sm lg:text-base font-mono text-white font-bold leading-relaxed italic">
                  "{{ typedText }}"<span class="animate-pulse text-secondary-500">_</span>
                </p>
              </div>
            </div>

            <div class="col-span-6 row-span-2 lg:col-span-4 lg:row-span-2 bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 p-8 flex flex-col justify-between transition-all duration-1000 delay-700"
                 :class="selectedIndex === index ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'">
              <div class="flex items-center gap-3">
                <div class="p-1.5 bg-emerald-500/20 rounded-lg">
                  <Activity class="w-4 h-4 text-emerald-500" />
                </div>
                <span class="text-[10px] font-black text-white/60 uppercase tracking-[0.2em]">Academic_Tracker</span>
              </div>
              <div class="space-y-5">
                <div class="space-y-2">
                  <div class="flex justify-between items-end text-[9px] font-mono uppercase tracking-widest text-white/40">
                    <span>Semester_Progress</span>
                    <span class="text-white font-bold">2 / 8</span>
                  </div>
                  <div class="h-1.5 w-full bg-white/10 rounded-full overflow-hidden border border-white/5">
                    <div class="h-full bg-gradient-to-r from-secondary-600 to-emerald-500 transition-all duration-1000" :style="{ width: '25%' }"></div>
                  </div>
                </div>
                <div class="space-y-2">
                  <div class="flex justify-between items-end text-[9px] font-mono uppercase tracking-widest text-white/40">
                    <span>Credits_Earned</span>
                    <span class="text-white font-bold">42 / 144 SKS</span>
                  </div>
                  <div class="h-1.5 w-full bg-white/10 rounded-full overflow-hidden border border-white/5">
                    <div class="h-full bg-secondary-500 transition-all duration-1000 delay-300" :style="{ width: '30%' }"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="hidden lg:flex col-span-4 row-span-2 bg-secondary-600 rounded-[2rem] p-8 items-center justify-between group cursor-pointer transition-all duration-1000 delay-1000"
                 :class="selectedIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'">
              <div class="text-left">
                <p class="text-white font-black text-2xl leading-none uppercase tracking-tighter">Gallery</p>
                <p class="text-white/60 text-[10px] font-bold mt-2 uppercase tracking-[0.2em]">Explore_Collection</p>
              </div>
              <router-link to="/gallery" class="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all">
                <ChevronRight class="w-7 h-7 text-white" />
              </router-link>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-16 right-16 flex gap-4 z-30">
      <button @click="emblaApi?.scrollPrev()" class="w-14 h-14 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-secondary-600 hover:border-transparent transition-all">
        <ChevronLeft class="w-6 h-6" />
      </button>
      <button @click="emblaApi?.scrollNext()" class="w-14 h-14 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-secondary-600 hover:border-transparent transition-all">
        <ChevronRight class="w-6 h-6" />
      </button>
    </div>

    <div class="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-3 z-30">
      <button
          v-for="(_, i) in slides" :key="i"
          @click="emblaApi?.scrollTo(i)"
          class="h-1.5 transition-all duration-500 rounded-full"
          :class="selectedIndex === i ? 'w-10 bg-secondary-500' : 'w-3 bg-white/20'"
      ></button>
    </div>

  </div>
</template>

<style scoped>
/* Smooth masking for carousel edge */
[ref="emblaRef"] {
  mask-image: radial-gradient(circle at center, black 90%, transparent 100%);
}

/* Bento Hover Micro-interaction */
.backdrop-blur-xl {
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease;
}

.backdrop-blur-xl:hover {
  background-color: rgba(255, 255, 255, 0.08);
  transform: translateY(-8px) scale(1.01);
}

h1 {
  font-family: 'Inter', sans-serif;
  text-shadow: 0 20px 40px rgba(0,0,0,0.3);
}
</style>
<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useMusicStore } from '../stores/musicStore';
import { useThemeStore } from '../stores/themeStore';
import * as THREE from 'three';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, EffectCube, Navigation } from 'swiper/modules';

import {
  Users,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Image as ImageIcon,
} from 'lucide-vue-next';

import Slider1 from '../assets/img/swiper/slider1.jpg';
import Slider2 from '../assets/img/swiper/slider2.jpg';
import Slider3 from '../assets/img/swiper/slider3.jpg';
import Slider4 from '../assets/img/swiper/slider4.jpg';

import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/navigation';

const { t, tm, rt } = useI18n();
const musicStore = useMusicStore();
const themeStore = useThemeStore();
const modules = [Autoplay, EffectCube, Navigation];

const activeIndex = ref(0);
const canvasRef = ref(null);
const slideImages = [Slider1, Slider2, Slider3, Slider4];

const slides = computed(() => {
  const messages = tm('hero.slides');
  if (!Array.isArray(messages)) return [];
  return messages.map((item, index) => ({
    image: slideImages[index] || slideImages[0],
    title: rt(item.title)
  }));
});

let scene, camera, renderer, globe, galaxy;

const getColors = () => ({
  main: themeStore.isDark ? 0x9810fa : 0x155dfc,
});

const initThree = () => {
  if (!canvasRef.value) return;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 60;

  renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const globeGeom = new THREE.SphereGeometry(20, 24, 24);
  const globeMat = new THREE.MeshBasicMaterial({
    color: getColors().main,
    wireframe: true,
    transparent: true,
    opacity: themeStore.isDark ? 0.1 : 0.2
  });
  globe = new THREE.Mesh(globeGeom, globeMat);
  scene.add(globe);

  const starsGeometry = new THREE.BufferGeometry();
  const starCount = 2000;
  const positions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 150;
  }
  starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  galaxy = new THREE.Points(starsGeometry, new THREE.PointsMaterial({
    color: getColors().main,
    size: 0.15,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending
  }));
  scene.add(galaxy);

  const animate = () => {
    requestAnimationFrame(animate);
    if (globe) globe.rotation.y += 0.001;
    if (galaxy) galaxy.rotation.y -= 0.0005;
    renderer.render(scene, camera);
  };
  animate();
};

watch(() => themeStore.isDark, (isDark) => {
  const color = getColors().main;
  if (globe) {
    globe.material.color.setHex(color);
    globe.material.opacity = isDark ? 0.1 : 0.2;
  }
  if (galaxy) galaxy.material.color.setHex(color);
});

const handleResize = () => {
  if (!camera || !renderer) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

onMounted(() => {
  initThree();
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => window.removeEventListener('resize', handleResize));

const onSlideChange = (swiper) => {
  activeIndex.value = swiper.activeIndex;
};

const toggleMusic = () => musicStore.togglePlay();
</script>

<template>
  <div class="bg-white dark:bg-primary-950 min-h-screen w-full overflow-hidden transition-colors duration-700 selection:bg-secondary-600 selection:text-white">

    <section class="relative h-[100vh] w-full overflow-hidden bg-white dark:bg-primary-950 transition-colors duration-700">

      <div class="absolute inset-0 z-0 pointer-events-none">
        <transition name="fade-bg">
          <img
              :key="activeIndex"
              :src="slides[activeIndex]?.image"
              class="h-full w-full object-cover opacity-20 dark:opacity-30 blur-[100px] scale-150 transition-all duration-1000"
          />
        </transition>
        <div class="absolute inset-0 bg-white/60 dark:bg-primary-950/70 backdrop-blur-[2px] transition-colors duration-700"></div>
      </div>

      <canvas ref="canvasRef" class="absolute inset-0 z-[1] pointer-events-none opacity-60 dark:opacity-80 transition-opacity duration-700"></canvas>

      <swiper
          @slideChange="onSlideChange"
          :grabCursor="true"
          :effect="'cube'"
          :cubeEffect="{
            shadow: false,
            slideShadows: true,
            shadowOffset: 0,
            shadowScale: 1,
          }"
          :speed="1400"
          :loop="false"
          :rewind="true"
          :modules="modules"
          :autoplay="{ delay: 7000, disableOnInteraction: false }"
          :navigation="{ prevEl: '.custom-prev', nextEl: '.custom-next' }"
          class="h-full w-full main-hero-swiper z-10"
      >
        <swiper-slide v-for="(slide, index) in slides" :key="index">
          <div class="relative w-full h-full flex items-center justify-center px-6 md:px-10 overflow-hidden">

            <div class="absolute inset-0 z-0">
              <img :src="slide.image" class="w-full h-full object-cover opacity-80 dark:opacity-40 transition-opacity duration-700" />
              <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-primary-950 transition-colors duration-700"></div>
            </div>

            <div class="relative z-10 text-center w-full max-w-6xl mx-auto pt-20">
              <div
                  v-motion
                  :initial="{ opacity: 0, scale: 0.9 }"
                  :enter="{ opacity: 1, scale: 1, transition: { delay: 800 } }"
                  class="flex flex-col sm:flex-row items-center justify-center gap-6"
              >
                <router-link to="/students" class="w-full sm:w-auto flex items-center justify-center gap-4 bg-secondary-600 hover:bg-secondary-700 dark:bg-dark-600 dark:hover:bg-dark-700 text-white px-12 py-5 rounded-2xl font-black text-[12px] transition-all shadow-2xl shadow-secondary-600/20 active:scale-95 uppercase tracking-[0.2em]">
                  <Users class="w-5 h-5" />
                  {{ t('hero.buttons.students') }}
                </router-link>

                <router-link to="/gallery" class="w-full sm:w-auto flex items-center justify-center gap-4 bg-primary-900/10 dark:bg-white/10 hover:bg-primary-900/20 dark:hover:bg-white/20 backdrop-blur-xl text-primary-900 dark:text-white border border-primary-900/20 dark:border-white/20 px-12 py-5 rounded-2xl font-black text-[12px] transition-all active:scale-95 uppercase tracking-[0.2em]">
                  <ImageIcon class="w-5 h-5" />
                  {{ t('hero.buttons.gallery') }}
                </router-link>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>

      <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 z-50 pointer-events-none flex justify-between px-6 md:px-12">
        <button class="custom-prev pointer-events-auto w-16 h-16 rounded-full bg-primary-900/10 dark:bg-white/10 backdrop-blur-2xl text-primary-900 dark:text-white border border-primary-900/20 dark:border-white/20 flex items-center justify-center hover:bg-secondary-600 hover:text-white transition-all active:scale-90 shadow-xl group/btn">
          <ChevronLeft class="w-10 h-10 group-hover/btn:-translate-x-1 transition-transform" />
        </button>
        <button class="custom-next pointer-events-auto w-16 h-16 rounded-full bg-primary-900/10 dark:bg-white/10 backdrop-blur-2xl text-primary-900 dark:text-white border border-primary-900/20 dark:border-white/20 flex items-center justify-center hover:bg-secondary-600 hover:text-white transition-all active:scale-90 shadow-xl group/btn">
          <ChevronRight class="w-10 h-10 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>

      <div @click="toggleMusic" class="absolute bottom-10 right-6 md:right-12 z-50 flex items-center gap-5 bg-primary-900/5 dark:bg-white/5 backdrop-blur-3xl p-4 rounded-3xl border border-primary-900/10 dark:border-white/10 cursor-pointer hover:bg-primary-900/10 dark:hover:bg-white/10 transition-all shadow-2xl group/music">
        <div class="w-12 h-12 bg-secondary-600 dark:bg-dark-600 rounded-2xl flex items-center justify-center shadow-lg shadow-secondary-600/40" :class="{ 'animate-spin-slow': musicStore.isPlaying }">
          <Pause v-if="musicStore.isPlaying" class="w-6 h-6 text-white" />
          <Play v-else class="w-6 h-6 text-white ml-1" />
        </div>
        <div class="hidden lg:block text-left pr-4 select-none">
          <p class="text-[10px] text-secondary-600 dark:text-secondary-400 font-black uppercase tracking-[0.3em] leading-none mb-2">
            {{ musicStore.isPlaying ? 'SYSTEM ACTIVE' : 'SYSTEM PAUSED' }}
          </p>
          <p class="text-sm text-primary-900 dark:text-white font-black uppercase tracking-tighter leading-none transition-colors duration-700">Informatics 25 Radio</p>
        </div>
      </div>

      <div class="absolute bottom-0 left-0 w-full z-20 pointer-events-none">
        <svg class="w-full h-[80px] md:h-[120px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.23,103.19,114.4,117.29,172,118.71c57.59,1.42,114.44-12.79,149.39-22.27Z"
                class="fill-white dark:fill-primary-950 transition-colors duration-700"></path>
        </svg>
      </div>
    </section>
  </div>
</template>

<style scoped>
:deep(.swiper-cube-shadow) { display: none !important; }
canvas { pointer-events: none; filter: brightness(1.1) contrast(1.1); transition: filter 0.7s ease; }
</style>
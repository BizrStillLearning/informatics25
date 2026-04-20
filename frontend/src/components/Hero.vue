<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useMusicStore } from '../stores/musicStore';
import { useThemeStore } from '../stores/themeStore';
import * as THREE from 'three';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, EffectCube, Navigation } from 'swiper/modules';

import {
  Users, ChevronLeft, ChevronRight, Play, Pause,
  Image as ImageIcon, Terminal, Cpu, Globe, LayoutGrid
} from 'lucide-vue-next';

import Slider1 from '../assets/img/swiper/slider1.jpg';
import Slider2 from '../assets/img/swiper/slider2.jpg';
import Slider3 from '../assets/img/swiper/slider3.jpg';
import Slider4 from '../assets/img/swiper/slider4.jpg';

import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/navigation';

const props = defineProps({
  isReady: { type: Boolean, default: false }
});

const { t, tm, rt } = useI18n();
const musicStore = useMusicStore();
const themeStore = useThemeStore();
const modules = [Autoplay, EffectCube, Navigation];

const activeIndex = ref(0);
const canvasRef = ref(null);
const slideImages = [Slider1, Slider2, Slider3, Slider4];

const typedText = ref('');
const terminalMessages = [
  "INITIALIZING_PROTOCOL_25",
  "CONNECTING_TO_DATABASE...",
  "WELCOME_CONTRIBUTOR",
  "SYSTEM_STATUS_OPTIMAL"
];
let messageIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
  const currentMessage = terminalMessages[messageIndex];
  if (isDeleting) {
    typedText.value = currentMessage.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedText.value = currentMessage.substring(0, charIndex + 1);
    charIndex++;
  }
  let typeSpeed = isDeleting ? 50 : 100;
  if (!isDeleting && charIndex === currentMessage.length) {
    isDeleting = true;
    typeSpeed = 2000;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    messageIndex = (messageIndex + 1) % terminalMessages.length;
    typeSpeed = 500;
  }
  setTimeout(typeEffect, typeSpeed);
};

let scene, camera, renderer, globe, galaxy;
const getColors = () => ({ main: themeStore.isDark ? 0x9810fa : 0x155dfc });

const initThree = () => {
  if (!canvasRef.value || renderer) return; // Mencegah inisialisasi ganda
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 100;
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
  for (let i = 0; i < starCount * 3; i++) { positions[i] = (Math.random() - 0.5) * 150; }
  starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  galaxy = new THREE.Points(starsGeometry, new THREE.PointsMaterial({
    color: getColors().main, size: 0.15, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending
  }));
  scene.add(galaxy);

  const animate = () => {
    if (!renderer) return;
    requestAnimationFrame(animate);
    if (camera.position.z > 60) camera.position.z -= 0.5;
    if (globe) globe.rotation.y += 0.001;
    if (galaxy) galaxy.rotation.y -= 0.0005;
    renderer.render(scene, camera);
  };
  animate();
};

const slides = computed(() => {
  const messages = tm('hero.slides');
  if (!Array.isArray(messages)) return [];
  return messages.map((item, index) => ({
    image: slideImages[index] || slideImages[0],
    title: rt(item.title)
  }));
});

watch(() => props.isReady, (ready) => { if (ready) setTimeout(initThree, 300); });
watch(() => themeStore.isDark, (isDark) => {
  const color = getColors().main;
  if (globe) { globe.material.color.setHex(color); globe.material.opacity = isDark ? 0.1 : 0.2; }
  if (galaxy) galaxy.material.color.setHex(color);
});

const handleResize = () => {
  if (!camera || !renderer) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

onMounted(() => {
  typeEffect();
  window.addEventListener('resize', handleResize);

  // PERBAIKAN BARIS 197: Safe Storage Check
  const isSafeWindow = typeof window !== 'undefined' && window.sessionStorage;
  const initCheck = isSafeWindow ? window.sessionStorage.getItem('protocol_init') : null;

  if (initCheck || props.isReady) {
    setTimeout(initThree, 500);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  if (renderer) {
    renderer.dispose();
    renderer = null;
  }
});
const onSlideChange = (swiper) => { activeIndex.value = swiper.activeIndex; };
const toggleMusic = () => musicStore.togglePlay();
</script>

<template>
  <div class="bg-white dark:bg-primary-950 min-h-screen w-full overflow-hidden transition-colors duration-700 selection:bg-secondary-600 selection:text-white">
    <section class="relative h-[100vh] w-full overflow-hidden bg-white dark:bg-primary-950 transition-colors duration-700">

      <div class="absolute top-28 left-6 md:left-12 z-50 pointer-events-none hidden sm:block">
        <div class="glass-card p-4 rounded-2xl border-l-4 border-l-secondary-600 space-y-3 shadow-2xl bg-white/10 dark:bg-black/20 backdrop-blur-md">
          <div class="flex items-center gap-3">
            <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <p class="text-[9px] font-black text-primary-400 uppercase tracking-[0.3em]">Node: Region_Surabaya</p>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex flex-col">
              <span class="text-[8px] text-primary-400 font-bold uppercase tracking-widest">Core_Temp</span>
              <span class="text-xs font-black text-primary-900 dark:text-white tabular-nums">32.4°C</span>
            </div>
            <div class="w-[1px] h-6 bg-primary-100 dark:bg-white/10"></div>
            <div class="flex flex-col">
              <span class="text-[8px] text-primary-400 font-bold uppercase tracking-widest">Uptime</span>
              <span class="text-xs font-black text-primary-900 dark:text-white tabular-nums">99.9%</span>
            </div>
          </div>
        </div>
      </div>

      <Transition enter-active-class="transition duration-1000 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-60 dark:opacity-80">
        <canvas ref="canvasRef" class="absolute inset-0 z-[1] pointer-events-none opacity-60 dark:opacity-80"></canvas>
      </Transition>

      <swiper
          @slideChange="onSlideChange"
          :grabCursor="true"
          :effect="'cube'"
          :speed="1400"
          :rewind="true"
          :modules="modules"
          :autoplay="{ delay: 7000, disableOnInteraction: false }"
          :navigation="{ prevEl: '.custom-prev', nextEl: '.custom-next' }"
          class="h-full w-full main-hero-swiper z-10"
      >
        <swiper-slide v-for="(slide, index) in slides" :key="index">
          <div class="relative w-full h-full flex items-center justify-center px-6 md:px-10 overflow-hidden">
            <div class="absolute inset-0 z-0">
              <img :src="slide.image" class="w-full h-full object-cover opacity-80 dark:opacity-40" />
              <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-primary-950"></div>
            </div>

            <div class="relative z-10 text-center w-full max-w-6xl mx-auto pt-20">
              <div class="flex items-center justify-center gap-3 mb-6 font-mono">
                <Terminal class="w-5 h-5 text-secondary-600" />
                <span class="text-primary-900 dark:text-white text-sm md:text-lg font-black tracking-[0.2em]">
                  {{ typedText }}<span class="animate-pulse">_</span>
                </span>
              </div>
              <h1 class="text-4xl md:text-8xl font-black text-primary-900 dark:text-white uppercase tracking-tighter mb-8 leading-none">
                {{ slide.title }}
              </h1>
              <div v-motion :initial="{ opacity: 0, scale: 0.9 }" :enter="{ opacity: 1, scale: 1, transition: { delay: 800 } }" class="flex flex-col sm:flex-row items-center justify-center gap-6">
                <router-link to="/students" class="w-full sm:w-auto flex items-center justify-center gap-4 bg-secondary-600 hover:bg-secondary-700 dark:bg-dark-600 dark:hover:bg-dark-700 text-white px-12 py-5 rounded-2xl font-black text-[12px] transition-all shadow-2xl active:scale-95 uppercase tracking-[0.2em]">
                  <Users class="w-5 h-5" /> {{ t('hero.buttons.students') }}
                </router-link>
                <router-link to="/gallery" class="w-full sm:w-auto flex items-center justify-center gap-4 bg-primary-900/10 dark:bg-white/10 hover:bg-primary-900/20 dark:hover:bg-white/20 backdrop-blur-xl text-primary-900 dark:text-white border border-primary-900/20 dark:border-white/20 px-12 py-5 rounded-2xl font-black text-[12px] transition-all active:scale-95 uppercase tracking-[0.2em]">
                  <ImageIcon class="w-5 h-5" /> {{ t('hero.buttons.gallery') }}
                </router-link>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>

    </section>
  </div>
</template>
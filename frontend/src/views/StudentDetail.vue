<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useThemeStore } from '../stores/themeStore';
import * as THREE from 'three';
import {
  Instagram,
  Github,
  Linkedin,
  ArrowLeft,
  Quote,
  Camera,
  UserCheck,
  Briefcase,
  FileText,
  X,
  Maximize2,
  Sparkles,
  Image as ImageIcon
} from 'lucide-vue-next';

import ProfileImg from "../assets/img/profile.jpg"
import Detail1 from "../assets/img/GaleriProfile/detail1.jpg"

const { t } = useI18n();
const router = useRouter();
const themeStore = useThemeStore();

const activeTab = ref('profile');
const isModalOpen = ref(false);
const selectedImg = ref('');
const canvasRef = ref(null);

const student = ref({
  name: 'Abidzar Dzakwan Sahudi',
  nim: '20251337037',
  image: ProfileImg,
  quote: t('studentDetail.default_quote'),
  profile: {
    [t('studentDetail.labels.name')]: 'Abidzar Dzakwan Sahudi',
    [t('studentDetail.labels.address')]: 'Surabaya, Jawa Timur',
    [t('studentDetail.labels.school')]: 'SMK TI Annajiyah Bahrul Ulum',
    [t('studentDetail.labels.goal')]: 'Full Stack Developer',
    [t('studentDetail.labels.hobby')]: 'Coding, Gaming, Robotika'
  },
  portfolio: [
    { title: 'Informatics 25 Web', tech: 'Vue.js, Tailwind', year: '2026', desc: t('studentDetail.portfolio_desc1') },
    { title: 'SantriConnect', tech: 'Laravel, MySQL', year: '2025', desc: t('studentDetail.portfolio_desc2') }
  ],
  gallery: [Detail1, Detail1, Detail1, Detail1, Detail1, Detail1],
  socials: { instagram: '#', github: '#', linkedin: '#' }
});

let scene, camera, renderer, particles, particleMaterial;

const initThree = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;

  renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const geometry = new THREE.SphereGeometry(0.12, 8, 8);
  particleMaterial = new THREE.MeshBasicMaterial({
    color: themeStore.isDark ? 0x9810fa : 0x155dfc,
    transparent: true,
    opacity: 0.7
  });

  particles = new THREE.Group();
  for (let i = 0; i < 70; i++) {
    const mesh = new THREE.Mesh(geometry, particleMaterial);
    mesh.position.set((Math.random() - 0.5) * 60, (Math.random() - 0.5) * 60, (Math.random() - 0.5) * 40);
    particles.add(mesh);
  }
  scene.add(particles);

  const animate = () => {
    requestAnimationFrame(animate);
    particles.rotation.y += 0.0006;
    particles.rotation.x += 0.0002;
    renderer.render(scene, camera);
  };
  animate();
};

watch(() => themeStore.isDark, (isDark) => {
  if (particleMaterial) {
    particleMaterial.color.setHex(isDark ? 0x9810fa : 0x155dfc);
  }
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

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

const openModal = (img) => {
  selectedImg.value = img;
  isModalOpen.value = true;
};
const closeModal = () => { isModalOpen.value = false; };
const goBack = () => router.back();
</script>

<template>
  <div class="bg-white dark:bg-primary-950 min-h-screen pb-32 pt-10 transition-colors duration-500 selection:bg-secondary-600 selection:text-white relative overflow-hidden">

    <div class="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <div class="absolute top-[-15%] left-[-5%] w-[80%] h-[60%] rounded-full bg-secondary-600/20 dark:bg-secondary-500/10 blur-[130px] animate-aurora-top"></div>
      <div class="absolute bottom-[-10%] right-[-5%] w-[75%] h-[55%] rounded-full bg-dark-600/15 dark:bg-dark-500/10 blur-[130px] animate-aurora-bottom"></div>
      <div class="absolute top-[30%] left-[40%] w-[40%] h-[40%] rounded-full bg-cyan-500/5 blur-[100px] animate-aurora-pulse"></div>
    </div>

    <canvas ref="canvasRef" class="fixed inset-0 pointer-events-none z-[1] opacity-80"></canvas>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <button @click="goBack" class="group flex items-center gap-3 text-primary-900 dark:text-primary-100 font-black text-[10px] uppercase tracking-[0.3em] mb-12 transition-all">
        <div class="w-12 h-12 rounded-2xl bg-white/40 dark:bg-primary-900/40 backdrop-blur-xl border border-white/50 dark:border-primary-800/50 flex items-center justify-center group-hover:bg-secondary-600 group-hover:text-white transition-all shadow-xl">
          <ArrowLeft class="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </div>
        {{ t('studentDetail.back') }}
      </button>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

        <div class="lg:col-span-4 space-y-8">
          <div class="bg-white/40 dark:bg-primary-900/30 backdrop-blur-[120px] rounded-[3.5rem] p-10 border border-white/60 dark:border-primary-800/50 shadow-2xl text-center relative overflow-hidden group/card transition-all duration-500">
            <div class="absolute -top-20 -left-20 w-40 h-40 bg-secondary-600/10 rounded-full blur-[60px]"></div>

            <div class="relative w-56 h-56 mx-auto mb-8 group/img">
              <div class="absolute inset-0 bg-secondary-600 dark:bg-dark-600 rounded-full blur-[80px] opacity-20 transition-opacity"></div>
              <img :src="student.image" class="relative w-full h-full rounded-[3.5rem] object-cover border-8 border-white/60 dark:border-primary-800 shadow-2xl z-10 transition-all duration-700 hover:scale-105" />
              <div class="absolute -bottom-2 -right-2 bg-secondary-600 dark:bg-dark-600 p-4 rounded-2xl shadow-xl z-20">
                <Sparkles class="w-5 h-5 text-white" />
              </div>
            </div>
            <h1 class="text-3xl font-black text-primary-900 dark:text-white leading-[1.1] tracking-tighter uppercase mb-2">{{ student.name }}</h1>
            <p class="text-secondary-600 dark:text-dark-400 font-black text-xs uppercase tracking-[0.3em] bg-secondary-50/50 dark:bg-primary-950/50 px-5 py-1.5 rounded-full inline-block">{{ student.nim }}</p>

            <div class="flex justify-center gap-4 mt-10">
              <a v-for="(link, platform) in student.socials" :key="platform" :href="link"
                 class="w-14 h-14 rounded-2xl bg-white/40 dark:bg-primary-900/40 backdrop-blur-xl flex items-center justify-center text-primary-900 dark:text-primary-100 hover:bg-secondary-600 dark:hover:bg-dark-600 hover:text-white transition-all hover:-translate-y-2 shadow-lg border border-white/40 dark:border-primary-800/50"
              >
                <component :is="platform === 'instagram' ? Instagram : platform === 'github' ? Github : Linkedin" class="w-6 h-6" />
              </a>
            </div>
          </div>

          <div class="bg-secondary-600/90 dark:bg-dark-600/90 backdrop-blur-3xl rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl border border-white/20">
            <Quote class="absolute -top-6 -left-6 w-32 h-32 text-white/10 rotate-12" />
            <p class="relative z-10 italic text-xl font-bold leading-relaxed tracking-tight">"{{ student.quote }}"</p>
          </div>
        </div>

        <div class="lg:col-span-8 space-y-12">

          <div class="flex flex-wrap gap-3 bg-white/20 dark:bg-primary-900/20 backdrop-blur-3xl p-2.5 rounded-[2.5rem] w-fit border border-white/30 dark:border-primary-800 shadow-2xl">
            <button v-for="tab in ['profile', 'portfolio', 'gallery']" :key="tab" @click="activeTab = tab"
                    :class="activeTab === tab ? 'bg-secondary-600 dark:bg-dark-600 text-white shadow-xl scale-105' : 'text-primary-900 dark:text-primary-100 hover:text-secondary-600 dark:hover:text-dark-600'"
                    class="flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all duration-500">
              <component :is="tab === 'profile' ? UserCheck : tab === 'portfolio' ? Briefcase : ImageIcon" class="w-4 h-4" />
              {{ t(`studentDetail.tabs.${tab}`) }}
            </button>
          </div>

          <div v-if="activeTab === 'profile'" v-motion-fade class="bg-white/40 dark:bg-primary-900/15 backdrop-blur-[120px] p-10 rounded-[4rem] border border-white/60 dark:border-primary-800/40 shadow-2xl relative overflow-hidden">
            <div v-for="(value, label) in student.profile" :key="label" class="flex flex-col md:flex-row md:items-center border-b border-primary-900/5 dark:border-primary-100/5 pb-8 last:border-0 last:pb-0 group/row">
              <span class="text-[10px] font-black text-secondary-600 dark:text-dark-400 uppercase tracking-[0.4em] w-56 shrink-0 mb-2 md:mb-0">{{ label }}</span>
              <span class="text-primary-900 dark:text-primary-100 font-bold text-2xl tracking-tighter">{{ value }}</span>
            </div>
          </div>

          <div v-if="activeTab === 'portfolio'" v-motion-fade class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div v-for="item in student.portfolio" :key="item.title" class="bg-white/40 dark:bg-primary-900/20 backdrop-blur-3xl p-10 rounded-[4rem] border border-white/50 dark:border-primary-800/40 shadow-xl hover:-translate-y-3 relative overflow-hidden transition-all duration-500">
              <div class="w-16 h-16 bg-secondary-600 dark:bg-dark-600 rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg">
                <FileText class="w-8 h-8" />
              </div>
              <h3 class="text-2xl font-black text-primary-900 dark:text-white mb-2 uppercase tracking-tighter leading-tight">{{ item.title }}</h3>
              <p class="text-primary-500 dark:text-primary-400 text-[10px] font-black uppercase tracking-widest mb-4">{{ item.tech }}</p>
              <p class="text-primary-600 dark:text-primary-400 text-sm leading-relaxed mb-8">{{ item.desc }}</p>
              <span class="px-6 py-2.5 bg-white/30 dark:bg-primary-950/40 rounded-xl text-[10px] font-black text-secondary-600 dark:text-dark-400 border border-white/20 dark:border-primary-800 shadow-sm">{{ item.year }}</span>
            </div>
          </div>

          <div v-if="activeTab === 'gallery'" v-motion-fade class="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div v-for="(img, idx) in student.gallery" :key="idx" @click="openModal(img)" class="group/gal relative aspect-[4/5] rounded-[3.5rem] overflow-hidden bg-white/10 backdrop-blur-xl border-8 border-white/60 dark:border-primary-800/50 shadow-2xl cursor-pointer transition-all duration-700 hover:-translate-y-4">
              <img :src="img" class="w-full h-full object-cover transition-transform duration-[1.5s] group-hover/gal:scale-125" />
              <div class="absolute inset-0 bg-secondary-600/40 backdrop-blur-sm opacity-0 group-hover/gal:opacity-100 transition-all flex items-center justify-center">
                <Maximize2 class="text-white w-10 h-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isModalOpen" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-6 md:p-12" @click.self="closeModal">
          <button @click="closeModal" class="absolute top-10 right-10 w-16 h-16 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all z-[10000] border border-white/10">
            <X class="w-8 h-8" />
          </button>
          <img :src="selectedImg" class="max-w-full max-h-full object-contain rounded-2xl select-none shadow-[0_0_80px_rgba(21,93,252,0.2)]" />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
h1, h2, h3 { letter-spacing: -0.06em; }

@keyframes aurora-top {
  0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
  50% { transform: translate(5%, 10%) scale(1.1) rotate(2deg); }
}
@keyframes aurora-bottom {
  0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
  50% { transform: translate(-8%, -5%) scale(1.15) rotate(-2deg); }
}
@keyframes aurora-pulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}

.animate-aurora-top { animation: aurora-top 18s ease-in-out infinite; }
.animate-aurora-bottom { animation: aurora-bottom 22s ease-in-out infinite; }
.animate-aurora-pulse { animation: aurora-pulse 15s ease-in-out infinite; }

canvas {
  filter: blur(1px);
  pointer-events: none;
}
</style>
<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useThemeStore } from '../stores/themeStore';
import * as THREE from 'three';
import {
  Search,
  Instagram,
  Github,
  Linkedin,
  ExternalLink,
  ChevronDown,
  SortAsc,
  Sparkles
} from 'lucide-vue-next';
import Image from "../assets/img/profile.jpg"
import MainLayout from "../components/layouts/landing/MainLayout.vue";

const { t } = useI18n();
const themeStore = useThemeStore();
const searchQuery = ref('');
const sortBy = ref('name');
const threeCanvas = ref(null);

let scene, camera, renderer, starStuff, shootingStars = [];
const mouse = new THREE.Vector2();

const getThemeColors = () => {
  return themeStore.isDark
      ? { main: 0x9810fa, accent: 0x3c0366 }
      : { main: 0x155dfc, accent: 0x1da1f2 };
};

const initThree = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / 600, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ canvas: threeCanvas.value, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, 600);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const starsGeometry = new THREE.BufferGeometry();
  const starCount = 8000;
  const positions = new Float32Array(starCount * 3);
  const colors = new Float32Array(starCount * 3);

  const updateNebulaColors = () => {
    const { main, accent } = getThemeColors();
    const color1 = new THREE.Color(main);
    const color2 = new THREE.Color(accent);
    for (let i = 0; i < starCount; i++) {
      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  };

  for (let i = 0; i < starCount; i++) {
    const i3 = i * 3;
    const radius = Math.random() * 80;
    const spinAngle = radius * 0.12;
    const branchAngle = (i % 3) * ((Math.PI * 2) / 3);

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * 10;
    positions[i3 + 1] = (Math.random() - 0.5) * 15;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * 10;
  }

  starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  updateNebulaColors();

  const starMaterial = new THREE.PointsMaterial({
    size: 0.18,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending
  });

  starStuff = new THREE.Points(starsGeometry, starMaterial);
  scene.add(starStuff);

  const createShootingStar = () => {
    const geometry = new THREE.BufferGeometry();
    const pos = new Float32Array(6);
    geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1 });
    const line = new THREE.Line(geometry, mat);
    resetShootingStar(line);
    scene.add(line);
    shootingStars.push(line);
  };

  const resetShootingStar = (star) => {
    star.position.set((Math.random() - 0.5) * 150, 40, (Math.random() - 0.5) * 50);
    star.userData = {
      vel: new THREE.Vector3(-1.5 - Math.random() * 2, -1.5 - Math.random() * 2, 0),
      life: 1.0
    };
  };

  for(let i=0; i<8; i++) createShootingStar();

  camera.position.z = 50;

  const animate = () => {
    requestAnimationFrame(animate);
    starStuff.rotation.y += 0.0006;

    starStuff.position.x += (mouse.x * 5 - starStuff.position.x) * 0.02;
    starStuff.position.y += (-mouse.y * 5 - starStuff.position.y) * 0.02;

    shootingStars.forEach(star => {
      star.position.add(star.userData.vel);
      star.userData.life -= 0.008;
      star.material.opacity = star.userData.life;

      const pos = star.geometry.attributes.position.array;
      pos[3] = -star.userData.vel.x * 3; pos[4] = -star.userData.vel.y * 3;
      star.geometry.attributes.position.needsUpdate = true;

      if (star.userData.life <= 0) resetShootingStar(star);
    });

    renderer.render(scene, camera);
  };
  animate();

  watch(() => themeStore.isDark, () => {
    updateNebulaColors();
    starStuff.geometry.attributes.color.needsUpdate = true;
  });
};

const onMouseMove = (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
};

const handleResize = () => {
  if (!camera || !renderer) return;
  camera.aspect = window.innerWidth / 600;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, 600);
};

onMounted(() => {
  initThree();
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('resize', handleResize);
});

const students = ref([
  { id: 1, nim: '20251337037', name: 'Abidzar Dzakwan Sahudi', image: Image, instagram: '#', github: '#', linkedin: '#', slug: 'abidzar-dzakwan' },
  { id: 2, nim: '20251337002', name: 'Albany Raffa Assyukura', image: Image, instagram: '#', github: '#', linkedin: '#', slug: 'albany-raffa' },
  { id: 3, nim: '20251337013', name: 'Fathul Hidayat Sampurna', image: Image, instagram: '#', github: '#', linkedin: '#', slug: 'fathul-hidayat' },
  { id: 4, nim: '20251337009', name: 'Muhammad Ihsan Pradipta Maulana', image: Image, instagram: '#', github: '#', linkedin: '#', slug: 'muhammad-ihsan' },
  { id: 5, nim: '20251337034', name: 'Prahastian Rizky Eka Putra', image: Image, instagram: '#', github: '#', linkedin: '#', slug: 'prahastian-rizky' },
  { id: 6, nim: '20251337035', name: 'Muhammad Zakky Arifina', image: Image, instagram: '#', github: '#', linkedin: '#', slug: 'muhammad-zakky' },
  { id: 7, nim: '20251337014', name: 'Fairuz Abdillah Idrus', image: Image, instagram: '#', github: '#', linkedin: '#', slug: 'fairuz-abdillah' },
]);

const filteredStudents = computed(() => {
  let result = students.value.filter(s =>
      s.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      s.nim.includes(searchQuery.value)
  );
  return result.sort((a, b) => {
    if (sortBy.value === 'name') return a.name.localeCompare(b.name);
    if (sortBy.value === 'nim') return a.nim.localeCompare(b.nim);
    return 0;
  });
});
</script>

<template>
  <MainLayout>
    <section class="py-32 bg-white dark:bg-primary-950 min-h-screen relative overflow-hidden selection:bg-secondary-600 selection:text-white transition-colors duration-500 overflow-hidden">

      <canvas ref="threeCanvas" class="fixed inset-0 pointer-events-none z-0 opacity-100 dark:opacity-70"></canvas>

      <div class="max-w-7xl mx-auto px-6 relative z-10">

        <div class="relative text-center max-w-4xl mx-auto mb-32 py-10">
          <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }" class="relative z-10 flex items-center justify-center gap-3 mb-8">
            <div class="w-14 h-1.5 bg-secondary-600 dark:bg-dark-600 rounded-full"></div>
            <span class="text-secondary-600 dark:text-dark-400 font-black uppercase tracking-[0.4em] text-xs">
            {{ t('students.badge') || 'Database Angkatan' }}
          </span>
          </div>

          <h2 v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0, transition: { delay: 200, duration: 800 } }" class="relative z-10 text-5xl md:text-[6rem] font-black text-primary-900 dark:text-white mb-10 tracking-tighter leading-[0.9] uppercase">
            {{ t('students.title_part1') || 'Directory' }}
            <span class="text-secondary-600 dark:text-dark-600 italic">{{ t('students.title_highlight') || 'Mahasiswa' }}</span>
          </h2>

          <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 400, duration: 600 } }" class="relative z-10 flex flex-col lg:flex-row gap-5 justify-center items-center mt-16">
            <div class="relative w-full lg:w-[600px] group">
              <div class="absolute left-7 top-1/2 -translate-y-1/2 flex items-center justify-center z-20 pointer-events-none">
                <Search class="w-6 h-6 text-primary-400 group-focus-within:text-secondary-600 dark:group-focus-within:text-dark-400 transition-all duration-300" />
              </div>
              <input
                  v-model="searchQuery"
                  type="text"
                  :placeholder="t('students.search_placeholder') || 'Cari Nama atau NIM...'"
                  class="student-search-input w-full pl-16 pr-8 py-6 rounded-[2.5rem] bg-white/40 dark:bg-primary-900/40 backdrop-blur-3xl border border-white/40 dark:border-primary-800 text-primary-900 dark:text-white font-bold text-sm outline-none focus:ring-4 focus:ring-secondary-600/10 transition-all shadow-xl relative z-10"
              />
            </div>

            <div class="relative w-full lg:w-auto group">
              <div class="absolute left-7 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <SortAsc class="w-5 h-5 text-secondary-600 dark:text-dark-400" />
              </div>
              <select
                  v-model="sortBy"
                  class="student-select appearance-none w-full lg:w-64 pl-16 pr-14 py-6 rounded-[2.5rem] bg-white/40 dark:bg-primary-900/40 backdrop-blur-3xl border border-white/40 dark:border-primary-800 text-primary-900 dark:text-white font-black text-[10px] uppercase tracking-[0.2em] cursor-pointer outline-none transition-all shadow-xl"
              >
                <option value="name" class="student-option">{{ t('students.sort_alpha') || 'Urut Abjad' }}</option>
                <option value="nim" class="student-option">{{ t('students.sort_nim') || 'Urut NIM' }}</option>
              </select>
              <ChevronDown class="absolute right-7 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400 pointer-events-none group-hover:translate-y-[-30%] transition-transform" />
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div v-for="(student, idx) in filteredStudents" :key="student.id" v-motion :initial="{ opacity: 0, y: 40, scale: 0.95 }" :enter="{ opacity: 1, y: 0, scale: 1, transition: { delay: idx * 80, duration: 600 } }" class="group bg-white/30 dark:bg-primary-900/30 backdrop-blur-2xl border border-white/40 dark:border-primary-800/40 rounded-[3.5rem] p-8 hover:-translate-y-4 hover:shadow-2xl hover:bg-white/50 dark:hover:bg-primary-900/50 transition-all duration-700 flex flex-col h-full">
            <div class="relative w-full aspect-square rounded-[2.5rem] overflow-hidden mb-10 border-[10px] border-white/50 dark:border-primary-800/50 shadow-2xl shrink-0">
              <img :src="student.image" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <router-link :to="`/students/${student.slug}`" class="absolute inset-0 bg-secondary-600/80 dark:bg-dark-600/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center text-white gap-4">
                <div class="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center border border-white/20">
                  <ExternalLink class="w-7 h-7 text-white" />
                </div>
                <span class="font-black text-[10px] tracking-[0.4em] uppercase">{{ t('students.view_profile') || 'Lihat Profil' }}</span>
              </router-link>
            </div>

            <div class="text-center mb-10 flex-grow">
              <h3 class="text-xl font-black text-primary-900 dark:text-white leading-[1.1] tracking-tighter uppercase min-h-[3.5rem] flex items-center justify-center">
                {{ student.name }}
              </h3>
              <div class="inline-flex mt-4 px-6 py-2 bg-white/40 dark:bg-primary-950/40 backdrop-blur-sm rounded-full border border-white/20 dark:border-primary-800">
                <p class="text-[10px] font-black text-primary-400 dark:text-primary-600 uppercase tracking-widest">{{ student.nim }}</p>
              </div>
            </div>

            <div class="flex justify-center items-center gap-4 pt-6 border-t border-white/20 dark:border-primary-800/50 mt-auto">
              <a :href="student.instagram" class="w-12 h-12 rounded-2xl bg-white/40 dark:bg-primary-800/60 backdrop-blur-sm flex items-center justify-center text-primary-400 hover:bg-pink-600 hover:text-white transition-all shadow-sm"><Instagram class="w-5 h-5" /></a>
              <a :href="student.github" class="w-12 h-12 rounded-2xl bg-white/40 dark:bg-primary-800/60 backdrop-blur-sm flex items-center justify-center text-primary-400 hover:bg-primary-900 dark:hover:bg-white dark:hover:text-primary-900 transition-all shadow-sm"><Github class="w-5 h-5" /></a>
              <a :href="student.linkedin" class="w-12 h-12 rounded-2xl bg-white/40 dark:bg-primary-800/60 backdrop-blur-sm flex items-center justify-center text-primary-400 hover:bg-secondary-700 hover:text-white transition-all shadow-sm"><Linkedin class="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<style scoped>
h2 { letter-spacing: -0.06em; }

canvas {
  filter: blur(2px) brightness(1.1) contrast(1.1);
}

.student-option {
  background-color: white;
  color: #101828;
}

:global(.dark) .student-option {
  background-color: #030712;
  color: #f9fafb;
}

.student-select {
  color-scheme: dark;
}
</style>
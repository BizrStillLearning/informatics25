<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useThemeStore } from '../stores/themeStore';
import * as THREE from 'three';
import {
  Calendar,
  MapPin,
  Quote,
  Sparkles,
} from 'lucide-vue-next';
import AboutImg from '../assets/img/random1.jpg';

const { t } = useI18n();
const themeStore = useThemeStore();
const canvasRef = ref(null);

let scene, camera, renderer, particlesGeometry, points;
const particleCount = 800;

const initThree = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  camera.position.z = 100;

  renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value, alpha: true, antialias: true });
  renderer.setSize(800, 800);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  particlesGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = 0;
    positions[i * 3 + 1] = 0;
    positions[i * 3 + 2] = 0;

    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    const speed = 0.2 + Math.random() * 0.8;

    velocities[i * 3] = Math.sin(phi) * Math.cos(theta) * speed;
    velocities[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;
    velocities[i * 3 + 2] = Math.cos(phi) * speed;

    sizes[i] = Math.random() * 2;
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

  const getThemeColor = () => themeStore.isDark ? 0x9810fa : 0x155dfc;

  const pointsMaterial = new THREE.PointsMaterial({
    color: getThemeColor(),
    size: 0.7,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  points = new THREE.Points(particlesGeometry, pointsMaterial);
  scene.add(points);

  const animate = () => {
    requestAnimationFrame(animate);

    const positions = particlesGeometry.attributes.position.array;
    const velocities = particlesGeometry.attributes.velocity.array;

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];

      const dist = Math.sqrt(
          positions[i * 3] ** 2 +
          positions[i * 3 + 1] ** 2 +
          positions[i * 3 + 2] ** 2
      );

      if (dist > 150) {
        positions[i * 3] = 0;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = 0;
      }
    }

    particlesGeometry.attributes.position.needsUpdate = true;
    points.rotation.z += 0.001;

    renderer.render(scene, camera);
  };
  animate();
};

watch(() => themeStore.isDark, (isDark) => {
  if (points) {
    points.material.color.setHex(isDark ? 0x9810fa : 0x155dfc);
  }
});

onMounted(() => {
  initThree();
});

const stats = computed(() => [
  { title: t('about.stats.item1.title') || 'Innovate', desc: t('about.stats.item1.desc') || 'Byte by Byte.', icon: Calendar, color: 'bg-secondary-600' },
  { title: t('about.stats.item2.title') || 'Collaborate', desc: t('about.stats.item2.desc') || 'Human to Human.', icon: MapPin, color: 'bg-emerald-500' }
]);
</script>

<template>
  <section id="about" class="py-24 bg-white dark:bg-primary-950 relative overflow-hidden transition-colors duration-500 selection:bg-secondary-600 selection:text-white">

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

        <div class="lg:col-span-7 space-y-12">
          <div
              class="relative w-full"
              v-motion
              :initial="{ opacity: 0, x: -50 }"
              :visible="{ opacity: 1, x: 0, transition: { duration: 1000 } }"
          >
            <canvas ref="canvasRef" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] pointer-events-none z-0 mix-blend-screen"></canvas>

            <div class="relative z-10 w-full aspect-video bg-white/10 dark:bg-primary-900/40 backdrop-blur-md rounded-[3.5rem] shadow-2xl overflow-hidden border-[10px] border-white dark:border-primary-900 group">
              <img :src="AboutImg" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div class="absolute inset-0 bg-gradient-to-t from-primary-950/40 via-transparent to-transparent"></div>
              <div class="absolute top-8 right-8 bg-white/20 backdrop-blur-xl p-4 rounded-3xl z-20 border border-white/30 shadow-xl">
                <Sparkles class="w-6 h-6 text-white animate-pulse" />
              </div>
            </div>
          </div>

          <div
              v-motion
              :initial="{ opacity: 0, y: 30 }"
              :visible="{ opacity: 1, y: 0, transition: { delay: 400 } }"
              class="p-10 bg-white/40 dark:bg-primary-900/30 backdrop-blur-[40px] rounded-[3rem] border border-white dark:border-primary-800 flex gap-6 items-center shadow-2xl group hover:border-secondary-600/30 transition-all duration-500"
          >
            <div class="w-16 h-16 rounded-2xl bg-secondary-600 dark:bg-dark-600 flex items-center justify-center shrink-0 shadow-lg shadow-secondary-600/20 group-hover:rotate-12 transition-transform">
              <Quote class="w-8 h-8 text-white" />
            </div>
            <p class="text-primary-800 dark:text-primary-100 italic font-bold text-xl leading-relaxed">
              "{{ t('about.quote') || 'Innovating the future through collaboration and lines of code.' }}"
            </p>
          </div>
        </div>

        <div
            class="lg:col-span-5 space-y-12 lg:pt-10"
            v-motion
            :initial="{ opacity: 0, x: 50 }"
            :visible="{ opacity: 1, x: 0, transition: { delay: 300, duration: 1000 } }"
        >
          <div>
            <div class="flex items-center gap-3 mb-6">
              <div class="w-12 h-1.5 bg-secondary-600 dark:bg-dark-600 rounded-full shadow-[0_0_15px_#155dfc]"></div>
              <span class="text-secondary-600 dark:text-dark-400 font-black uppercase tracking-[0.4em] text-[10px]">
                {{ t('about.badge') || 'About Us' }}
              </span>
            </div>

            <h2 class="text-5xl md:text-7xl font-black text-primary-900 dark:text-white mb-8 leading-[0.9] tracking-tighter uppercase">
              {{ t('about.title_part1') || 'Behind' }} <br/>
              <span class="text-secondary-600 dark:text-dark-600 italic"> {{ t('about.title_highlight') || 'The Code' }}</span>
            </h2>

            <p class="text-primary-500 dark:text-primary-400 text-lg leading-relaxed font-medium">
              {{ t('about.description') || 'Building digital legacies with a community-driven mindset. We translate complex logic into beautiful experiences.' }}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div v-for="(item, idx) in stats" :key="idx" class="p-8 bg-white/50 dark:bg-primary-900/20 backdrop-blur-xl border border-white dark:border-primary-800 rounded-[2.5rem] group hover:-translate-y-2 transition-all duration-500 shadow-sm">
              <div :class="[item.color, 'w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-5 group-hover:rotate-12 transition-all shadow-lg']">
                <component :is="item.icon" class="w-7 h-7" />
              </div>
              <h4 class="font-black text-primary-900 dark:text-white text-xl mb-1 uppercase">{{ item.title }}</h4>
              <p class="text-xs text-primary-400 font-bold opacity-70">{{ item.desc }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
h2 { letter-spacing: -0.06em; }
canvas { filter: blur(2px) brightness(1.5); pointer-events: none; }
</style>
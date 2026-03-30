<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useThemeStore } from '../stores/themeStore';
import * as THREE from 'three';
import {
  Calendar,
  MapPin,
  ArrowUpRight,
  UtensilsCrossed,
  Users
} from 'lucide-vue-next';

import Image1 from '../assets/img/makrab/makrab1.jpg'
import Image2 from '../assets/img/bukber/bukber1.jpg'
import MainLayout from "../components/layouts/landing/MainLayout.vue";

const { t } = useI18n();
const themeStore = useThemeStore();
const canvasRef = ref(null);

const handleMouseMove = (e, id) => {
  const card = document.getElementById(`event-card-${id}`);
  if (!card) return;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  card.style.setProperty('--mouse-x', `${x}px`);
  card.style.setProperty('--mouse-y', `${y}px`);
};

let scene, camera, renderer, orbs = [];

const initThree = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const orbGroup = new THREE.Group();
  const geometry = new THREE.SphereGeometry(0.1, 16, 16);

  const getOrbColor = () => themeStore.isDark ? 0x9810fa : 0x155dfc;

  for (let i = 0; i < 40; i++) {
    const material = new THREE.MeshBasicMaterial({
      color: getOrbColor(),
      transparent: true,
      opacity: Math.random() * 0.4
    });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
    );

    const scale = Math.random() * 2;
    mesh.scale.set(scale, scale, scale);

    mesh.userData = { speed: Math.random() * 0.005 + 0.002 };
    orbs.push(mesh);
    orbGroup.add(mesh);
  }
  scene.add(orbGroup);

  const animate = () => {
    requestAnimationFrame(animate);
    orbs.forEach(orb => {
      orb.position.y += orb.userData.speed;
      if (orb.position.y > 5) orb.position.y = -5;
    });
    orbGroup.rotation.y += 0.001;
    renderer.render(scene, camera);
  };
  animate();

  watch(() => themeStore.isDark, () => {
    const newColor = getOrbColor();
    orbs.forEach(orb => orb.material.color.setHex(newColor));
  });
};

const handleResize = () => {
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

const events = ref([
  {
    id: 1,
    slug: 'makrab-angkatan-2025',
    titleKey: 'events.item1.title',
    date: '10 - 11 Januari 2026',
    location: 'Villa Guntur, Pacet',
    categoryKey: 'events.categories.makrab',
    icon: Users,
    image: Image1,
    descKey: 'events.item1.desc'
  },
  {
    id: 2,
    slug: 'ba-2026',
    titleKey: 'events.item2.title',
    date: '06 Maret 2026',
    location: 'SEI"NDONESIA',
    categoryKey: 'events.categories.others',
    icon: UtensilsCrossed,
    image: Image2,
    descKey: 'events.item2.desc'
  }
]);
</script>

<template>
  <MainLayout>
    <section id="events" class="py-24 bg-white dark:bg-primary-950 relative overflow-hidden transition-colors duration-500">

      <canvas ref="canvasRef" class="absolute inset-0 pointer-events-none z-0 opacity-60"></canvas>

      <div class="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div class="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-secondary-600/10 dark:bg-dark-600/10 blur-[120px] animate-pulse"></div>
        <div class="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-dark-600/10 dark:bg-secondary-600/10 blur-[120px] animate-pulse"></div>
      </div>

      <div class="max-w-6xl mx-auto px-6 relative z-10">

        <div class="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div class="max-w-xl">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-1 bg-secondary-600 dark:bg-dark-600 rounded-full"></div>
              <span class="text-secondary-600 dark:text-dark-400 font-black uppercase tracking-[0.4em] text-[10px]">
              {{ t('events.badge') }}
            </span>
            </div>
            <h2 class="text-4xl md:text-5xl font-black text-primary-900 dark:text-white leading-[1] tracking-tighter uppercase">
              {{ t('events.title_main') }} <span class="text-secondary-600 dark:text-dark-600 italic">{{ t('events.title_highlight') }}</span>
            </h2>
          </div>
        </div>

        <div class="max-w-5xl mx-auto space-y-10">
          <div
              v-for="(event, idx) in events"
              :key="event.id"
              :id="`event-card-${event.id}`"
              @mousemove="handleMouseMove($event, event.id)"
              v-motion
              :initial="{ opacity: 0, y: 30 }"
              :visible="{ opacity: 1, y: 0, transition: { delay: idx * 150, duration: 800 } }"
              class="event-card group relative bg-white/40 dark:bg-primary-900/10 backdrop-blur-[20px] rounded-[3rem] border border-white/60 dark:border-primary-800/40 overflow-hidden flex flex-col md:flex-row items-stretch transition-all duration-500 hover:shadow-2xl"
          >
            <div class="glow-overlay pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

            <div class="md:w-[35%] relative overflow-hidden min-h-[250px] z-20">
              <img
                  :src="event.image"
                  class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />
              <div class="absolute bottom-6 left-6 z-20">
                <div class="bg-white/20 backdrop-blur-xl border border-white/30 px-4 py-2 rounded-2xl flex items-center gap-2">
                  <component :is="event.icon" class="w-4 h-4 text-white" />
                  <span class="text-[10px] font-black text-white uppercase tracking-widest">
                  {{ t(event.categoryKey) }}
                </span>
                </div>
              </div>
            </div>

            <div class="flex-1 p-8 md:p-12 flex flex-col justify-between z-20 relative">
              <div>
                <div class="inline-flex items-center gap-3 mb-6 text-[10px] font-black text-primary-500 dark:text-primary-400 uppercase tracking-[0.2em] bg-white/50 dark:bg-primary-950/40 px-5 py-2.5 rounded-full border border-white/40 dark:border-primary-800/50 shadow-sm">
                  <Calendar class="w-4 h-4 text-secondary-600 dark:text-dark-400" />
                  {{ event.date }}
                </div>

                <h3 class="text-2xl md:text-4xl font-black text-primary-900 dark:text-white mb-5 group-hover:text-secondary-600 dark:group-hover:text-dark-400 transition-colors tracking-tighter uppercase leading-tight">
                  {{ t(event.titleKey) }}
                </h3>

                <p class="text-primary-500 dark:text-primary-400 text-base leading-relaxed mb-8 max-w-xl font-medium tracking-tight">
                  {{ t(event.descKey) }}
                </p>
              </div>

              <div class="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-primary-100/50 dark:border-primary-800/30">
                <div class="flex items-center gap-5 group/loc">
                  <div class="w-12 h-12 rounded-2xl bg-secondary-50/50 dark:bg-primary-900/50 backdrop-blur-md flex items-center justify-center text-secondary-600 dark:text-dark-400 shadow-sm transition-all group-hover/loc:bg-secondary-600 group-hover/loc:text-white">
                    <MapPin class="w-6 h-6" />
                  </div>
                  <div class="flex flex-col">
                  <span class="text-[9px] text-primary-400 font-black uppercase tracking-[0.3em] mb-1">
                    {{ t('events.location_label') }}
                  </span>
                    <span class="text-sm font-black text-primary-900 dark:text-white tracking-tight uppercase">{{ event.location }}</span>
                  </div>
                </div>

                <router-link
                    :to="`/gallery/${event.slug}`"
                    class="w-full sm:w-auto flex items-center justify-center gap-4 bg-primary-900 dark:bg-dark-600 text-white px-10 py-4.5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest hover:bg-secondary-600 dark:hover:bg-dark-700 transition-all active:scale-95 group/btn shadow-xl shadow-primary-900/10 dark:shadow-none"
                >
                  {{ t('events.btn_documentation') }}
                  <ArrowUpRight class="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<style scoped>
h2, h3 {
  letter-spacing: -0.05em;
}

/* Glow Follow Variables */
.event-card {
  --mouse-x: 0px;
  --mouse-y: 0px;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.05);
}

.glow-overlay {
  background: radial-gradient(
      600px circle at var(--mouse-x) var(--mouse-y),
      rgba(21, 93, 252, 0.08),
      transparent 40%
  );
}

:global(.dark) .glow-overlay {
  background: radial-gradient(
      600px circle at var(--mouse-x) var(--mouse-y),
      rgba(152, 16, 250, 0.15),
      transparent 40%
  );
}

:global(.dark) .event-card {
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.2);
}
</style>
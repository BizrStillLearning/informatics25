<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '../stores/themeStore'
import * as THREE from 'three'
import { Home, User, Lock, ArrowRight, ShieldCheck } from 'lucide-vue-next'
import { useAuthStore } from "../stores/authStore.js";
import { useRoute } from 'vue-router'
import api from '../api/axios.js'
import MainLayout from "../components/layouts/landing/MainLayout.vue";

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const themeStore = useThemeStore()
const authStore = useAuthStore()

const form = ref({ identifier: '', password: '' });
const error = ref('');
const isLoading = ref(false)
const canvasRef = ref(null)

let scene, camera, renderer, auroraMesh, particlesGeometry, points, frameId;
const particleCount = 800;

const initThree = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 100;

  renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const getThemeColor = () => themeStore.isDark ? 0x9810fa : 0x155dfc;

  const auroraGeo = new THREE.PlaneGeometry(600, 600);
  const auroraMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color(getThemeColor()) },
      uColor2: { value: new THREE.Color(themeStore.isDark ? 0x3c0366 : 0x00d2ff) }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      varying vec2 vUv;
      void main() {
        float speed = uTime * 0.15;
        float noise = sin(vUv.x * 4.0 + speed) * cos(vUv.y * 3.0 - speed) * 1.5;
        vec3 finalColor = mix(uColor1, uColor2, vUv.y + noise * 0.4);
        gl_FragColor = vec4(finalColor, 0.25);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  auroraMesh = new THREE.Mesh(auroraGeo, auroraMat);
  auroraMesh.position.z = -40;
  scene.add(auroraMesh);

  particlesGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = 0;
    positions[i * 3 + 1] = 0;
    positions[i * 3 + 2] = 0;

    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    const speed = 0.15 + Math.random() * 0.5; // Kecepatan ditambah

    velocities[i * 3] = Math.sin(phi) * Math.cos(theta) * speed;
    velocities[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;
    velocities[i * 3 + 2] = Math.cos(phi) * speed;
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

  const pointsMaterial = new THREE.PointsMaterial({
    color: getThemeColor(),
    size: 1.2,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  points = new THREE.Points(particlesGeometry, pointsMaterial);
  scene.add(points);

  const animate = (time) => {
    auroraMat.uniforms.uTime.value = time * 0.001;

    const posAttr = particlesGeometry.attributes.position.array;
    const velAttr = particlesGeometry.attributes.velocity.array;

    for (let i = 0; i < particleCount; i++) {
      posAttr[i * 3] += velAttr[i * 3];
      posAttr[i * 3 + 1] += velAttr[i * 3 + 1];
      posAttr[i * 3 + 2] += velAttr[i * 3 + 2];

      const dist = Math.sqrt(posAttr[i * 3]**2 + posAttr[i * 3 + 1]**2 + posAttr[i * 3 + 2]**2);
      if (dist > 120) {
        posAttr[i * 3] = 0;
        posAttr[i * 3 + 1] = 0;
        posAttr[i * 3 + 2] = 0;
      }
    }
    particlesGeometry.attributes.position.needsUpdate = true;
    points.rotation.z += 0.0015;

    renderer.render(scene, camera);
    frameId = requestAnimationFrame(animate);
  };
  frameId = requestAnimationFrame(animate);
};

watch(() => themeStore.isDark, (isDark) => {
  const color = isDark ? 0x9810fa : 0x155dfc;
  if (auroraMesh) auroraMesh.material.uniforms.uColor1.value.setHex(color);
  if (points) points.material.color.setHex(color);
});

const handleResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

onMounted(() => {
  initThree();
  window.addEventListener('resize', handleResize);

  if (route.query.session === 'expired') {
    error.value = "Sesi Anda telah berakhir (10 menit). Silakan login kembali.";
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  cancelAnimationFrame(frameId);
});

const handleLogin = async () => {
  if (!form.value.identifier || !form.value.password) {
    error.value = t('login.error_empty');
    return;
  }

  isLoading.value = true;
  error.value = '';

  try {
    const result = await authStore.login(form.value.identifier, form.value.password);

    if (result.success) {
      if (result.role === 'admin') {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard/student');
      }
    } else {
      error.value = result.message;
    }
  } catch (err) {
    error.value = "Terjadi kesalahan sistem.";
  } finally {
    isLoading.value = false;
  }
};

const goToLanding = () => router.push('/')
</script>

<template>

  <MainLayout>
    <div class="min-h-screen flex items-center justify-center relative overflow-hidden p-4 bg-white dark:bg-primary-950 transition-colors duration-500 selection:bg-secondary-600 selection:text-white">

      <canvas ref="canvasRef" class="absolute inset-0 z-0 pointer-events-none"></canvas>

      <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] md:w-[80%] md:h-[80%] rounded-full bg-secondary-600/10 dark:bg-dark-600/10 blur-[150px]"></div>
      </div>

      <button
          @click="goToLanding"
          class="absolute top-4 left-4 md:top-8 md:left-8 z-20 flex items-center gap-2 md:gap-3 px-4 py-2 md:px-6 md:py-3 bg-white/50 dark:bg-primary-900/40 backdrop-blur-xl text-primary-900 dark:text-primary-100 rounded-xl md:rounded-2xl shadow-sm border border-white/50 dark:border-primary-800 transition-all active:scale-95 text-[10px] font-black uppercase tracking-widest"
      >
        <Home class="w-3.5 h-3.5 md:w-4 md:h-4 text-secondary-600 dark:text-dark-600" />
        <span>{{ t('login.back') }}</span>
      </button>

      <div
          class="w-full max-w-[420px] p-6 sm:p-10 bg-white/60 dark:bg-primary-900/20 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl z-10 border border-white dark:border-primary-800"
          v-motion
          :initial="{ opacity: 0, y: 30, scale: 0.95 }"
          :enter="{ opacity: 1, y: 0, scale: 1, transition: { duration: 800 } }"
      >
        <div class="text-center mb-8 md:mb-12">
          <div class="w-14 h-14 md:w-18 md:h-18 bg-secondary-600 dark:bg-dark-600 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-8 shadow-2xl shadow-secondary-600/20">
            <ShieldCheck class="w-8 h-8 md:w-10 md:h-10 text-white" />
          </div>
          <h1 class="text-3xl md:text-4xl font-black text-primary-900 dark:text-white tracking-tighter uppercase leading-none">
            {{ t('login.title_part1') }} <span class="text-secondary-600 dark:text-dark-600 italic">{{ t('login.title_highlight') }}</span>
          </h1>
          <p class="text-primary-400 dark:text-primary-500 mt-3 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">{{ t('login.badge') }}</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4 md:space-y-6">
          <div class="space-y-2">
            <label class="text-[9px] font-black text-primary-400 uppercase tracking-[0.3em] ml-2">{{ t('login.label_user') }}</label>
            <div class="relative group">
              <User class="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-primary-300 group-focus-within:text-secondary-600 dark:group-focus-within:text-dark-600 transition-colors" />
              <input v-model="form.identifier" type="text" class="w-full pl-12 md:pl-14 pr-6 py-4 md:py-5 bg-white/50 dark:bg-primary-950/40 border border-primary-100 dark:border-primary-800 rounded-xl md:rounded-2xl focus:outline-none focus:border-secondary-600 dark:focus:border-dark-600 dark:text-white transition-all font-bold text-sm" placeholder="admin" />
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-[9px] font-black text-primary-400 uppercase tracking-[0.3em] ml-2">{{ t('login.label_pass') }}</label>
            <div class="relative group">
              <Lock class="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-primary-300 group-focus-within:text-secondary-600  dark:group-focus-within:text-dark-600  transition-colors" />
              <input v-model="form.password" type="password" class="w-full pl-12 md:pl-14 pr-6 py-4 md:py-5 bg-white/50 dark:bg-primary-950/40 border border-primary-100 dark:border-primary-800 rounded-xl md:rounded-2xl focus:outline-none focus:border-secondary-600 dark:focus:border-dark-600 dark:text-white transition-all font-bold text-sm" placeholder="••••••••" />
            </div>
          </div>

          <Transition name="fade">
            <div v-if="error" class="p-3 md:p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-[9px] md:text-[10px] font-black uppercase tracking-wider rounded-xl flex items-center gap-3">
              <div class="w-1 h-1 rounded-full bg-red-500 animate-ping"></div>
              {{ error }}
            </div>
          </Transition>

          <button type="submit" :disabled="isLoading" class="w-full py-4 md:py-5 bg-secondary-600 dark:bg-dark-600 hover:bg-secondary-700 dark:hover:bg-dark-700 text-white rounded-xl md:rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-3">
            <span v-if="!isLoading">{{ t('login.btn_login') }}</span>
            <ArrowRight v-if="!isLoading" class="w-4 h-4" />
            <div v-else class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          </button>
        </form>

        <div class="mt-8 md:mt-12 text-center border-t border-primary-50 dark:border-primary-800 pt-6 md:pt-8">
          <p class="text-[8px] md:text-[9px] font-black text-primary-300 uppercase tracking-[0.3em]">© 2026 {{ t('login.footer') }}</p>
        </div>
      </div>
    </div>

  </MainLayout>
</template>

<style scoped>
h1 { letter-spacing: -0.05em; }
canvas { filter: blur(20px) contrast(1.1); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
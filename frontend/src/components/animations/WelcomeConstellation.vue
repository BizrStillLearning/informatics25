<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import * as THREE from 'three';

const canvasRef = ref(null);
const typedTextHtml = ref('');
const isTypingFinished = ref(false);

const fullText = "SELAMAT DATANG DI WEBSITE_<>ANGKATAN 2025_<>INITIALIZING PROTOCOL_";
let charIndex = 0;

let scene, camera, renderer, starPoints, animationId;
let isComponentMounted = true;

const initStarfield = () => {
  if (!canvasRef.value) return;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.z = 1;

  renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const starsCount = 3000;
  const positions = new Float32Array(starsCount * 3);
  const velocities = new Float32Array(starsCount);

  for (let i = 0; i < starsCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 2000;
    positions[i3 + 1] = (Math.random() - 0.5) * 2000;
    positions[i3 + 2] = Math.random() * -2000;
    velocities[i] = Math.random() * 5 + 2;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    color: 0x10b981, size: 2, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending
  });

  starPoints = new THREE.Points(geometry, material);
  scene.add(starPoints);

  const animate = () => {
    if (!isComponentMounted) return;
    animationId = requestAnimationFrame(animate);
    const posAttr = starPoints.geometry.attributes.position;
    for (let i = 0; i < starsCount; i++) {
      const i3 = i * 3;
      posAttr.array[i3 + 2] += velocities[i];
      if (posAttr.array[i3 + 2] > 0) posAttr.array[i3 + 2] = -2000;
    }
    posAttr.needsUpdate = true;
    renderer.render(scene, camera);
  };
  animate();
};

const typeEffect = () => {
  if (!isComponentMounted) return;
  if (charIndex < fullText.length) {
    if (fullText.substring(charIndex, charIndex + 4) === "_<>_") {
      typedTextHtml.value += '<br/>';
      charIndex += 4;
    } else {
      typedTextHtml.value += fullText.charAt(charIndex);
      charIndex++;
    }
    setTimeout(typeEffect, 50);
  } else {
    setTimeout(() => { isTypingFinished.value = true; }, 1500);
  }
};

onMounted(() => {
  initStarfield();
  typeEffect();
});

onUnmounted(() => {
  isComponentMounted = false;
  cancelAnimationFrame(animationId);
  if (renderer) {
    renderer.dispose();
  }
});
</script>

<template>
  <div class="fixed inset-0 z-[99999] bg-[#030712] flex items-center justify-center overflow-hidden">
    <canvas ref="canvasRef" class="absolute inset-0 z-0 pointer-events-none"></canvas>
    <div class="relative z-10 w-full max-w-5xl text-center px-10">
      <Transition enter-active-class="transition duration-500 ease-out" leave-active-class="transition duration-1000 ease-in" enter-from-class="opacity-0 scale-95" leave-to-class="opacity-0 scale-110 blur-lg">
        <div v-if="!isTypingFinished" class="text-center font-mono">
          <h1 class="text-white font-black text-2xl md:text-5xl uppercase italic tracking-widest leading-tight" v-html="typedTextHtml"></h1>
          <span class="inline-block w-2 h-8 md:h-12 bg-secondary-600 animate-pulse ml-2"></span>
        </div>
      </Transition>
    </div>
  </div>
</template>
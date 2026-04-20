<script setup>
import { ref, onMounted } from 'vue';
import MainLayout from '../components/layouts/landing/MainLayout.vue';
import Hero from '../components/Hero.vue';
import About from '../components/About.vue';
import Struktur from '../components/Struktur.vue';
import Galleri from '../components/Galleri.vue';
import WelcomeConstellation from '../components/animations/WelcomeConstellation.vue';

const showWelcome = ref(false);
const renderContent = ref(false);
const showContent = ref(false);

onMounted(() => {
  const isSafeWindow = typeof window !== 'undefined' && window.sessionStorage;
  const hasSeen = isSafeWindow ? window.sessionStorage.getItem('protocol_init') : null;

  if (!hasSeen) {
    showWelcome.value = true;
    if (typeof document !== 'undefined') document.body.style.overflow = 'hidden';

    setTimeout(() => {
      renderContent.value = true;
    }, 3000);

    setTimeout(() => {
      showWelcome.value = false;
      showContent.value = true;
      if (isSafeWindow) window.sessionStorage.setItem('protocol_init', 'true');
      if (typeof document !== 'undefined') document.body.style.overflow = '';
    }, 5500);
  } else {
    renderContent.value = true;
    showContent.value = true;
    showWelcome.value = false;
  }
});
</script>

<template>
  <div class="relative min-h-screen bg-[#030712]">
    <Transition leave-active-class="transition duration-1000 ease-in-out" leave-to-class="opacity-0 scale-110 blur-2xl">
      <WelcomeConstellation v-if="showWelcome" class="z-[100]" />
    </Transition>

    <div v-if="renderContent" class="transition-all duration-1000 ease-out" :class="showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'">
      <MainLayout>
        <main class="overflow-x-hidden">
          <Hero :isReady="showContent" />
          <div v-motion :initial="{ opacity: 0, y: 20 }" :visible="{ opacity: 1, y: 0, transition: { duration: 1000 } }">
            <About />
          </div>
          <Struktur />
          <Galleri />
        </main>
      </MainLayout>
    </div>
  </div>
</template>
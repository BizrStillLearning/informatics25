<script setup>
import { ref, onMounted } from 'vue';
import Carousel from "./Carousel.vue";

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
    isDeleting = true; typeSpeed = 2000;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    messageIndex = (messageIndex + 1) % terminalMessages.length;
    typeSpeed = 500;
  }
  setTimeout(typeEffect, typeSpeed);
};

onMounted(() => {
  typeEffect();
});
</script>

<template>
  <div class="bg-white dark:bg-primary-950 min-h-screen w-full overflow-hidden transition-colors duration-700">
    <section class="relative h-screen w-full overflow-hidden">

      <div class="absolute top-28 left-6 md:left-12 z-50 pointer-events-none hidden sm:block">
        <div class="glass-card p-4 rounded-2xl border-l-4 border-l-secondary-600 space-y-3 shadow-2xl bg-white/10 dark:bg-black/20 backdrop-blur-md">
          <div class="flex items-center gap-3">
            <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <p class="text-[9px] font-black text-primary-400 uppercase tracking-[0.3em]">Node: Region_Surabaya</p>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex flex-col text-left">
              <span class="text-[8px] text-primary-400 font-bold uppercase tracking-widest">Core_Temp</span>
              <span class="text-xs font-black text-primary-900 dark:text-white">32.4°C</span>
            </div>
            <div class="w-[1px] h-6 bg-primary-100 dark:bg-white/10"></div>
            <div class="flex flex-col text-left">
              <span class="text-[8px] text-primary-400 font-bold uppercase tracking-widest">Uptime</span>
              <span class="text-xs font-black text-primary-900 dark:text-white">99.9%</span>
            </div>
          </div>
        </div>
      </div>

      <Carousel :typedText="typedText" />

    </section>
  </div>
</template>
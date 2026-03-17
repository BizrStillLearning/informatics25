<script setup>
import { onMounted } from 'vue';
import Hero from '../components/Hero.vue';
import About from '../components/About.vue';
import Struktur from '../components/Struktur.vue';
import Galleri from '../components/Galleri.vue';
</script>

<template>
  <main class="overflow-x-hidden bg-white dark:bg-primary-950 transition-colors duration-500">

    <Hero />

    <div
        v-motion
        :initial="{ opacity: 0 }"
        :visible="{ opacity: 1, transition: { duration: 1000 } }"
    >
      <About />
    </div>

    <Struktur />
    <Galleri />

  </main>
</template>

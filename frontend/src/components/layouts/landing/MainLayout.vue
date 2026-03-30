<script setup>
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';
</script>

<template>
  <div class="overflow-hidden">
    <Navbar />
    <slot />
    <Footer />
  </div>
</template>
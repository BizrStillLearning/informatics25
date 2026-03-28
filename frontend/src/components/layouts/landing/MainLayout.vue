<script setup>
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';
</script>

<template>
  <div>
    <Navbar />
    <slot />
    <Footer />
  </div>
</template>
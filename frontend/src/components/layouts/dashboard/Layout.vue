<script setup>
import { ref } from 'vue';
import Sidebar from '../dashboard/Sidebar.vue';
import Header from '../dashboard/Header.vue';

const isCollapsed = ref(false);
const userRole = ref(localStorage.getItem('role') || 'admin');
</script>

<template>
  <div class="flex min-h-screen transition-colors duration-500 bg-primary-50 dark:bg-gradient-to-br dark:from-slate-950 dark:via-indigo-950 dark:to-slate-950">
    <Sidebar :is-collapsed="isCollapsed" :role="userRole" />

    <div class="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
      <Header @toggle="isCollapsed = !isCollapsed" :is-collapsed="isCollapsed" />

      <main class="flex-1 overflow-y-auto p-6 md:p-10 custom-scroll">
        <div class="max-w-7xl mx-auto">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
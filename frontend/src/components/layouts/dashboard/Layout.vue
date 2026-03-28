<script setup>
import { ref } from 'vue';
import Sidebar from '../dashboard/Sidebar.vue';
import Header from '../dashboard/Header.vue';

const isCollapsed = ref(false);

const userRole = ref('admin');
</script>

<template>
  <div class="flex min-h-screen bg-white dark:bg-[#050505]">
    <Sidebar :is-collapsed="isCollapsed" :role="userRole" />
    <div class="flex-1 flex flex-col min-w-0">
      <Header @toggle="isCollapsed = !isCollapsed" />
      <main class="flex-1 overflow-y-auto p-6 md:p-10 scrollbar-hide">
        <slot />
      </main>
    </div>
  </div>
</template>
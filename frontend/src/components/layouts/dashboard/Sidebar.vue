<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { menuAside } from '../../../config/menuAside.js'; // Import config tadi

const props = defineProps({
  isCollapsed: Boolean,
  role: {
    type: String,
    default: 'admin' // Defaultnya admin, bisa diubah jadi 'mahasiswa'
  }
});

const route = useRoute();

// Ambil menu berdasarkan role yang dikirim lewat props
const currentMenuItems = computed(() => {
  return menuAside[props.role] || menuAside.admin;
});

const isActive = (path) => route.path === path;
</script>

<template>
  <aside
      class="hidden lg:flex flex-col h-screen sticky top-0 p-4 z-50 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
      :class="isCollapsed ? 'w-24' : 'w-72'"
  >
    <div class="w-full h-full bg-white/10 dark:bg-primary-950/20 backdrop-blur-[30px] backdrop-saturate-[180%] border border-white/20 dark:border-white/5 rounded-[2.5rem] flex flex-col shadow-[0_4px_30px_rgba(0,0,0,0.1)] overflow-hidden relative transition-all duration-500">

      <div class="p-6 mb-4 flex justify-center border-b border-white/5">
        <div class="flex items-center gap-3 group">
          <div class="w-10 h-10 bg-white/40 dark:bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/40">
            <img src="../../src/assets/img/logo.png" alt="Logo" class="w-full h-full object-cover" />
          </div>
          <div
              class="flex flex-col transition-all duration-500"
              :class="isCollapsed ? 'opacity-0 scale-90 invisible w-0' : 'opacity-100 scale-100 visible'"
          >
            <span class="font-black text-[14px] tracking-tighter text-primary-900 dark:text-white uppercase leading-none">
              Informatics<span class="text-secondary-600 dark:text-dark-400">25</span>
            </span>
            <span class="text-[6px] font-black text-primary-400 dark:text-primary-500 uppercase tracking-[0.4em] mt-1 whitespace-nowrap">Core Protocol</span>
          </div>
        </div>
      </div>

      <nav class="flex-1 px-3 space-y-4 overflow-y-auto scrollbar-hide flex flex-col items-center py-6">
        <router-link
            v-for="(item, idx) in currentMenuItems"
            :key="item.id"
            :to="item.path"
            class="flex items-center transition-all duration-500 group relative menu-item"
            :style="{ animationDelay: `${idx * 0.05}s` }"
            :class="[
            isActive(item.path)
              ? 'bg-secondary-600/10 dark:bg-secondary-600/20 text-secondary-600 dark:text-white border border-secondary-600/20'
              : 'text-primary-400 hover:text-secondary-600 dark:hover:text-dark-400 hover:bg-white/5',
            isCollapsed ? 'justify-center h-14 w-14 rounded-2xl' : 'w-full px-5 py-3.5 gap-4 rounded-2xl hover:translate-x-1'
          ]"
        >
          <component
              :is="item.icon"
              class="transition-all duration-500 shrink-0"
              :class="[
                isCollapsed ? 'w-5 h-5' : 'w-4 h-4',
                isActive(item.path) ? 'text-secondary-600 scale-105' : 'group-hover:scale-110'
              ]"
          />

          <span
              v-if="!isCollapsed"
              class="font-black text-[9px] uppercase tracking-[0.2em] transition-all duration-500"
          >
            {{ item.name }}
          </span>

          <div
              v-if="isActive(item.path) && isCollapsed"
              class="absolute bottom-1.5 w-4 h-0.5 bg-secondary-600 rounded-full shadow-[0_0_10px_#155dfc]"
          ></div>
        </router-link>
      </nav>

      <div class="p-8 border-t border-white/5 flex flex-col items-center">
        <div class="flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-secondary-600 dark:bg-dark-600 animate-pulse"></span>
          <p v-if="!isCollapsed" class="text-[8px] font-black text-primary-500 dark:text-primary-400 uppercase tracking-widest">
            {{ role === 'admin' ? 'ROOT ACCESS' : 'STUDENT ACCESS' }}
          </p>
        </div>
      </div>
    </div>
  </aside>
</template>
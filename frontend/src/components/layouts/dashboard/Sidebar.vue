<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { menuAside } from '../../../config/menuAside.js';
import { LayoutDashboard } from 'lucide-vue-next';

const props = defineProps({
  isCollapsed: Boolean,
  role: {
    type: String,
    default: 'admin'
  }
});

const route = useRoute();

const currentMenuItems = computed(() => {
  return menuAside[props.role] || menuAside.admin;
});

const isActive = (path) => route.path === path;
</script>

<template>
  <aside
      class="hidden lg:flex flex-col h-screen sticky top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
      :class="isCollapsed ? 'w-28 p-4' : 'w-80 p-6'"
  >
    <div class="w-full h-full bg-white/10 dark:bg-primary-950/40 backdrop-blur-[40px] border border-white/20 dark:border-white/5 rounded-[2.5rem] flex flex-col shadow-2xl overflow-hidden relative transition-all duration-500">

      <div class="p-6 mb-2 flex items-center border-b border-white/5 overflow-hidden" :class="isCollapsed ? 'justify-center' : 'justify-start px-8'">
        <div class="flex items-center gap-4 group">
          <div class="w-10 h-10 bg-secondary-600/20 text-secondary-600 dark:text-dark-400 rounded-2xl flex items-center justify-center shrink-0 border border-secondary-600/30 dark:border-dark-600/30 group-hover:rotate-12 transition-transform duration-500">
            <LayoutDashboard class="w-5 h-5" />
          </div>
          <div
              class="flex flex-col transition-all duration-500 origin-left"
              :class="isCollapsed ? 'opacity-0 scale-75 absolute -translate-x-10 pointer-events-none' : 'opacity-100 scale-100'"
          >
            <span class="font-black text-[14px] tracking-tighter text-primary-900 dark:text-white uppercase leading-none">
              Informatics<span class="text-secondary-600 dark:text-dark-400">25</span>
            </span>
            <span class="text-[7px] font-black text-primary-400 dark:text-primary-500 uppercase tracking-[0.3em] mt-1 whitespace-nowrap">Core Protocol</span>
          </div>
        </div>
      </div>

      <nav class="flex-1 px-4 space-y-2 overflow-y-auto scrollbar-hide py-6 flex flex-col items-center">
        <router-link
            v-for="(item, idx) in currentMenuItems"
            :key="item.id"
            :to="item.path"
            class="flex items-center transition-all duration-300 group relative"
            :class="[
              isActive(item.path)
                ? 'bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/30 dark:border-white/10 text-secondary-600 dark:text-white shadow-lg'
                : 'text-primary-400 hover:text-secondary-600 dark:hover:text-dark-400 hover:bg-white/5',
              isCollapsed ? 'justify-center h-12 w-12 rounded-2xl' : 'w-full px-5 py-4 gap-4 rounded-2xl'
            ]"
        >
          <component
              :is="item.icon"
              class="transition-all duration-300 shrink-0"
              :class="[
                isCollapsed ? 'w-5 h-5' : 'w-4.5 h-4.5',
                isActive(item.path) ? 'text-secondary-600 dark:text-dark-600 scale-110' : 'group-hover:scale-110'
              ]"
          />

          <span
              v-if="!isCollapsed"
              class="font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 whitespace-nowrap"
          >
            {{ item.name }}
          </span>

          <div
              v-if="isCollapsed"
              class="absolute left-20 px-4 py-2 bg-primary-900/90 backdrop-blur-xl text-white text-[10px] font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 pointer-events-none shadow-xl border border-white/10 z-[100] whitespace-nowrap"
          >
            {{ item.name }}
            <div class="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-primary-900/90 rotate-45 border-l border-b border-white/10"></div>
          </div>
        </router-link>
      </nav>

      <div class="p-8 border-t border-white/5 flex flex-col items-center bg-white/5">
        <div class="flex items-center gap-3">
          <div class="relative flex items-center justify-center">
            <span class="absolute w-3 h-3 rounded-full bg-secondary-600/40 animate-ping"></span>
            <span class="relative w-2 h-2 rounded-full bg-secondary-600 dark:bg-dark-600 border border-white/20"></span>
          </div>
          <p v-if="!isCollapsed" class="text-[9px] font-black text-primary-900 dark:text-white uppercase tracking-[0.2em]">
            {{ role === 'admin' ? 'Root Access' : 'Student Access' }}
          </p>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.router-link-active {
  transition: all 0.5s ease;
}
</style>
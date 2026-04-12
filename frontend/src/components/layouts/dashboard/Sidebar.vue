<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { menuAside } from '../../../config/menuAside.js';
import { GraduationCap, User, LogOut } from 'lucide-vue-next';
import { useAuthStore } from '../../../stores/authStore.js';

const props = defineProps({
  isCollapsed: Boolean,
  role: { type: String, default: 'admin' }
});

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const isHovered = ref(false);

const currentMenuItems = computed(() => menuAside[props.role] || menuAside.admin);

const isActive = (path) => {
  if (path === '/dashboard/admin' || path === '/dashboard/student') {
    return route.path === path;
  }
  return route.path.startsWith(path);
};

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<template>
  <aside
      class="hidden lg:flex flex-col h-screen sticky top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
      :class="[ props.isCollapsed && !isHovered ? 'w-28 p-4' : 'w-80 p-5' ]"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
  >
    <div class="glass-sidebar w-full h-full rounded-[2.5rem] flex flex-col relative overflow-hidden transition-all duration-500 border border-white/10 shadow-2xl">

      <div class="p-6 mb-2 flex items-center border-b border-primary-100 dark:border-white/10 shrink-0 h-24"
           :class="props.isCollapsed && !isHovered ? 'justify-center px-0' : 'justify-start gap-4 px-8'">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary-400 to-secondary-600 dark:from-emerald-400 dark:to-emerald-600 flex items-center justify-center shadow-lg shadow-secondary-600/20 shrink-0">
          <GraduationCap class="w-6 h-6 text-white" />
        </div>
        <div v-show="!props.isCollapsed || isHovered" class="flex flex-col origin-left animate-in fade-in slide-in-from-left-4">
          <span class="font-black text-base tracking-tighter text-primary-900 dark:text-white uppercase leading-none">
            Informatics<span class="text-secondary-600 dark:text-emerald-500">25</span>
          </span>
          <span class="text-[9px] font-black text-primary-400 uppercase tracking-[0.3em] mt-1.5 whitespace-nowrap">Core Protocol</span>
        </div>
      </div>

      <nav class="flex-1 px-3 space-y-2 overflow-y-auto scrollbar-hide py-6 flex flex-col"
           :class="props.isCollapsed && !isHovered ? 'items-center' : 'items-stretch'">

        <router-link
            v-for="item in currentMenuItems"
            :key="item.id"
            :to="item.path"
            class="flex items-center transition-all duration-300 group relative rounded-2xl border border-transparent"
            :class="[
              isActive(item.path)
                ? 'bg-secondary-600/10 dark:bg-white/10 border-secondary-600/20 dark:border-white/20 text-secondary-600 dark:text-white shadow-lg'
                : 'text-primary-400 hover:text-secondary-600 dark:hover:text-emerald-400 hover:bg-primary-50 dark:hover:bg-white/5',
              props.isCollapsed && !isHovered ? 'justify-center w-14 h-14' : 'w-full px-6 py-4 gap-4'
            ]"
        >
          <div v-if="isActive(item.path) && (!props.isCollapsed || isHovered)" class="absolute left-2 w-1 h-1 rounded-full bg-secondary-600 dark:bg-emerald-500"></div>

          <component
              :is="item.icon"
              class="w-5 h-5 shrink-0 transition-colors duration-300"
              :class="isActive(item.path) ? 'text-secondary-600 dark:text-emerald-400' : 'group-hover:text-secondary-600 dark:group-hover:text-emerald-400'"
          />

          <span v-show="!props.isCollapsed || isHovered" class="font-black text-[11px] uppercase tracking-[0.15em] whitespace-nowrap">
            {{ item.name }}
          </span>

          <div v-if="props.isCollapsed && !isHovered" class="absolute left-20 px-4 py-2 bg-primary-900/90 dark:bg-emerald-950/90 backdrop-blur-xl border border-white/10 text-white text-[10px] font-black uppercase rounded-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-[100] shadow-xl whitespace-nowrap">
            {{ item.name }}
          </div>
        </router-link>
      </nav>

      <div class="px-3 pb-4 space-y-2 border-t border-primary-100 dark:border-white/10 pt-6"
           :class="props.isCollapsed && !isHovered ? 'flex flex-col items-center' : ''">

        <router-link
            to="/dashboard/profile"
            class="flex items-center transition-all duration-300 group relative rounded-2xl border border-transparent"
            :class="[
              isActive('/dashboard/profile')
                ? 'bg-secondary-600/10 dark:bg-white/10 border-secondary-600/20 dark:border-white/20 text-secondary-600 dark:text-white shadow-lg'
                : 'text-primary-400 hover:text-secondary-600 dark:hover:text-emerald-400 hover:bg-primary-50 dark:hover:bg-white/5',
              props.isCollapsed && !isHovered ? 'justify-center w-14 h-14' : 'w-full px-6 py-4 gap-4'
            ]"
        >
          <User class="w-5 h-5 shrink-0" />
          <span v-show="!props.isCollapsed || isHovered" class="font-black text-[11px] uppercase tracking-[0.15em] whitespace-nowrap">My Profile</span>

          <div v-if="props.isCollapsed && !isHovered" class="absolute left-20 px-4 py-2 bg-primary-900/90 dark:bg-emerald-950/90 backdrop-blur-xl border border-white/10 text-white text-[10px] font-black uppercase rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap z-[100]">
            Profile
          </div>
        </router-link>

        <button
            @click="handleLogout"
            class="flex items-center transition-all duration-300 group relative rounded-2xl text-red-500 hover:bg-red-500/10"
            :class="[
              props.isCollapsed && !isHovered ? 'justify-center w-14 h-14' : 'w-full px-6 py-4 gap-4'
            ]"
        >
          <LogOut class="w-5 h-5 shrink-0" />
          <span v-show="!props.isCollapsed || isHovered" class="font-black text-[11px] uppercase tracking-[0.15em] whitespace-nowrap">Terminate</span>

          <div v-if="props.isCollapsed && !isHovered" class="absolute left-20 px-4 py-2 bg-red-600 border border-white/10 text-white text-[10px] font-black uppercase rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap z-[100] shadow-lg shadow-red-600/20">
            Logout
          </div>
        </button>
      </div>

      <div class="p-6 bg-primary-50/50 dark:bg-white/5 border-t border-primary-100 dark:border-white/10">
        <div v-show="!props.isCollapsed || isHovered" class="flex items-center gap-3 justify-center animate-in fade-in">
          <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <p class="text-[9px] font-black text-primary-400 uppercase tracking-widest">Protocol Active</p>
        </div>
        <div v-show="props.isCollapsed && !isHovered" class="flex justify-center">
          <div class="w-1.5 h-1.5 rounded-full bg-secondary-400 animate-pulse"></div>
        </div>
      </div>
    </div>
  </aside>
</template>
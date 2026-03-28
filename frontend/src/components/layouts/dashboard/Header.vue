<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import {
  Bell, Menu, Sun, Moon, User,
  Settings, LogOut, ShieldCheck, MessageSquare
} from 'lucide-vue-next';
import { useThemeStore } from '../../../stores/themeStore.js';

const themeStore = useThemeStore();
const emit = defineEmits(['toggle']);

const showNotifications = ref(false);
const showProfileMenu = ref(false);

// Dummy Data
const notifications = [
  { id: 1, title: 'User Baru', desc: 'Mahasiswa baru terdaftar di IF25', time: '2m ago', icon: User },
  { id: 2, title: 'Update Sistem', desc: 'Core Protocol V1.0.4 Stable', time: '1h ago', icon: ShieldCheck },
];

// Close dropdown when clicking outside
const closeDropdowns = (e) => {
  if (!e.target.closest('.dropdown-trigger')) {
    showNotifications.value = false;
    showProfileMenu.value = false;
  }
};

onMounted(() => window.addEventListener('click', closeDropdowns));
onBeforeUnmount(() => window.removeEventListener('click', closeDropdowns));
</script>

<template>
  <header class="h-24 px-8 flex items-center justify-between bg-white/40 dark:bg-primary-950/20 backdrop-blur-xl border-b border-primary-100 dark:border-white/5 sticky top-0 z-40">

    <div class="flex items-center gap-4">
      <button @click="emit('toggle')" class="nav-icon-btn lg:flex hidden">
        <Menu class="w-5 h-5" />
      </button>
      <button @click="emit('toggle')" class="nav-icon-btn lg:hidden flex">
        <Menu class="w-5 h-5" />
      </button>

      <h2 class="text-primary-900 dark:text-white font-black uppercase text-[10px] tracking-[0.3em] ml-2 hidden md:block">
        Management <span class="text-secondary-600 dark:text-dark-400">Protocol</span>
      </h2>
    </div>

    <div class="flex items-center gap-4 md:gap-6">
      <button @click="themeStore.toggleTheme()" class="nav-icon-btn">
        <Transition name="fade-icon" mode="out-in">
          <Sun v-if="themeStore.isDark" :key="'sun'" class="w-5 h-5 text-dark-400" />
          <Moon v-else :key="'moon'" class="w-5 h-5 text-secondary-600" />
        </Transition>
      </button>

      <div class="relative dropdown-trigger">
        <button @click="showNotifications = !showNotifications" class="nav-icon-btn">
          <Bell class="w-5 h-5" />
          <span class="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-primary-950"></span>
        </button>

        <Transition name="fade">
          <div v-if="showNotifications" class="dropdown-glass w-80">
            <div class="p-6 border-b border-primary-100 dark:border-white/5">
              <p class="text-[10px] font-black uppercase tracking-widest text-primary-900 dark:text-white">Notifications</p>
            </div>
            <div class="max-h-80 overflow-y-auto scrollbar-hide">
              <div v-for="n in notifications" :key="n.id" class="p-5 flex gap-4 hover:bg-primary-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                <div class="w-10 h-10 rounded-xl bg-secondary-600/10 flex items-center justify-center shrink-0">
                  <component :is="n.icon" class="w-4 h-4 text-secondary-600" />
                </div>
                <div>
                  <p class="text-[9px] font-black text-primary-900 dark:text-white uppercase leading-tight">{{ n.title }}</p>
                  <p class="text-[8px] font-bold text-primary-400 mt-1 leading-relaxed">{{ n.desc }}</p>
                  <span class="text-[7px] text-secondary-600 mt-2 block font-black uppercase">{{ n.time }}</span>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <div class="h-10 w-[1px] bg-primary-100 dark:bg-white/10 hidden sm:block"></div>

      <div class="relative dropdown-trigger">
        <div @click="showProfileMenu = !showProfileMenu" class="flex items-center gap-4 group cursor-pointer">
          <div class="text-right hidden sm:block leading-tight">
            <p class="text-[10px] font-black text-primary-900 dark:text-white uppercase tracking-tighter group-hover:text-secondary-600 transition-colors">Abidzar Dzakwan</p>
            <p class="text-[8px] font-bold text-secondary-600 dark:text-dark-400 uppercase tracking-widest mt-0.5">Super Admin</p>
          </div>
          <div class="relative group-hover:scale-105 transition-all duration-300">
            <img src="https://i.pravatar.cc/150?u=abidzar" class="w-12 h-12 rounded-2xl border-2 border-primary-100 dark:border-white/10 object-cover shadow-lg" />
            <div class="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-[#050505] rounded-full"></div>
          </div>
        </div>

        <Transition name="fade">
          <div v-if="showProfileMenu" class="dropdown-glass">
            <router-link to="/profile" class="dropdown-item">
              <User class="w-4 h-4" /> Profile Protocol
            </router-link>
            <router-link to="/settings" class="dropdown-item border-y border-primary-100 dark:border-white/5">
              <Settings class="w-4 h-4" /> Core Settings
            </router-link>
            <button class="dropdown-item text-red-500 dark:text-red-400 w-full">
              <LogOut class="w-4 h-4" /> Terminate System
            </button>
          </div>
        </Transition>
      </div>
    </div>
  </header>
</template>
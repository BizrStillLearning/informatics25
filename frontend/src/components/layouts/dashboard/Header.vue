<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  Bell, Menu, Sun, Moon, User,
  Settings, LogOut, ShieldCheck, Clock,
  UserCircle, ChevronDown, CreditCard
} from 'lucide-vue-next';
import { useThemeStore } from '../../../stores/themeStore.js';
import { useAuthStore } from '../../../stores/authStore.js';

const themeStore = useThemeStore();
const authStore = useAuthStore();
const router = useRouter();
const emit = defineEmits(['toggle']);

const showNotifications = ref(false);
const showProfileMenu = ref(false);
const currentTime = ref(new Date());
let timer = null;

const notifications = [
  { id: 1, title: 'User Baru', desc: 'Mahasiswa baru terdaftar di IF25', time: '2m ago', icon: User },
  { id: 2, title: 'Update Sistem', desc: 'Core Protocol V1.0.4 Stable', time: '1h ago', icon: ShieldCheck },
];

const closeDropdowns = (e) => {
  if (!e.target.closest('.dropdown-trigger')) {
    showNotifications.value = false;
    showProfileMenu.value = false;
  }
};

const formattedDate = computed(() => {
  return currentTime.value.toLocaleDateString('id-ID', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).toUpperCase();
});

const formattedTime = computed(() => {
  return currentTime.value.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
});

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};

onMounted(() => {
  window.addEventListener('click', closeDropdowns);
  timer = setInterval(() => {
    currentTime.value = new Date();
  }, 1000);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', closeDropdowns);
  if (timer) clearInterval(timer);
});
</script>

<template>
  <header class="h-24 px-8 flex items-center justify-between bg-white/40 dark:bg-primary-950/20 backdrop-blur-xl border-b border-primary-100 dark:border-white/5 sticky top-0 z-40 font-inter">

    <div class="flex items-center gap-4">
      <button @click="emit('toggle')" class="nav-icon-btn group">
        <Menu class="w-5 h-5 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform" />
      </button>
    </div>

    <div class="flex items-center gap-4 md:gap-6">

      <div class="hidden sm:flex items-center gap-3 px-4 py-2 bg-secondary-50/50 dark:bg-white/5 border border-primary-100 dark:border-white/10 rounded-2xl backdrop-blur-md shadow-sm">
        <div class="flex items-center gap-2 border-r border-primary-200 dark:border-white/10 pr-3">
          <span class="text-[9px] lg:text-[10px] font-black text-secondary-600 dark:text-dark-400 tracking-[0.15em] uppercase">
            {{ formattedDate }}
          </span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
          <span class="text-[11px] lg:text-xs font-black text-primary-900 dark:text-white tabular-nums tracking-widest font-mono">
            {{ formattedTime }}
          </span>
        </div>
      </div>

      <button @click="themeStore.toggleTheme()" class="nav-icon-btn group">
        <Transition name="fade-icon" mode="out-in">
          <Sun v-if="themeStore.isDark" :key="'sun'" class="w-5 h-5 text-dark-400 group-hover:rotate-90 transition-transform duration-500" />
          <Moon v-else :key="'moon'" class="w-5 h-5 text-secondary-600 group-hover:-rotate-12 transition-transform duration-500" />
        </Transition>
      </button>

      <div class="relative dropdown-trigger">
        <button @click="showNotifications = !showNotifications" class="nav-icon-btn group">
          <Bell class="w-5 h-5 text-primary-600 dark:text-primary-400 group-active:scale-90 transition-transform" />
          <span class="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-primary-950 animate-bounce"></span>
        </button>

        <Transition name="fade">
          <div v-if="showNotifications" class="dropdown-glass w-80 translate-y-2">
            <div class="p-5 border-b border-primary-100 dark:border-white/5 flex justify-between items-center">
              <p class="text-[10px] font-black uppercase tracking-widest text-primary-900 dark:text-white">System Logs</p>
              <span class="text-[8px] bg-secondary-600 text-white px-2 py-0.5 rounded-full font-bold">2 NEW</span>
            </div>
            <div class="max-h-80 overflow-y-auto scrollbar-hide">
              <div v-for="n in notifications" :key="n.id" class="p-5 flex gap-4 hover:bg-primary-50 dark:hover:bg-white/5 transition-colors cursor-pointer group/notif">
                <div class="w-10 h-10 rounded-xl bg-secondary-600/10 flex items-center justify-center shrink-0 group-hover/notif:bg-secondary-600/20 transition-colors">
                  <component :is="n.icon" class="w-4 h-4 text-secondary-600" />
                </div>
                <div>
                  <p class="text-[9px] font-black text-primary-900 dark:text-white uppercase leading-tight">{{ n.title }}</p>
                  <p class="text-[8px] font-bold text-primary-400 mt-1 leading-relaxed">{{ n.desc }}</p>
                  <span class="text-[7px] text-secondary-600 mt-2 block font-black uppercase tracking-tighter">{{ n.time }}</span>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <div class="h-8 w-[1px] bg-primary-100 dark:bg-white/10 hidden sm:block"></div>

      <div class="relative dropdown-trigger">
        <div @click="showProfileMenu = !showProfileMenu" class="flex items-center gap-3 group cursor-pointer select-none">
          <div class="text-right hidden sm:block leading-tight">
            <p class="text-[10px] font-black text-primary-900 dark:text-white uppercase tracking-tighter group-hover:text-secondary-600 transition-colors">
              {{ authStore.profile?.full_name || 'Informatics User' }}
            </p>
            <p class="text-[8px] font-bold text-secondary-600 dark:text-dark-400 uppercase tracking-widest mt-0.5 opacity-80 flex items-center justify-end gap-1">
              {{ authStore.role === 'admin' ? 'Super Admin' : 'Student Access' }}
              <ChevronDown class="w-2.5 h-2.5 transition-transform duration-300" :class="{'rotate-180': showProfileMenu}" />
            </p>
          </div>

          <div class="relative group-hover:scale-105 transition-all duration-300">
            <div class="w-12 h-12 rounded-2xl border-2 border-primary-100 dark:border-white/10 overflow-hidden shadow-lg group-hover:border-secondary-600 flex items-center justify-center bg-primary-50 dark:bg-primary-900">
<!--              <img v-if="authStore.profile?.avatar" :src="authStore.profile.avatar" class="w-full h-full object-cover" />-->
              <UserCircle class="w-8 h-8 text-primary-300 dark:text-primary-700" /> <!-- else -->
            </div>
            <div class="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-primary-950 rounded-full shadow-sm animate-pulse"></div>
          </div>
        </div>

        <Transition name="fade">
          <div v-if="showProfileMenu" class="dropdown-glass w-64 translate-y-2 overflow-hidden">
            <div class="p-4 bg-primary-50/50 dark:bg-white/5 border-b border-primary-100 dark:border-white/5 mb-2">
              <p class="text-[8px] font-black text-primary-400 uppercase tracking-widest mb-1">User Identity</p>
              <p class="text-xs font-black text-primary-900 dark:text-white truncate uppercase">{{ authStore.profile?.full_name || 'Informatics 25' }}</p>
            </div>

            <div class="p-2 space-y-1">
              <router-link to="/dashboard/profile" class="dropdown-item group/item">
                <div class="w-8 h-8 rounded-lg bg-secondary-600/10 flex items-center justify-center group-hover/item:bg-secondary-600 transition-colors">
                  <User class="w-4 h-4 text-secondary-600 group-hover/item:text-white" />
                </div>
                <span class="text-[10px] font-black uppercase tracking-widest text-primary-600 dark:text-primary-300">Profile Protocol</span>
              </router-link>

              <router-link to="/dashboard/settings" class="dropdown-item group/item">
                <div class="w-8 h-8 rounded-lg bg-primary-100 dark:bg-white/5 flex items-center justify-center group-hover/item:bg-secondary-600 transition-colors">
                  <Settings class="w-4 h-4 text-primary-400 group-hover/item:text-white" />
                </div>
                <span class="text-[10px] font-black uppercase tracking-widest text-primary-600 dark:text-primary-300">System Settings</span>
              </router-link>

              <router-link to="/dashboard/account" class="dropdown-item group/item border-t border-primary-100 dark:border-white/5 pt-3">
                <div class="w-8 h-8 rounded-lg bg-primary-100 dark:bg-white/5 flex items-center justify-center group-hover/item:bg-secondary-600 transition-colors">
                  <CreditCard class="w-4 h-4 text-primary-400 group-hover/item:text-white" />
                </div>
                <span class="text-[10px] font-black uppercase tracking-widest text-primary-600 dark:text-primary-300">Account Access</span>
              </router-link>

              <button @click="handleLogout" class="dropdown-item group/item text-red-500 w-full text-left mt-2">
                <div class="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center group-hover/item:bg-red-500 transition-colors">
                  <LogOut class="w-4 h-4 text-red-500 group-hover/item:text-white" />
                </div>
                <span class="text-[10px] font-black uppercase tracking-widest">Terminate System</span>
              </button>
            </div>
          </div>
        </Transition>
      </div>

    </div>
  </header>
</template>
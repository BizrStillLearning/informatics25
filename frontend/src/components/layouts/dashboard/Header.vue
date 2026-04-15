<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { storeToRefs } from 'pinia';
import {
  Bell, Sun, Moon, UserCircle,
  PanelLeftClose, PanelLeftOpen, Languages,
  MessageSquare, Calendar, MoreHorizontal, Clock
} from 'lucide-vue-next';
import { useThemeStore } from '../../../stores/themeStore.js';
import { useAuthStore } from '../../../stores/authStore.js';
import { useLangStore } from '../../../stores/langStore.js';

const props = defineProps({ isCollapsed: Boolean });
const emit = defineEmits(['toggle']);

const themeStore = useThemeStore();
const authStore = useAuthStore();
const langStore = useLangStore();

const { username, role, isAuthenticated } = storeToRefs(authStore);

const showNotifications = ref(false);
const showLangPicker = ref(false);
const currentTime = ref(new Date());
let timer = null;

const languages = [
  { code: 'ID', name: 'Indonesia' },
  { code: 'EN', name: 'English' },
  { code: 'AR', name: 'العربية' },
  { code: 'JP', name: '日本語' },
  { code: 'CN', name: '中文' },
  { code: 'KR', name: '한국어' }
];

const notifications = ref([
  { id: 1, user: 'Jessie Samson', avatar: 'https://i.pravatar.cc/150?u=jessie', message: 'Mentioned you in a comment.', timeAgo: '10M', fullDate: '10:41 AM April 8, 2026', actionIcon: MessageSquare, isRead: false },
  { id: 2, user: 'Jane Foster', avatar: 'https://i.pravatar.cc/150?u=jane', message: 'Created an event.', timeAgo: '20M', fullDate: '10:20 AM April 8, 2026', actionIcon: Calendar, isRead: true }
]);

const formattedDate = computed(() => currentTime.value.toLocaleDateString('id-ID', { weekday: 'short', day: '2-digit', month: 'short' }).toUpperCase());
const formattedTime = computed(() => currentTime.value.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));

const closeAllPopups = (e) => {
  if (!e.target.closest('.lang-trigger')) showLangPicker.value = false;
  if (!e.target.closest('.notif-trigger')) showNotifications.value = false;
};

const selectLang = (code) => {
  langStore.setLanguage(code);
  showLangPicker.value = false;
};

onMounted(() => {
  timer = setInterval(() => { currentTime.value = new Date(); }, 1000);
  window.addEventListener('click', closeAllPopups);
});

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
  window.removeEventListener('click', closeAllPopups);
});
</script>

<template>
  <header class="h-20 px-8 flex items-center justify-between glass-header sticky top-0 z-40">

    <div class="flex items-center gap-6">
      <button @click="emit('toggle')" class="nav-icon-btn group">
        <component :is="isCollapsed ? PanelLeftOpen : PanelLeftClose" class="w-5 h-5 group-hover:text-secondary-600 dark:group-hover:text-dark-600 transition-colors" />
      </button>

      <div class="hidden md:flex items-center gap-4 px-4 py-2 bg-primary-50 dark:bg-white/5 border border-primary-100 dark:border-white/10 rounded-2xl shadow-sm">
        <span class="text-[9px] font-black text-primary-400 tracking-[0.2em]">{{ formattedDate }}</span>
        <div class="w-[1px] h-3 bg-primary-200 dark:bg-white/20"></div>
        <div class="flex items-center gap-2">
          <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span class="text-xs font-black text-primary-900 dark:text-white tabular-nums tracking-widest font-mono">{{ formattedTime }}</span>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <div class="relative lang-trigger">
        <button @click.stop="showLangPicker = !showLangPicker" class="nav-icon-btn group" :class="showLangPicker ? 'text-secondary-600 border-secondary-600/50 dark:text-dark-600 dark:border-dark-600/50' : ''">
          <Languages class="w-5 h-5 transition-transform" :class="showLangPicker ? 'rotate-12' : ''" />
          <span class="absolute -bottom-1 -right-1 text-[8px] font-black bg-secondary-600 dark:bg-dark-600 text-white px-1.5 rounded shadow-sm ring-2 ring-white dark:ring-primary-950">{{ langStore.currentLocale }}</span>
        </button>

        <Transition name="fade">
          <div v-if="showLangPicker" class="dropdown-glass w-64 p-3 top-full mt-3">
            <p class="text-[8px] font-black text-primary-400 uppercase tracking-widest mb-3 px-2">Select Language</p>
            <div class="grid grid-cols-2 gap-1">
              <button
                  v-for="lang in languages" :key="lang.code"
                  @click="selectLang(lang.code)"
                  class="flex flex-col items-start p-3 rounded-xl transition-all border border-transparent"
                  :class="langStore.currentLocale === lang.code
                    ? 'bg-secondary-600/10 border-secondary-600/20 text-secondary-600 dark:bg-dark-600/10 dark:border-dark-600/20 dark:text-dark-600'
                    : 'hover:bg-primary-50 dark:hover:bg-white/5 text-primary-600 dark:text-primary-300'"
              >
                <span class="text-[10px] font-black uppercase tracking-tight">{{ lang.code }}</span>
                <span class="text-[9px] font-medium opacity-60">{{ lang.name }}</span>
              </button>
            </div>
          </div>
        </Transition>
      </div>

      <div class="relative notif-trigger">
        <button @click.stop="showNotifications = !showNotifications" class="nav-icon-btn group" :class="showNotifications ? 'text-secondary-600 border-secondary-600/50' : ''">
          <Bell class="w-5 h-5 transition-all" :class="showNotifications ? 'scale-110' : ''" />
          <span class="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-primary-950 animate-bounce"></span>
        </button>

        <Transition name="fade">
          <div v-if="showNotifications" class="dropdown-glass w-[400px] top-full mt-3 shadow-2xl overflow-hidden">
            <div class="p-5 flex justify-between items-center bg-white dark:bg-primary-900/50 border-b border-primary-50 dark:border-white/5">
              <h3 class="text-xs font-black text-primary-900 dark:text-white uppercase tracking-widest">Notifications</h3>
              <button class="text-[10px] font-bold text-secondary-600 dark:text-dark-400 hover:underline">Mark all as read</button>
            </div>

            <div class="max-h-[400px] overflow-y-auto custom-scroll">
              <div v-for="n in notifications" :key="n.id"
                   class="p-5 flex gap-4 border-b border-primary-50 dark:border-white/5 hover:bg-primary-50 dark:hover:bg-white/5 transition-all cursor-pointer relative group"
                   :class="!n.isRead ? 'bg-secondary-50/30 dark:bg-secondary-900/10' : ''"
              >
                <div class="relative shrink-0">
                  <img :src="n.avatar" class="w-12 h-12 rounded-full object-cover border-2 border-primary-100 dark:border-white/10">
                  <div class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white dark:bg-primary-800 shadow-sm flex items-center justify-center border border-primary-50 dark:border-white/10">
                    <component :is="n.actionIcon" class="w-3 h-3 text-secondary-600 dark:text-dark-400" />
                  </div>
                </div>

                <div class="flex-1 min-w-0">
                  <div class="flex justify-between items-start">
                    <p class="text-xs font-black text-primary-900 dark:text-white truncate">{{ n.user }}</p>
                    <span class="text-[10px] font-bold text-primary-400 uppercase ml-2">{{ n.timeAgo }}</span>
                  </div>
                  <p class="text-[11px] text-primary-500 dark:text-primary-400 mt-1 leading-relaxed">{{ n.message }}</p>
                  <div class="flex items-center gap-2 mt-3 text-primary-400 dark:text-primary-500">
                    <Clock class="w-3 h-3" />
                    <span class="text-[9px] font-black uppercase tracking-tight">{{ n.fullDate }}</span>
                  </div>
                </div>
              </div>
            </div>
            <button class="w-full p-4 text-center text-[10px] font-black text-secondary-600 dark:text-dark-400 uppercase tracking-[0.2em] bg-primary-50 dark:bg-white/5 border-t border-primary-50 dark:border-white/5">Notification history</button>
          </div>
        </Transition>
      </div>

      <button @click="themeStore.toggleTheme()" class="nav-icon-btn">
        <component :is="themeStore.isDark ? Sun : Moon" class="w-5 h-5" :class="themeStore.isDark ? 'text-dark-600' : 'text-secondary-600'" />
      </button>

      <div class="h-8 w-[1px] bg-primary-100 dark:bg-white/10 mx-2"></div>

      <div class="flex items-center gap-4 pl-2">
        <div v-if="isAuthenticated" class="hidden sm:block text-right leading-tight">
          <p class="text-[10px] font-black text-primary-900 dark:text-white uppercase tracking-tighter">
            {{ username }}
          </p>
          <p class="text-[8px] font-bold text-secondary-600 dark:text-dark-600 uppercase tracking-widest mt-0.5">
            {{ role?.toUpperCase() }} ACCESS
          </p>
        </div>

        <div class="relative group cursor-pointer" @click="$router.push('/dashboard/profile')">
          <div class="absolute inset-0 rounded-xl bg-emerald-500 animate-ping opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <div class="relative w-10 h-10 rounded-xl border-2 border-primary-200 dark:border-white/20 bg-secondary-600 dark:bg-dark-600 flex items-center justify-center shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
            <UserCircle class="w-7 h-7 text-white" />
            <div class="absolute bottom-1 right-1 w-2 h-2 bg-emerald-500 rounded-full border border-white dark:border-primary-950"></div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
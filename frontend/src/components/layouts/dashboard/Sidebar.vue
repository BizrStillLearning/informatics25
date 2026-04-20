<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { menuAside } from '../../../config/menuAside.js';
import { GraduationCap, User, LogOut } from 'lucide-vue-next';
import { useAuthStore } from '../../../stores/authStore.js';

const props = defineProps({
  isCollapsed: Boolean,
  role: { type: String, default: '' }
});

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const isHovered = ref(false);

const currentRole = computed(() => {
  return props.role || authStore.role || 'admin';
});

const currentMenuItems = computed(() => {
  return menuAside[currentRole.value] || menuAside.admin;
});

const basePath = computed(() => {
  return currentRole.value === 'admin'
      ? '/dashboard/admin'
      : '/dashboard/student';
});

// ✅ Active checker lebih aman
const isActive = (path) => {
  if (!path) return false;
  return route.path.startsWith(path);
};

// ✅ Logout
const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<template>
  <aside
      class="hidden lg:flex flex-col h-screen sticky top-0 z-50 transition-all duration-500"
      :class="[ props.isCollapsed && !isHovered ? 'w-28 p-4' : 'w-80 p-5' ]"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
  >
    <div class="glass-sidebar w-full h-full rounded-[2.5rem] flex flex-col relative overflow-hidden border border-white/10 shadow-2xl">

      <!-- LOGO -->
      <div
          class="p-6 mb-2 flex items-center border-b shrink-0 h-24"
          :class="props.isCollapsed && !isHovered ? 'justify-center px-0' : 'gap-4 px-8'"
      >
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary-400 to-secondary-600 flex items-center justify-center shadow-lg">
          <GraduationCap class="w-6 h-6 text-white" />
        </div>

        <div v-show="!props.isCollapsed || isHovered" class="flex flex-col">
          <span class="font-black text-base uppercase">
            Informatics<span class="text-secondary-600">25</span>
          </span>
          <span class="text-[9px] font-black text-primary-400 uppercase tracking-[0.3em]">
            Core Protocol
          </span>
        </div>
      </div>

      <!-- MENU -->
      <nav class="flex-1 px-3 space-y-2 overflow-y-auto py-6 flex flex-col"
           :class="props.isCollapsed && !isHovered ? 'items-center' : ''">

        <router-link
            v-for="item in currentMenuItems"
            :key="item.id"
            :to="item.path"
            class="flex items-center rounded-2xl transition-all group"
            :class="[
              isActive(item.path)
                ? 'bg-secondary-600/10 text-secondary-600'
                : 'text-primary-400 hover:text-secondary-600 hover:bg-primary-50',
              props.isCollapsed && !isHovered ? 'justify-center w-14 h-14' : 'w-full px-6 py-4 gap-4'
            ]"
        >
          <component :is="item.icon" class="w-5 h-5" />

          <span v-show="!props.isCollapsed || isHovered"
                class="font-black text-[11px] uppercase">
            {{ item.name }}
          </span>
        </router-link>
      </nav>

      <div class="px-3 pb-4 space-y-2 border-t pt-6"
           :class="props.isCollapsed && !isHovered ? 'flex flex-col items-center' : ''">

        <router-link
            :to="`${basePath}/profile`"
            class="flex items-center rounded-2xl transition-all group"
            :class="[
              isActive(`${basePath}/profile`)
                ? 'bg-secondary-600/10 text-secondary-600'
                : 'text-primary-400 hover:text-secondary-600 hover:bg-primary-50',
              props.isCollapsed && !isHovered ? 'justify-center w-14 h-14' : 'w-full px-6 py-4 gap-4'
            ]"
        >
          <User class="w-5 h-5" />
          <span v-show="!props.isCollapsed || isHovered"
                class="font-black text-[11px] uppercase">
            My Profile
          </span>
        </router-link>

        <button
            @click="handleLogout"
            class="flex items-center rounded-2xl text-red-500 hover:bg-red-500/10 transition-all"
            :class="props.isCollapsed && !isHovered ? 'justify-center w-14 h-14' : 'w-full px-6 py-4 gap-4'"
        >
          <LogOut class="w-5 h-5" />
          <span v-show="!props.isCollapsed || isHovered"
                class="font-black text-[11px] uppercase">
            Logout
          </span>
        </button>
      </div>

    </div>
  </aside>
</template>
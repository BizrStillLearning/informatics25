<script setup>
import { ref, computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { Menu, X, GraduationCap } from 'lucide-vue-next';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Tentang', path: '/about' },
  { name: 'Mahasiswa', path: '/students' },
  { name: 'Event', path: '/events' },
  { name: 'Statistik', path: '/stats' },
  { name: 'Buku Tamu', path: '/guestbook' },
];

const isOpen = ref(false);
const route = useRoute();

// Fungsi untuk menutup menu mobile saat link diklik
const closeMenu = () => {
  isOpen.value = false;
};

// Mengecek apakah route aktif
const isActive = (path) => {
  return route.path === path;
};
</script>

<template>
  <nav class="bg-white shadow-sm sticky top-0 z-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <RouterLink to="/" class="flex items-center gap-2">
            <GraduationCap class="h-8 w-8 text-blue-600" />
            <span class="font-bold text-xl text-gray-900">Niskala 2020</span>
          </RouterLink>
        </div>

        <div class="hidden md:flex items-center space-x-8">
          <RouterLink
              v-for="link in navLinks"
              :key="link.path"
              :to="link.path"
              class="text-sm font-medium transition-colors"
              :class="isActive(link.path) ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'"
          >
            {{ link.name }}
          </RouterLink>
          <RouterLink
              to="/admin"
              class="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Admin
          </RouterLink>
        </div>

        <div class="flex items-center md:hidden">
          <button
              @click="isOpen = !isOpen"
              class="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <component :is="isOpen ? X : Menu" class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>

    <div
        v-if="isOpen"
        v-motion
        :initial="{ opacity: 0, height: 0 }"
        :enter="{ opacity: 1, height: 'auto' }"
        :leave="{ opacity: 0, height: 0 }"
        class="md:hidden bg-white border-t overflow-hidden"
    >
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            @click="closeMenu"
            class="block px-3 py-2 rounded-md text-base font-medium"
            :class="isActive(link.path)
            ? 'bg-blue-50 text-blue-600'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
        >
          {{ link.name }}
        </RouterLink>
        <RouterLink
            to="/admin"
            @click="closeMenu"
            class="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 hover:bg-gray-800"
        >
          Admin Panel
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
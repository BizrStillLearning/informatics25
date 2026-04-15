<script setup>
import { ref } from 'vue';
import { Users, Image as ImageIcon, Calendar, BookOpen } from 'lucide-vue-next';
import StatCard from '../../../components/dashboard/StatCard.vue';
import Layout from "../../../components/layouts/dashboard/Layout.vue";
import { useAuthStore } from "../../../stores/authStore.js";
import { useRoute } from 'vue-router';

const authStore = useAuthStore();
const route = useRoute();

const stats = ref([
  { title: 'Total Mahasiswa', value: 148, icon: Users, trend: '+2 TODAY', color: 'from-blue-500/20 to-cyan-500/20', iconColor: 'text-blue-400', progress: '60%', progressBar: 'from-blue-500 to-cyan-500' },
  { title: 'Galeri Foto', value: 1250, icon: ImageIcon, trend: 'NEW ALBUM', color: 'from-purple-500/20 to-purple-600/20', iconColor: 'text-purple-400' },
  { title: 'Agenda Event', value: 8, icon: Calendar, trend: '2 UPCOMING', color: 'from-orange-500/20 to-red-500/20', iconColor: 'text-orange-400' },
  { title: 'E-Book Library', value: 42, icon: BookOpen, trend: 'V1.0 STABLE', color: 'from-emerald-500/20 to-teal-500/20', iconColor: 'text-emerald-400' }
]);
</script>

<template>
  <Layout>
    <div v-if="route.meta.isOverview" class="p-8 space-y-6">
      <div class="space-y-0.5">
        <h2 class="text-xl font-black text-primary-900 dark:text-white uppercase tracking-tighter">
          Selamat Datang,
          <span class="text-secondary-600 dark:text-dark-600">
            {{ authStore.profile?.full_name || authStore.username || 'Admin' }}
          </span>
        </h2>
        <p class="text-[8px] font-bold text-primary-400 dark:text-primary-500 uppercase tracking-[0.4em]">
          Root Access Monitoring Protocol v1.0
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard v-for="(item, index) in stats" :key="index" v-bind="item" />
      </div>
    </div>

    <router-view />
  </Layout>
</template>
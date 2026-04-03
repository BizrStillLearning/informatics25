<script setup>
import { ref, onMounted } from 'vue';
import { Users, Image, Calendar, BookOpen } from 'lucide-vue-next';
import StatCard from '../../components/dashboard/StatCard.vue';
import Layout from "../../components/layouts/dashboard/Layout.vue";
import {useAuthStore} from "../../stores/authStore.js";

const authStore = useAuthStore();

const stats = ref([
  {
    id: 1,
    title: 'Total Mahasiswa',
    value: 148,
    icon: Users,
    color: 'text-blue-500',
    trend: '+2 TODAY'
  },
  {
    id: 2,
    title: 'Galeri Foto',
    value: 1250,
    icon: Image,
    color: 'text-purple-500',
    trend: 'NEW ALBUM'
  },
  {
    id: 3,
    title: 'Agenda Event',
    value: 8,
    icon: Calendar,
    color: 'text-orange-500',
    trend: '2 UPCOMING'
  },
  {
    id: 4,
    title: 'E-Book Library',
    value: 42,
    icon: BookOpen,
    color: 'text-emerald-500',
    trend: 'V1.0 STABLE'
  }
]);
</script>

<template>
  <Layout>
    <div class="p-8 space-y-6">
      <div class="space-y-0.5">
        <h2 class="text-xl font-black text-primary-900 dark:text-white uppercase tracking-tighter">
          Selamat Datang,
          <span class="text-secondary-600 dark:text-dark-600">
      {{ authStore.profile?.full_name || authStore.role?.toUpperCase() || 'SUPER ADMIN' }}
    </span>
        </h2>
        <p class="text-[8px] font-bold text-primary-400 dark:text-primary-500 uppercase tracking-[0.4em]">
          Root Access Monitoring Protocol v1.0
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
            title="Total Mahasiswa"
            :value="148"
            :icon="Users"
            color="bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
        />

        <StatCard
            title="Galeri Foto"
            :value="1250"
            :icon="Image"
            color="bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400"
        />

        <StatCard
            title="Agenda Event"
            :value="8"
            :icon="Calendar"
            color="bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400"
        />

        <StatCard
            title="E-Book Library"
            :value="42"
            :icon="BookOpen"
            color="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        />
      </div>
    </div>
  </Layout>
</template>
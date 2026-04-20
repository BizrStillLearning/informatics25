<script setup>
import { ref } from 'vue';
import {
  GraduationCap, Calendar, ClipboardList,
  BookOpen, Target, TrendingUp
} from 'lucide-vue-next';
import Layout from "../../../components/layouts/dashboard/Layout.vue";
import StatCard from "../../../components/dashboard/StatCard.vue";
import { useAuthStore } from "../../../stores/authStore.js";
import { useRoute } from 'vue-router';

const authStore = useAuthStore();
const route = useRoute();

const studentStats = ref([
  { title: 'IPK Terakhir', value: '3.75', icon: TrendingUp, trend: 'TARGET: 3.8', color: 'from-emerald-500/20 to-teal-500/20', iconColor: 'text-emerald-400', progress: '90%', progressBar: 'from-emerald-500 to-teal-500' },
  { title: 'SKS Selesai', value: '42', icon: GraduationCap, trend: 'SEM 2 ACTIVE', color: 'from-blue-500/20 to-cyan-500/20', iconColor: 'text-blue-400' },
  { title: 'Tugas Aktif', value: '4', icon: ClipboardList, trend: '2 DUE TODAY', color: 'from-orange-500/20 to-red-500/20', iconColor: 'text-orange-400' },
  { title: 'Modul Terunduh', value: '12', icon: BookOpen, trend: 'V1.0 STABLE', color: 'from-purple-500/20 to-purple-600/20', iconColor: 'text-purple-400' }
]);
</script>

<template>
  <Layout>
    <div v-if="route.path === '/dashboard/student'" class="p-8 space-y-6">
      <div class="space-y-0.5">
        <h2 class="text-xl font-black text-primary-900 dark:text-white uppercase tracking-tighter">
          Dashboard <span class="text-secondary-600 dark:text-dark-600">{{ authStore.profile?.full_name || 'Student' }}</span>
        </h2>
        <p class="text-[8px] font-bold text-primary-400 dark:text-primary-500 uppercase tracking-[0.4em]">
          Academic Monitoring Protocol v1.0
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard v-for="(item, index) in studentStats" :key="index" v-bind="item" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 p-6 rounded-[2rem] shadow-xl">
          <h3 class="text-xs font-black text-white uppercase mb-4 flex items-center gap-2">
            <Calendar class="w-4 h-4 text-secondary-600" /> Jadwal Hari Ini
          </h3>
          <p class="text-[10px] text-primary-400 uppercase font-bold italic">No classes for today. Keep productive!</p>
        </div>
        <div class="bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 p-6 rounded-[2rem] shadow-xl">
          <h3 class="text-xs font-black text-white uppercase mb-4 flex items-center gap-2">
            <Target class="w-4 h-4 text-secondary-600" /> Pengumuman Terbaru
          </h3>
          <p class="text-[10px] text-primary-400 uppercase font-bold italic">Update: UTS Semester Genap akan dilaksanakan...</p>
        </div>
      </div>
    </div>

    <router-view />
  </Layout>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import {
  Calendar, PlusCircle, Search, Edit2,
  Trash2, Clock, BookOpen, Users,
  MapPin, Filter, X
} from 'lucide-vue-next';
import Layout from "../../../components/layouts/dashboard/Layout.vue";
import api from '../../../api/axios';
import Swal from 'sweetalert2';

const schedules = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const semesterFilter = ref('all');
const dayFilter = ref('all');
const isModalOpen = ref(false);
const isEdit = ref(false);

const form = ref({
  id: null,
  day: 'Senin',
  startTime: '',
  endTime: '',
  courseName: '',
  lecturer: '',
  room: '',
  semester: '2'
});

const dummyData = [
  { id: 1, day: "Senin", startTime: "08:00", endTime: "10:00", courseName: "Pemrograman Web", lecturer: "Dr. Abidzar, M.Kom", room: "Lab Komputer A", semester: "2" },
  { id: 2, day: "Selasa", startTime: "10:15", endTime: "12:45", courseName: "Basis Data", lecturer: "Ibu Siti Aminah, M.T", room: "Ruang 301", semester: "2" },
  { id: 3, day: "Rabu", startTime: "13:00", endTime: "15:30", courseName: "Kecerdasan Buatan", lecturer: "Dr. Maya Sari, S.Si", room: "Lab AI", semester: "2" }
];

const fetchSchedules = async () => {
  loading.value = true;
  try {
    schedules.value = dummyData;
  } catch (err) {
    console.error("Gagal load jadwal:", err);
  } finally {
    loading.value = false;
  }
};

const filteredSchedules = computed(() => {
  let filtered = [...schedules.value];

  if (semesterFilter.value !== 'all') {
    filtered = filtered.filter(s => s.semester === semesterFilter.value);
  }
  if (dayFilter.value !== 'all') {
    filtered = filtered.filter(s => s.day === dayFilter.value);
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    filtered = filtered.filter(s =>
        s.courseName.toLowerCase().includes(q) ||
        s.lecturer.toLowerCase().includes(q) ||
        s.room.toLowerCase().includes(q)
    );
  }

  const dayOrder = { "Senin": 1, "Selasa": 2, "Rabu": 3, "Kamis": 4, "Jumat": 5, "Sabtu": 6 };
  return filtered.sort((a, b) => {
    if (dayOrder[a.day] !== dayOrder[b.day]) return dayOrder[a.day] - dayOrder[b.day];
    return a.startTime.localeCompare(b.startTime);
  });
});

const stats = computed(() => {
  return {
    totalMK: new Set(schedules.value.map(s => s.courseName)).size,
    totalDosen: new Set(schedules.value.map(s => s.lecturer)).size,
    activeDays: new Set(schedules.value.map(s => s.day)).size
  };
});

const openModal = (data = null) => {
  if (data) {
    isEdit.value = true;
    form.value = { ...data };
  } else {
    isEdit.value = false;
    form.value = { id: null, day: 'Senin', startTime: '', endTime: '', courseName: '', lecturer: '', room: '', semester: '2' };
  }
  isModalOpen.value = true;
};

const handleSubmit = async () => {
  if (form.value.startTime >= form.value.endTime) {
    return Swal.fire('Gagal', 'Jam selesai harus setelah jam mulai!', 'error');
  }

  try {
    Swal.fire('Berhasil', isEdit.value ? 'Jadwal diperbarui' : 'Jadwal ditambahkan', 'success');
    isModalOpen.value = false;
    fetchSchedules();
  } catch (err) {
    Swal.fire('Error', 'Gagal memproses data', 'error');
  }
};

const confirmDelete = (id) => {
  Swal.fire({
    title: 'Hapus Jadwal?',
    text: "Tindakan ini permanen!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    confirmButtonText: 'Ya, Hapus!'
  }).then((result) => {
    if (result.isConfirmed) {
      schedules.value = schedules.value.filter(s => s.id !== id);
      Swal.fire('Terhapus!', 'Jadwal berhasil dihapus.', 'success');
    }
  });
};

onMounted(fetchSchedules);
</script>

<template>
  <div class="p-8 space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-black text-primary-900 dark:text-white uppercase tracking-tighter">
            Jadwal <span class="text-secondary-600 dark:text-emerald-500">Perkuliahan</span>
          </h2>
          <p class="text-[8px] font-bold text-primary-400 dark:text-primary-500 uppercase tracking-[0.4em]">
            Semester Ganjil 2024/2025 Protocol
          </p>
        </div>
        <button
            @click="openModal()"
            class="flex items-center justify-center gap-2 px-6 py-3 bg-secondary-600 hover:bg-secondary-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-secondary-600/20 active:scale-95"
        >
          <PlusCircle class="w-4 h-4" />
          Tambah Jadwal
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div class="bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 p-5 rounded-2xl flex justify-between items-center shadow-soft">
          <div>
            <p class="text-[10px] font-black text-primary-400 uppercase tracking-widest">Mata Kuliah</p>
            <p class="text-2xl font-black text-primary-900 dark:text-white">{{ stats.totalMK }}</p>
          </div>
          <BookOpen class="w-10 h-10 text-indigo-500 bg-indigo-500/10 p-2 rounded-xl" />
        </div>
        <div class="bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 p-5 rounded-2xl flex justify-between items-center shadow-soft">
          <div>
            <p class="text-[10px] font-black text-primary-400 uppercase tracking-widest">Dosen Pengajar</p>
            <p class="text-2xl font-black text-primary-900 dark:text-white">{{ stats.totalDosen }}</p>
          </div>
          <Users class="w-10 h-10 text-emerald-500 bg-emerald-500/10 p-2 rounded-xl" />
        </div>
        <div class="bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 p-5 rounded-2xl flex justify-between items-center shadow-soft">
          <div>
            <p class="text-[10px] font-black text-primary-400 uppercase tracking-widest">Hari Aktif</p>
            <p class="text-2xl font-black text-primary-900 dark:text-white">{{ stats.activeDays }}</p>
          </div>
          <Calendar class="w-10 h-10 text-sky-500 bg-sky-500/10 p-2 rounded-xl" />
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 p-4 rounded-2xl">
        <div class="flex flex-wrap gap-2 w-full md:w-auto">
          <select v-model="semesterFilter" class="bg-white dark:bg-primary-900 border border-primary-100 dark:border-white/10 rounded-xl px-4 py-2 text-[10px] font-black uppercase outline-none focus:ring-2 focus:ring-secondary-500">
            <option value="all">Semua Semester</option>
            <option v-for="i in 8" :key="i" :value="i.toString()">Semester {{ i }}</option>
          </select>
          <select v-model="dayFilter" class="bg-white dark:bg-primary-900 border border-primary-100 dark:border-white/10 rounded-xl px-4 py-2 text-[10px] font-black uppercase outline-none focus:ring-2 focus:ring-secondary-500">
            <option value="all">Semua Hari</option>
            <option v-for="day in ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']" :key="day" :value="day">{{ day }}</option>
          </select>
        </div>
        <div class="relative w-full md:w-64">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
          <input v-model="searchQuery" type="text" placeholder="CARI MATKUL / DOSEN..." class="w-full bg-white dark:bg-primary-900 border border-primary-100 dark:border-white/10 rounded-xl py-2 pl-10 pr-4 text-[10px] font-black uppercase outline-none focus:ring-2 focus:ring-secondary-500" />
        </div>
      </div>

      <div class="bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
            <tr class="bg-primary-50/50 dark:bg-white/5 border-b border-primary-100 dark:border-white/10 text-[10px] font-black text-primary-400 uppercase tracking-widest">
              <th class="p-5">Mata Kuliah</th>
              <th class="p-5">Dosen</th>
              <th class="p-5">Hari</th>
              <th class="p-5">Mulai</th>
              <th class="p-5">Selesai</th>
              <th class="p-5 text-center">Ruangan</th>
              <th class="p-5 text-center">Aksi</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-primary-100 dark:divide-white/5">
            <tr v-if="loading" v-for="i in 3" :key="i" class="animate-pulse">
              <td colspan="7" class="p-8"></td>
            </tr>
            <tr v-else v-for="s in filteredSchedules" :key="s.id" class="hover:bg-white/50 dark:hover:bg-white/5 transition-colors group">
              <td class="p-5">
                <p class="text-xs font-black text-primary-900 dark:text-white uppercase">{{ s.courseName }}</p>
                <span class="text-[9px] font-bold text-secondary-600 bg-secondary-600/10 px-2 py-0.5 rounded">SEM {{ s.semester }}</span>
              </td>
              <td class="p-5">
                <p class="text-[10px] font-bold text-primary-600 dark:text-primary-300 uppercase">{{ s.lecturer }}</p>
              </td>
              <td class="p-5 text-xs font-black text-primary-900 dark:text-white">{{ s.day }}</td>
              <td class="p-5 font-mono text-xs font-bold text-emerald-600">{{ s.startTime }}</td>
              <td class="p-5 font-mono text-xs font-bold text-red-500">{{ s.endTime }}</td>
              <td class="p-5 text-center">
                  <span class="px-3 py-1 bg-primary-100 dark:bg-white/10 text-primary-600 dark:text-primary-300 rounded-lg text-[9px] font-black uppercase">
                    {{ s.room }}
                  </span>
              </td>
              <td class="p-5">
                <div class="flex justify-center gap-2">
                  <button @click="openModal(s)" class="p-2 hover:bg-indigo-500/20 text-indigo-500 rounded-lg transition-all"><Edit2 class="w-4 h-4" /></button>
                  <button @click="confirmDelete(s.id)" class="p-2 hover:bg-red-500/20 text-red-500 rounded-lg transition-all"><Trash2 class="w-4 h-4" /></button>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div v-if="!loading && filteredSchedules.length === 0" class="p-20 text-center">
          <Calendar class="w-12 h-12 mx-auto text-primary-200 mb-4" />
          <p class="text-xs font-black text-primary-400 uppercase tracking-widest">Tidak ada jadwal ditemukan</p>
        </div>
      </div>
    </div>

  <div v-if="isModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-primary-950/60 backdrop-blur-sm" @click="isModalOpen = false"></div>
      <div class="relative bg-white/90 dark:bg-primary-900/90 backdrop-blur-xl w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-white/20 overflow-hidden">
        <div class="p-8 space-y-6">
          <h3 class="text-xl font-black text-primary-900 dark:text-white uppercase tracking-tighter">
            {{ isEdit ? 'Update' : 'Add' }} <span class="text-secondary-600">Schedule</span>
          </h3>

          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="text-[9px] font-black text-primary-400 uppercase ml-2">Hari</label>
                <select v-model="form.day" class="w-full bg-primary-50 dark:bg-white/5 border border-primary-100 dark:border-white/10 rounded-2xl px-5 py-3 text-xs font-bold dark:text-white outline-none">
                  <option v-for="d in ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']" :key="d">{{ d }}</option>
                </select>
              </div>
              <div class="space-y-1">
                <label class="text-[9px] font-black text-primary-400 uppercase ml-2">Semester</label>
                <select v-model="form.semester" class="w-full bg-primary-50 dark:bg-white/5 border border-primary-100 dark:border-white/10 rounded-2xl px-5 py-3 text-xs font-bold dark:text-white outline-none">
                  <option v-for="i in 8" :key="i" :value="i.toString()">{{ i }}</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="text-[9px] font-black text-primary-400 uppercase ml-2">Jam Mulai</label>
                <input type="time" v-model="form.startTime" required class="w-full bg-primary-50 dark:bg-white/5 border border-primary-100 dark:border-white/10 rounded-2xl px-5 py-3 text-xs font-bold dark:text-white outline-none" />
              </div>
              <div class="space-y-1">
                <label class="text-[9px] font-black text-primary-400 uppercase ml-2">Jam Selesai</label>
                <input type="time" v-model="form.endTime" required class="w-full bg-primary-50 dark:bg-white/5 border border-primary-100 dark:border-white/10 rounded-2xl px-5 py-3 text-xs font-bold dark:text-white outline-none" />
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-[9px] font-black text-primary-400 uppercase ml-2">Mata Kuliah</label>
              <input v-model="form.courseName" required placeholder="Contoh: Pemrograman Dasar" class="w-full bg-primary-50 dark:bg-white/5 border border-primary-100 dark:border-white/10 rounded-2xl px-5 py-3 text-xs font-bold dark:text-white outline-none" />
            </div>

            <div class="space-y-1">
              <label class="text-[9px] font-black text-primary-400 uppercase ml-2">Dosen Pengajar</label>
              <input v-model="form.lecturer" required placeholder="Nama Lengkap Dosen" class="w-full bg-primary-50 dark:bg-white/5 border border-primary-100 dark:border-white/10 rounded-2xl px-5 py-3 text-xs font-bold dark:text-white outline-none" />
            </div>

            <div class="space-y-1">
              <label class="text-[9px] font-black text-primary-400 uppercase ml-2">Ruangan</label>
              <input v-model="form.room" required placeholder="Contoh: Lab Komputer 1 / R.302" class="w-full bg-primary-50 dark:bg-white/5 border border-primary-100 dark:border-white/10 rounded-2xl px-5 py-3 text-xs font-bold dark:text-white outline-none" />
            </div>

            <div class="flex gap-3 pt-4">
              <button type="button" @click="isModalOpen = false" class="flex-1 px-6 py-4 border border-primary-100 dark:border-white/10 rounded-2xl font-black text-[10px] uppercase text-primary-400">Cancel</button>
              <button type="submit" class="flex-1 px-6 py-4 bg-secondary-600 text-white rounded-2xl font-black text-[10px] uppercase shadow-lg shadow-secondary-600/20">Execute Protocol</button>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>

<style scoped>
.shadow-soft {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.02);
}
</style>
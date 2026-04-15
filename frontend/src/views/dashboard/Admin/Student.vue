<script setup>
import { ref, onMounted, computed } from 'vue';
import {
  Users, UserPlus, Search, Edit2, Trash2,
  ChevronLeft, ChevronRight, UserMinus,
  GraduationCap, Mars, Venus
} from 'lucide-vue-next';
import api from '../../../api/axios.js';
import Swal from 'sweetalert2';

const students = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const currentPage = ref(1);
const rowsPerPage = 10;

const isModalOpen = ref(false);
const isEdit = ref(false);
const form = ref({
  id: null, nim: '', nama_lengkap: '', jurusan: 'Teknik Informatika', angkatan: '2025', jenis_kelamin: 'Laki-laki'
});

const fetchStudents = async () => {
  loading.value = true;
  try {
    const response = await api.get('/mahasiswa');
    students.value = response.data;
  } catch (err) {
    console.error("Gagal ambil data:", err);
  } finally {
    loading.value = false;
  }
};

const filteredStudents = computed(() => {
  if (!searchQuery.value) return students.value;
  const q = searchQuery.value.toLowerCase();
  return students.value.filter(s =>
      s.nim.toLowerCase().includes(q) || s.nama_lengkap.toLowerCase().includes(q)
  );
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage;
  return filteredStudents.value.slice(start, start + rowsPerPage);
});

const totalPages = computed(() => Math.ceil(filteredStudents.value.length / rowsPerPage));

const openModal = (data = null) => {
  if (data) {
    isEdit.value = true;
    form.value = { ...data };
  } else {
    isEdit.value = false;
    form.value = { id: null, nim: '', nama_lengkap: '', jurusan: 'Teknik Informatika', angkatan: '2025', jenis_kelamin: 'Laki-laki' };
  }
  isModalOpen.value = true;
};

const handleSubmit = async () => {
  try {
    if (isEdit.value) {
      await api.put(`/mahasiswa/${form.value.id}`, form.value);
      Swal.fire('Berhasil', 'Data diperbarui', 'success');
    } else {
      await api.post('/mahasiswa', form.value);
      Swal.fire('Berhasil', 'Data ditambahkan', 'success');
    }
    isModalOpen.value = false;
    fetchStudents();
  } catch (err) { Swal.fire('Error', 'Gagal menyimpan', 'error'); }
};

const confirmDelete = (id) => {
  Swal.fire({
    title: 'Hapus?',
    text: "Data akan hilang!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, Hapus'
  }).then(async (result) => {
    if (result.isConfirmed) {
      await api.delete(`/mahasiswa/${id}`);
      fetchStudents();
      Swal.fire('Dihapus!', 'Data berhasil dihapus.', 'success');
    }
  });
};

onMounted(fetchStudents);
</script>

<template>
  <div class="p-8 space-y-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-xl font-black text-primary-900 dark:text-white uppercase tracking-tighter">
          Kelola <span class="text-secondary-600 dark:text-emerald-500">Mahasiswa</span>
        </h2>
        <p class="text-[8px] font-bold text-primary-400 dark:text-primary-500 uppercase tracking-[0.4em]">Protocol Management v1.0</p>
      </div>
      <button @click="openModal()" class="flex items-center gap-2 px-6 py-3 bg-secondary-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-secondary-600/20 active:scale-95">
        <UserPlus class="w-4 h-4" /> Tambah Mahasiswa
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
      <div class="bg-white dark:bg-white/5 border border-primary-100 dark:border-white/10 p-5 rounded-2xl flex justify-between items-center shadow-sm">
        <div>
          <p class="text-[10px] font-black text-primary-400 uppercase tracking-widest">Total</p>
          <p class="text-2xl font-black text-primary-900 dark:text-white">{{ students.length }}</p>
        </div>
        <div class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500"><GraduationCap class="w-6 h-6" /></div>
      </div>
      <div class="bg-white dark:bg-white/5 border border-primary-100 dark:border-white/10 p-5 rounded-2xl flex justify-between items-center shadow-sm">
        <div>
          <p class="text-[10px] font-black text-primary-400 uppercase tracking-widest">Laki-laki</p>
          <p class="text-2xl font-black text-primary-900 dark:text-white">{{ students.filter(s => s.jenis_kelamin === 'Laki-laki').length }}</p>
        </div>
        <div class="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500"><Mars class="w-6 h-6" /></div>
      </div>
      <div class="bg-white dark:bg-white/5 border border-primary-100 dark:border-white/10 p-5 rounded-2xl flex justify-between items-center shadow-sm">
        <div>
          <p class="text-[10px] font-black text-primary-400 uppercase tracking-widest">Perempuan</p>
          <p class="text-2xl font-black text-primary-900 dark:text-white">{{ students.filter(s => s.jenis_kelamin === 'Perempuan').length }}</p>
        </div>
        <div class="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-500"><Venus class="w-6 h-6" /></div>
      </div>
    </div>

    <div class="bg-white dark:bg-white/5 border border-primary-100 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
      <div class="p-4 border-b dark:border-white/10 flex justify-end">
        <div class="relative w-full max-w-xs">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
          <input v-model="searchQuery" type="text" placeholder="Cari..." class="w-full bg-primary-50 dark:bg-white/5 border border-primary-100 dark:border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs font-bold dark:text-white outline-none focus:ring-2 focus:ring-secondary-500" />
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
          <tr class="bg-primary-50/50 dark:bg-white/5 border-b dark:border-white/10 text-[10px] font-black text-primary-400 uppercase tracking-widest">
            <th class="p-5">Mahasiswa</th>
            <th class="p-5">NIM & Angkatan</th>
            <th class="p-5">Prodi</th>
            <th class="p-5 text-center">Aksi</th>
          </tr>
          </thead>
          <tbody class="divide-y dark:divide-white/5">
          <tr v-if="loading" v-for="i in 3" class="animate-pulse">
            <td colspan="4" class="p-8"></td>
          </tr>
          <tr v-else v-for="mhs in paginatedData" :key="mhs.id" class="hover:bg-primary-50/50 dark:hover:bg-white/5 transition-colors">
            <td class="p-5">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-secondary-600 flex items-center justify-center text-white font-black text-xs">{{ mhs.nama_lengkap.charAt(0) }}</div>
                <p class="text-xs font-black text-primary-900 dark:text-white uppercase">{{ mhs.nama_lengkap }}</p>
              </div>
            </td>
            <td class="p-5 font-mono text-xs font-black text-secondary-600 dark:text-emerald-500">{{ mhs.nim }} <span class="text-primary-400 text-[10px]">({{ mhs.angkatan }})</span></td>
            <td class="p-5 text-[10px] font-black text-primary-400 uppercase">{{ mhs.jurusan }}</td>
            <td class="p-5 flex justify-center gap-2">
              <button @click="openModal(mhs)" class="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg"><Edit2 class="w-4 h-4" /></button>
              <button @click="confirmDelete(mhs.id)" class="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"><Trash2 class="w-4 h-4" /></button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-primary-950/60 backdrop-blur-sm" @click="isModalOpen = false"></div>
      <div class="relative bg-white dark:bg-primary-900 w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-white/10 p-8 space-y-6">
        <h3 class="text-xl font-black text-white uppercase tracking-tighter">{{ isEdit ? 'Update' : 'Register' }} Mahasiswa</h3>
        <button @click="handleSubmit" class="w-full py-4 bg-secondary-600 text-white rounded-2xl font-black text-[10px] uppercase">Simpan Perubahan</button>
      </div>
    </div>
  </div>
</template>
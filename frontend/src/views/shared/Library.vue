<script setup>
import { ref, onMounted, computed } from 'vue';
import {
  Book, PlusCircle, Search, Edit2,
  Trash2, BookOpen, Tags, Download,
  Info, FileText, X
} from 'lucide-vue-next';
import api from '../../api/axios';
import Swal from 'sweetalert2';
import { useAuthStore } from "../../stores/authStore.js";

const authStore = useAuthStore();
const isAdmin = computed(() => authStore.role === 'admin');

const books = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const categoryFilter = ref('all');
const isModalOpen = ref(false);
const isEdit = ref(false);

const form = ref({
  id: null,
  title: '',
  author: '',
  publisher: '',
  year: '',
  category: 'Teknik Informatika',
  cover: '',
  description: '',
  file_url: ''
});

const dummyBooks = [
  { id: 1, title: "Pemrograman Web dengan Laravel", author: "Sandhika Galih", publisher: "Informatika", year: 2023, category: "Teknik Informatika", cover: "https://picsum.photos/id/0/200/280", description: "Buku panduan lengkap Laravel 10" },
  { id: 2, title: "Basis Data: Konsep dan Implementasi", author: "Rosa A.S.", publisher: "Modula", year: 2022, category: "Teknik Informatika", cover: "https://picsum.photos/id/1/200/280", description: "Materi lengkap database" },
  { id: 3, title: "Manajemen Strategis", author: "Freddy Rangkuti", publisher: "Gramedia", year: 2021, category: "Manajemen", cover: "https://picsum.photos/id/2/200/280", description: "Strategi bisnis modern" },
  { id: 4, title: "Laskar Pelangi", author: "Andrea Hirata", publisher: "Bentang Pustaka", year: 2005, category: "Novel", cover: "https://picsum.photos/id/4/200/280", description: "Novel inspiratif tentang pendidikan" }
];

const fetchBooks = async () => {
  loading.value = true;
  try {
    books.value = dummyBooks;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const filteredBooks = computed(() => {
  let filtered = [...books.value];
  if (categoryFilter.value !== 'all') {
    filtered = filtered.filter(b => b.category === categoryFilter.value);
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    filtered = filtered.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q)
    );
  }
  return filtered;
});

const stats = computed(() => ({
  total: books.value.length,
  categories: new Set(books.value.map(b => b.category)).size
}));

const openModal = (data = null) => {
  if (!isAdmin.value) return;
  if (data) {
    isEdit.value = true;
    form.value = { ...data };
  } else {
    isEdit.value = false;
    form.value = { id: null, title: '', author: '', publisher: '', year: '', category: 'Teknik Informatika', cover: '', description: '' };
  }
  isModalOpen.value = true;
};

const handleSubmit = async () => {
  Swal.fire('Berhasil', isEdit.value ? 'Buku diperbarui' : 'Buku ditambahkan', 'success');
  isModalOpen.value = false;
  fetchBooks();
};

const confirmDelete = (id) => {
  Swal.fire({
    title: 'Hapus Buku?',
    text: "Data akan dihapus permanen!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    confirmButtonText: 'Ya, Hapus!'
  }).then((result) => {
    if (result.isConfirmed) {
      books.value = books.value.filter(b => b.id !== id);
      Swal.fire('Terhapus!', 'Koleksi telah diperbarui.', 'success');
    }
  });
};

onMounted(fetchBooks);
</script>

<template>
  <div class="p-8 space-y-6">

      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-black text-primary-900 dark:text-white uppercase tracking-tighter">
            Digital <span class="text-secondary-600 dark:text-emerald-500">Library</span>
          </h2>
          <p class="text-[8px] font-bold text-primary-400 dark:text-primary-500 uppercase tracking-[0.4em]">
            Official Knowledge Repository v1.0
          </p>
        </div>
        <button v-if="isAdmin" @click="openModal()" class="flex items-center justify-center gap-2 px-6 py-3 bg-secondary-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-secondary-600/20 active:scale-95 transition-all">
          <PlusCircle class="w-4 h-4" /> Tambah Koleksi
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div class="bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 p-5 rounded-2xl flex justify-between items-center shadow-soft">
          <div>
            <p class="text-[10px] font-black text-primary-400 uppercase tracking-widest">Total Koleksi</p>
            <p class="text-2xl font-black text-primary-900 dark:text-white">{{ stats.total }}</p>
          </div>
          <Book class="w-10 h-10 text-indigo-500 bg-indigo-500/10 p-2 rounded-xl" />
        </div>
        <div class="bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 p-5 rounded-2xl flex justify-between items-center shadow-soft">
          <div>
            <p class="text-[10px] font-black text-primary-400 uppercase tracking-widest">Kategori Aktif</p>
            <p class="text-2xl font-black text-primary-900 dark:text-white">{{ stats.categories }}</p>
          </div>
          <Tags class="w-10 h-10 text-emerald-500 bg-emerald-500/10 p-2 rounded-xl" />
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-4 justify-between bg-white/30 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 p-4 rounded-2xl">
        <div class="flex flex-wrap gap-2">
          <button v-for="cat in ['all', 'Teknik Informatika', 'Sistem Informasi', 'Manajemen', 'Umum']" :key="cat"
                  @click="categoryFilter = cat"
                  :class="categoryFilter === cat ? 'bg-secondary-600 text-white shadow-lg' : 'text-primary-500 hover:bg-white/50 dark:hover:bg-white/10'"
                  class="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
            {{ cat }}
          </button>
        </div>
        <div class="relative w-full md:w-64">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
          <input v-model="searchQuery" type="text" placeholder="CARI JUDUL / PENULIS..." class="w-full bg-white dark:bg-primary-900 border border-primary-100 dark:border-white/10 rounded-xl py-2 pl-10 pr-4 text-[10px] font-black uppercase outline-none focus:ring-2 focus:ring-secondary-500" />
        </div>
      </div>

      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="i in 4" :key="i" class="h-80 bg-white/20 animate-pulse rounded-3xl"></div>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="book in filteredBooks" :key="book.id"
             class="group bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-[2.5rem] overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-300">

          <div class="h-48 overflow-hidden relative">
            <img :src="book.cover" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div class="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-[8px] font-black text-white uppercase tracking-widest">
              {{ book.category }}
            </div>
          </div>

          <div class="p-6">
            <h3 class="text-xs font-black text-primary-900 dark:text-white uppercase truncate mb-1">{{ book.title }}</h3>
            <p class="text-[10px] font-bold text-primary-400 uppercase mb-4">{{ book.author }} • {{ book.year }}</p>

            <div class="flex gap-2 pt-4 border-t border-white/20 dark:border-white/10">
              <button class="flex-1 flex items-center justify-center gap-2 py-2.5 bg-indigo-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
                <Download class="w-3 h-3" /> Download
              </button>
              <div v-if="isAdmin" class="flex gap-1">
                <button @click="openModal(book)" class="p-2 bg-primary-100 dark:bg-white/5 text-primary-600 dark:text-primary-300 rounded-xl hover:bg-secondary-600 hover:text-white transition-all"><Edit2 class="w-3.5 h-3.5" /></button>
                <button @click="confirmDelete(book.id)" class="p-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 class="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-indigo-500/5 border border-indigo-500/10 p-5 rounded-[2rem] flex items-start gap-4">
        <Info class="w-5 h-5 text-indigo-500 mt-1" />
        <div class="space-y-1">
          <h4 class="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Repository Protocol</h4>
          <p class="text-[10px] text-indigo-400/80 font-medium leading-relaxed uppercase tracking-wider">
            Semua modul dalam perpustakaan ini adalah aset resmi angkatan. Dilarang menyebarluaskan file tanpa izin administratif.
          </p>
        </div>
      </div>
    </div>
  <div v-if="isModalOpen && isAdmin" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-primary-950/60 backdrop-blur-sm" @click="isModalOpen = false"></div>
      <div class="relative bg-white/90 dark:bg-primary-900/90 backdrop-blur-2xl w-full max-w-lg rounded-[3rem] shadow-2xl border border-white/20 p-8 overflow-y-auto max-h-[90vh]">
        <h3 class="text-xl font-black text-primary-900 dark:text-white uppercase tracking-tighter mb-6">
          {{ isEdit ? 'Update' : 'Register' }} <span class="text-secondary-600">Module</span>
        </h3>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="text-[9px] font-black text-primary-400 uppercase ml-2">Judul Buku/Modul</label>
            <input v-model="form.title" required class="w-full bg-primary-50 dark:bg-white/5 border border-primary-100 dark:border-white/10 rounded-2xl px-5 py-3 text-xs font-bold dark:text-white outline-none focus:ring-2 focus:ring-secondary-500" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-[9px] font-black text-primary-400 uppercase ml-2">Penulis</label>
              <input v-model="form.author" class="w-full bg-primary-50 dark:bg-white/5 border border-primary-100 dark:border-white/10 rounded-2xl px-5 py-3 text-xs font-bold dark:text-white outline-none" />
            </div>
            <div>
              <label class="text-[9px] font-black text-primary-400 uppercase ml-2">Tahun</label>
              <input v-model="form.year" type="number" class="w-full bg-primary-50 dark:bg-white/5 border border-primary-100 dark:border-white/10 rounded-2xl px-5 py-3 text-xs font-bold dark:text-white outline-none" />
            </div>
          </div>
          <div>
            <label class="text-[9px] font-black text-primary-400 uppercase ml-2">Kategori</label>
            <select v-model="form.category" class="w-full bg-primary-50 dark:bg-white/5 border border-primary-100 dark:border-white/10 rounded-2xl px-5 py-3 text-xs font-bold dark:text-white outline-none">
              <option v-for="cat in ['Teknik Informatika', 'Sistem Informasi', 'Manajemen', 'Umum']" :key="cat">{{ cat }}</option>
            </select>
          </div>
          <div>
            <label class="text-[9px] font-black text-primary-400 uppercase ml-2">Cover URL</label>
            <input v-model="form.cover" placeholder="https://..." class="w-full bg-primary-50 dark:bg-white/5 border border-primary-100 dark:border-white/10 rounded-2xl px-5 py-3 text-xs font-bold dark:text-white outline-none" />
          </div>
          <div class="flex gap-3 pt-4">
            <button type="button" @click="isModalOpen = false" class="flex-1 px-6 py-4 border border-white/10 rounded-2xl font-black text-[10px] uppercase text-primary-400">Cancel</button>
            <button type="submit" class="flex-1 px-6 py-4 bg-secondary-600 text-white rounded-2xl font-black text-[10px] uppercase shadow-lg shadow-secondary-600/20">Execute</button>
          </div>
        </form>
      </div>
    </div>
</template>

<style scoped>
.shadow-soft {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.02);
}
.backdrop-blur-xl {
  backdrop-filter: blur(24px);
}
</style>
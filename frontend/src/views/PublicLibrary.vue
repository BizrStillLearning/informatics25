<script setup>
import { ref, onMounted, computed } from 'vue';
import {
  Book, FileText, Search,
  Download, Eye, GraduationCap, Info,
  BookOpen, Tags, Calendar, X,
  FileSearch, ChevronRight
} from 'lucide-vue-next';
import Navbar from "../components/layouts/landing/Navbar.vue";
import Footer from "../components/layouts/landing/Footer.vue";


const resources = ref([
  { id: 1, type: "E-Book", title: "Pemrograman Web dengan Laravel 10", author: "Sandhika Galih", category: "Teknik Informatika", year: 2024, cover: "https://picsum.photos/id/0/200/280", description: "Buku lengkap tentang framework Laravel untuk pengembangan web modern.", fileUrl: "#" },
  { id: 2, type: "Jurnal", title: "Implementasi AI dalam Pendidikan", author: "Dr. Budi Santoso", category: "Penelitian", year: 2023, cover: "https://picsum.photos/id/1/200/280", description: "Jurnal internasional tentang penerapan AI di dunia pendidikan.", fileUrl: "#" },
  { id: 3, type: "Materi", title: "Slide Basis Data - Normalisasi", author: "Rosa A.S.", category: "Teknik Informatika", year: 2024, cover: "https://picsum.photos/id/2/200/280", description: "Materi kuliah Basis Data lengkap dengan contoh studi kasus.", fileUrl: "#" },
  { id: 4, type: "E-Book", title: "Manajemen Strategis Digital", author: "Freddy Rangkuti", category: "Manajemen", year: 2023, cover: "https://picsum.photos/id/3/200/280", description: "Buku strategi bisnis di era digitalisasi.", fileUrl: "#" },
]);

// State Filtering
const searchQuery = ref("");
const typeFilter = ref("all");
const categoryFilter = ref("all");
const isPreviewOpen = ref(false);
const selectedDoc = ref(null);

const filteredResources = computed(() => {
  return resources.value.filter(res => {
    const matchSearch = res.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        res.author.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchType = typeFilter.value === 'all' || res.type === typeFilter.value;
    const matchCat = categoryFilter.value === 'all' || res.category === categoryFilter.value;
    return matchSearch && matchType && matchCat;
  });
});

const stats = computed(() => ({
  total: resources.value.length,
  ebook: resources.value.filter(r => r.type === 'E-Book').length,
  jurnal: resources.value.filter(r => r.type === 'Jurnal').length,
  materi: resources.value.filter(r => r.type === 'Materi').length,
}));

const openPreview = (doc) => {
  selectedDoc.value = doc;
  isPreviewOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closePreview = () => {
  isPreviewOpen.value = false;
  document.body.style.overflow = 'auto';
};

onMounted(() => {
  // Inisialisasi data jika perlu
});
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-primary-950 transition-colors duration-500">
    <Navbar />

    <section class="relative pt-20 pb-32 overflow-hidden">
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 opacity-90"></div>
        <img src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80" class="w-full h-full object-cover" />
      </div>

      <div class="container mx-auto px-6 relative z-10 text-center text-white">
        <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest mb-6 border border-white/20">
          <BookOpen class="w-3 h-3" />
          <span>Open Academic Access</span>
        </div>
        <h1 class="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
          Repository <span class="text-secondary-400">Digital</span>
        </h1>
        <p class="max-w-2xl mx-auto text-indigo-100 text-sm md:text-base font-medium leading-relaxed opacity-90">
          Akses terbuka untuk ribuan materi pembelajaran, e-book, dan jurnal ilmiah koleksi Angkatan 2025 untuk mendukung riset dan pendidikan global.
        </p>
      </div>
    </section>

    <div class="container mx-auto px-6 -mt-16 relative z-20">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="(val, label) in { 'Total': stats.total, 'E-Book': stats.ebook, 'Jurnal': stats.jurnal, 'Materi': stats.materi }" :key="label"
             class="bg-white dark:bg-primary-900 p-6 rounded-3xl shadow-xl border border-white/50 dark:border-white/5 text-center transition-transform hover:-translate-y-1">
          <p class="text-[10px] font-black text-slate-400 dark:text-primary-500 uppercase tracking-widest mb-1">{{ label }}</p>
          <p class="text-3xl font-black text-indigo-600 dark:text-secondary-500">{{ val }}</p>
        </div>
      </div>
    </div>

    <main class="container mx-auto px-6 py-16">

      <div class="flex flex-col lg:flex-row gap-6 justify-between items-start mb-12">
        <div class="space-y-4 w-full lg:w-auto">
          <div class="flex flex-wrap gap-2">
            <button v-for="t in ['all', 'E-Book', 'Jurnal', 'Materi']" :key="t"
                    @click="typeFilter = t"
                    :class="typeFilter === t ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white dark:bg-white/5 text-slate-600 dark:text-primary-400 border border-slate-200 dark:border-white/10 hover:bg-slate-50'"
                    class="px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
              {{ t === 'all' ? 'Semua Dokumen' : t }}
            </button>
          </div>
          <div class="flex flex-wrap gap-2">
            <button v-for="c in ['all', 'Teknik Informatika', 'Sistem Informasi', 'Manajemen', 'Penelitian']" :key="c"
                    @click="categoryFilter = c"
                    :class="categoryFilter === c ? 'text-indigo-600 border-indigo-600 bg-indigo-50 dark:bg-indigo-500/10' : 'text-slate-400 border-slate-200 dark:border-white/10'"
                    class="px-3 py-1.5 rounded-xl text-[9px] font-bold border uppercase tracking-wider transition-all">
              {{ c }}
            </button>
          </div>
        </div>

        <div class="relative w-full lg:w-80">
          <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input v-model="searchQuery" type="text" placeholder="Cari judul atau penulis..."
                 class="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-primary-900 border border-slate-200 dark:border-white/10 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm" />
        </div>
      </div>

      <div v-if="filteredResources.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div v-for="res in filteredResources" :key="res.id"
             class="group bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">

          <div class="h-52 overflow-hidden relative">
            <img :src="res.cover" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div class="absolute top-4 left-4">
              <span class="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-xl text-[8px] font-black uppercase tracking-tighter shadow-sm flex items-center gap-1.5">
                <Book v-if="res.type === 'E-Book'" class="w-3 h-3 text-blue-500" />
                <FileText v-else-if="res.type === 'Jurnal'" class="w-3 h-3 text-emerald-500" />
                <Chalkboard v-else class="w-3 h-3 text-amber-500" />
                {{ res.type }}
              </span>
            </div>
          </div>

          <div class="p-6">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-[9px] font-bold text-indigo-600 dark:text-secondary-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded-lg">{{ res.category }}</span>
              <span class="text-[9px] font-bold text-slate-400">{{ res.year }}</span>
            </div>
            <h3 class="text-sm font-black text-slate-800 dark:text-white uppercase leading-tight line-clamp-2 mb-2">{{ res.title }}</h3>
            <p class="text-[10px] font-bold text-slate-500 dark:text-primary-500 uppercase mb-4">{{ res.author }}</p>

            <button @click="openPreview(res)" class="w-full flex items-center justify-center gap-2 py-3 bg-slate-50 dark:bg-white/5 hover:bg-indigo-600 hover:text-white text-indigo-700 dark:text-secondary-400 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
              <Eye class="w-4 h-4" /> Preview & Unduh
            </button>
          </div>
        </div>
      </div>

      <div v-else class="py-20 text-center bg-white dark:bg-white/5 rounded-[3rem] border border-dashed border-slate-200 dark:border-white/10">
        <FileSearch class="w-16 h-16 mx-auto text-slate-300 dark:text-primary-800 mb-4" />
        <h3 class="text-lg font-black text-slate-800 dark:text-white uppercase">Dokumen Tidak Ditemukan</h3>
        <p class="text-xs text-slate-400">Coba gunakan kata kunci lain atau reset filter.</p>
      </div>

    </main>

    <section class="bg-indigo-600 py-16 text-white text-center">
      <div class="container mx-auto px-6">
        <h2 class="text-2xl font-black uppercase tracking-tighter mb-4">Butuh Referensi Spesifik?</h2>
        <p class="text-indigo-100 text-sm max-w-xl mx-auto mb-8 font-medium">Jika Anda tidak menemukan materi yang dicari, anggota angkatan dapat mengusulkan materi melalui portal internal dashboard.</p>
        <router-link to="/login" class="inline-flex items-center gap-2 px-8 py-3 bg-white text-indigo-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-50 transition-all">
          Masuk ke Dashboard <ChevronRight class="w-4 h-4" />
        </router-link>
      </div>
    </section>

    <Transition enter-active-class="transition duration-300" leave-active-class="transition duration-200"
                enter-from-class="opacity-0" leave-to-class="opacity-0">
      <div v-if="isPreviewOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" @click="closePreview"></div>
        <div class="relative bg-white dark:bg-primary-950 w-full max-w-5xl h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col">
          <div class="flex justify-between items-center px-8 py-5 border-b dark:border-white/10">
            <div>
              <h3 class="font-black text-slate-800 dark:text-white uppercase tracking-tight line-clamp-1">{{ selectedDoc?.title }}</h3>
              <p class="text-[10px] text-slate-400 uppercase font-bold">{{ selectedDoc?.author }} • {{ selectedDoc?.type }}</p>
            </div>
            <button @click="closePreview" class="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-all">
              <X class="w-6 h-6 text-slate-400" />
            </button>
          </div>
          <div class="flex-1 bg-slate-100 dark:bg-primary-900 overflow-hidden relative">
            <iframe :src="selectedDoc?.fileUrl" class="w-full h-full border-none"></iframe>
          </div>
          <div class="px-8 py-4 bg-white dark:bg-primary-950 flex justify-end gap-3 border-t dark:border-white/10">
            <button @click="closePreview" class="px-6 py-2.5 text-[10px] font-black uppercase text-slate-400 hover:text-slate-600">Tutup</button>
            <a :href="selectedDoc?.fileUrl" download class="flex items-center gap-2 px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/30">
              <Download class="w-4 h-4" /> Unduh Sekarang
            </a>
          </div>
        </div>
      </div>
    </Transition>

    <Footer />
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
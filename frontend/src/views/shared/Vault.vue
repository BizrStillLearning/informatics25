<script setup>
import { ref, onMounted, computed } from 'vue';
import {
  FolderOpen, FileText, Download, CloudUpload,
  Search, ShieldCheck, User, Trash2,
  FileType, Info, CheckCircle2, Lock, X
} from 'lucide-vue-next';
import { useAuthStore } from "../../stores/authStore.js";
import Swal from 'sweetalert2';

const authStore = useAuthStore();
const isAdmin = computed(() => authStore.role === 'admin');

const loading = ref(true);
const searchQuery = ref('');
const isUploadModalOpen = ref(false);

const archiveFiles = ref([
  {
    id: 1,
    title: 'Catatan Pertemuan 5 Kalkulus',
    size: '850 KB',
    format: 'PDF',
    author: 'Abidzar Dzakwan',
    date: '10 APR 2026',
    category: 'Materi Kuliah'
  },
  {
    id: 2,
    title: 'Kisi-kisi UAS Alpro Genap',
    size: '1.2 MB',
    format: 'DOCX',
    author: 'Siti Aminah',
    date: '08 APR 2026',
    category: 'Latihan Soal'
  },
  {
    id: 3,
    title: 'Rangkuman Jaringan Komputer',
    size: '2.5 MB',
    format: 'PDF',
    author: 'Budi Santoso',
    date: '05 APR 2026',
    category: 'Rangkuman'
  }
]);

const fetchArchive = async () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 800);
};

const filteredFiles = computed(() => {
  if (!searchQuery.value) return archiveFiles.value;
  const q = searchQuery.value.toLowerCase();
  return archiveFiles.value.filter(f =>
      f.title.toLowerCase().includes(q) ||
      f.author.toLowerCase().includes(q)
  );
});

const handleUpload = () => {
  Swal.fire({
    title: 'Deploy Resource',
    text: "Pastikan file bermanfaat bagi rekan angkatan.",
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Select File',
    confirmButtonColor: '#10b981'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Success', 'File dalam antrian enkripsi (Simulasi)', 'success');
    }
  });
};

const deleteFile = (id) => {
  Swal.fire({
    title: 'Hapus Archive?',
    text: "Hanya Admin atau Pemilik yang bisa menghapus.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    confirmButtonText: 'Ya, Hapus!'
  }).then((result) => {
    if (result.isConfirmed) {
      archiveFiles.value = archiveFiles.value.filter(f => f.id !== id);
      Swal.fire('Deleted', 'Resource telah dihapus dari Vault.', 'success');
    }
  });
};

onMounted(fetchArchive);
</script>

<template>
  <div class="p-8 space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-black text-primary-900 dark:text-white uppercase tracking-tighter">
            Archive <span class="text-emerald-500 dark:text-emerald-400">Hub</span>
          </h2>
          <p class="text-[8px] font-bold text-primary-400 dark:text-primary-500 uppercase tracking-[0.4em]">
            Peer-to-Peer Knowledge Protocol v1.0
          </p>
        </div>

        <button
            @click="handleUpload"
            class="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
        >
          <CloudUpload class="w-4 h-4" />
          Share My Notes
        </button>
      </div>

      <div class="bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between shadow-soft">
        <div class="relative w-full md:w-96">
          <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
          <input
              v-model="searchQuery"
              type="text"
              placeholder="CARI JUDUL / KONTRIBUTOR..."
              class="w-full bg-white dark:bg-primary-900/50 border border-primary-100 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 text-[10px] font-black uppercase text-primary-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          />
        </div>
        <div class="flex items-center gap-2 text-[10px] font-black text-primary-400 uppercase tracking-widest">
          <ShieldCheck class="w-4 h-4 text-emerald-500" /> Secure Protocol Active
        </div>
      </div>

      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="i in 6" :key="i" class="h-40 bg-white/20 animate-pulse rounded-[2rem]"></div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
            v-for="file in filteredFiles" :key="file.id"
            class="group bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 p-6 rounded-[2.5rem] shadow-xl hover:-translate-y-2 transition-all duration-300"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner">
              <FileText v-if="file.format === 'PDF'" class="w-6 h-6" />
              <FileType v-else class="w-6 h-6" />
            </div>
            <div class="flex gap-2">
              <button class="p-2.5 bg-primary-900/5 dark:bg-white/5 text-primary-600 dark:text-primary-400 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
                <Download class="w-4 h-4" />
              </button>
              <button
                  v-if="isAdmin || file.author === 'Abidzar Dzakwan'"
                  @click="deleteFile(file.id)"
                  class="p-2.5 bg-red-500/5 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="space-y-1">
            <h4 class="text-xs font-black text-primary-900 dark:text-white uppercase truncate tracking-tight">{{ file.title }}</h4>
            <div class="flex items-center gap-2">
              <span class="text-[8px] font-black px-2 py-0.5 bg-emerald-500/10 text-emerald-600 rounded uppercase tracking-tighter border border-emerald-500/10">
                {{ file.category }}
              </span>
              <span class="text-[8px] font-bold text-primary-400 uppercase tracking-widest">{{ file.format }} • {{ file.size }}</span>
            </div>
          </div>

          <div class="mt-6 pt-4 border-t border-primary-100 dark:border-white/5 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 rounded-lg bg-gradient-to-br from-primary-200 to-primary-300 dark:from-white/10 dark:to-white/5 flex items-center justify-center text-[9px] text-primary-600 dark:text-white font-black">
                {{ file.author.charAt(0) }}
              </div>
              <div>
                <p class="text-[8px] font-black text-primary-300 uppercase leading-none mb-1">Contributor</p>
                <p class="text-[9px] font-bold text-primary-600 dark:text-primary-300 uppercase tracking-tighter">{{ file.author }}</p>
              </div>
            </div>
            <span class="text-[8px] font-black text-primary-400 uppercase">{{ file.date }}</span>
          </div>
        </div>
      </div>

      <div v-if="!loading && filteredFiles.length === 0" class="p-20 text-center border-2 border-dashed border-primary-100 dark:border-white/10 rounded-[3rem]">
        <FolderOpen class="w-12 h-12 mx-auto text-primary-200 mb-4" />
        <p class="text-xs font-black text-primary-400 uppercase tracking-widest">No data detected in this sector</p>
      </div>

      <div class="bg-emerald-500/5 border border-emerald-500/10 p-5 rounded-[2rem] flex items-start gap-4">
        <ShieldCheck class="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
        <div class="space-y-1">
          <h4 class="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Collaborative Security Protocol</h4>
          <p class="text-[9px] text-emerald-600/70 font-medium leading-relaxed uppercase tracking-wider">
            Archive Hub adalah ruang terbuka untuk berbagi. Dilarang mengunggah konten yang mengandung malware, SARA, atau kunci jawaban ujian yang bersifat rahasia negara.
          </p>
        </div>
      </div>
    </div>
</template>

<style scoped>
.shadow-soft {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.02);
}
.backdrop-blur-xl {
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}
</style>
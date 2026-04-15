<script setup>
import { ref, onMounted, computed } from 'vue';
import {
  ImageIcon, Video, CloudUpload, Search,
  Trash2, PlayCircle, X, PlusCircle,
  Layers, Camera
} from 'lucide-vue-next';
import api from '../../../api/axios.js';
import Swal from 'sweetalert2';

const loading = ref(true);
const currentFilter = ref('all');
const isUploadModalOpen = ref(false);
const isPreviewModalOpen = ref(false);

const galleryItems = ref([
  {
    id: 1,
    type: 'photo',
    title: 'Momen Makrab 2026',
    thumbnail: '/gallery/img1.jpg',
    url: '/gallery/img1.jpg',
    description: 'Keseruan malam keakraban angkatan Informatika 25.',
    created_at: '12 MAR 2026'
  },
  {
    id: 2,
    type: 'video',
    title: 'Raffa Viral',
    thumbnail: '/gallery/img1.jpg',
    video_url: '/gallery/video1.mp4',
    description: 'Raffa viral 20 menit.',
    created_at: '10 FEB 2026'
  },
  {
    id: 3,
    type: 'photo',
    title: 'Doksli',
    thumbnail: '/gallery/img2.jpg',
    url: '/gallery/img2.jpg',
    description: 'Fathul viral 20 detik.',
    created_at: '01 JAN 2026'
  }
]);

const form = ref({
  title: '',
  description: '',
  type: 'photo',
  file: null,
  video_url: '',
  previewUrl: null
});

const activePreview = ref(null);

const fetchGallery = async () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 800);
};

const filteredItems = computed(() => {
  if (currentFilter.value === 'all') return galleryItems.value;
  return galleryItems.value.filter(item => item.type === currentFilter.value);
});

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      Swal.fire('Error', 'Ukuran file maksimal 5MB', 'error');
      return;
    }
    form.value.file = file;
    form.value.previewUrl = URL.createObjectURL(file);
  }
};

const handleUpload = async () => {
  Swal.fire('Info', 'Fitur upload akan aktif setelah integrasi API selesai', 'info');
  isUploadModalOpen.value = false;
  resetForm();
};

const resetForm = () => {
  form.value = { title: '', description: '', type: 'photo', file: null, video_url: '', previewUrl: null };
};

const openPreview = (item) => {
  activePreview.value = item;
  isPreviewModalOpen.value = true;
};

const deleteMedia = (id) => {
  Swal.fire({
    title: 'Hapus Media?',
    text: "Tindakan ini tidak dapat dibatalkan!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    confirmButtonText: 'Ya, Hapus!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      galleryItems.value = galleryItems.value.filter(m => m.id !== id);
      isPreviewModalOpen.value = false;
      Swal.fire('Terhapus!', 'Media telah dihapus dari sistem dummy.', 'success');
    }
  });
};

const isYouTube = (url) => {
  return url?.includes('youtube.com') || url?.includes('youtu.be');
};

const getYoutubeEmbed = (url) => {
  if (!url) return '';
  const videoId = url.includes('v=') ? url.split('v=')[1].split('&')[0] : url.split('/').pop();
  return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
};

onMounted(fetchGallery);
</script>

<template>
    <div class="p-8 space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-black text-primary-900 dark:text-white uppercase tracking-tighter">
            Galeri <span class="text-secondary-600 dark:text-emerald-500">Informatics</span>
          </h2>
          <p class="text-[8px] font-bold text-primary-400 dark:text-primary-500 uppercase tracking-[0.4em]">
            Archive Management Protocol v1.0
          </p>
        </div>
        <button
            @click="isUploadModalOpen = true"
            class="flex items-center justify-center gap-2 px-6 py-3 bg-secondary-600 hover:bg-secondary-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-secondary-600/20 active:scale-95"
        >
          <CloudUpload class="w-4 h-4" />
          Unggah Media
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div class="bg-white dark:bg-white/5 border border-primary-100 dark:border-white/10 p-5 rounded-2xl flex justify-between items-center shadow-sm">
          <div>
            <p class="text-[10px] font-black text-primary-400 uppercase tracking-widest">Total Media</p>
            <p class="text-2xl font-black text-primary-900 dark:text-white">{{ galleryItems.length }}</p>
          </div>
          <Layers class="w-10 h-10 text-indigo-500 bg-indigo-500/10 p-2 rounded-xl" />
        </div>
        <div class="bg-white dark:bg-white/5 border border-primary-100 dark:border-white/10 p-5 rounded-2xl flex justify-between items-center shadow-sm">
          <div>
            <p class="text-[10px] font-black text-primary-400 uppercase tracking-widest">Foto</p>
            <p class="text-2xl font-black text-primary-900 dark:text-white">
              {{ galleryItems.filter(m => m.type === 'photo').length }}
            </p>
          </div>
          <Camera class="w-10 h-10 text-sky-500 bg-sky-500/10 p-2 rounded-xl" />
        </div>
        <div class="bg-white dark:bg-white/5 border border-primary-100 dark:border-white/10 p-5 rounded-2xl flex justify-between items-center shadow-sm">
          <div>
            <p class="text-[10px] font-black text-primary-400 uppercase tracking-widest">Video</p>
            <p class="text-2xl font-black text-primary-900 dark:text-white">
              {{ galleryItems.filter(m => m.type === 'video').length }}
            </p>
          </div>
          <Video class="w-10 h-10 text-purple-500 bg-purple-500/10 p-2 rounded-xl" />
        </div>
      </div>

      <div class="flex gap-2">
        <button
            v-for="filter in ['all', 'photo', 'video']"
            :key="filter"
            @click="currentFilter = filter"
            class="px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border"
            :class="currentFilter === filter
            ? 'bg-secondary-600 border-secondary-600 text-white shadow-lg'
            : 'bg-white dark:bg-white/5 border-primary-100 dark:border-white/10 text-primary-400 hover:text-secondary-600'"
        >
          {{ filter }}
        </button>
      </div>

      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="i in 4" :key="i" class="aspect-video bg-primary-100 dark:bg-white/5 animate-pulse rounded-2xl"></div>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
            v-for="item in filteredItems"
            :key="item.id"
            @click="openPreview(item)"
            class="group relative bg-white dark:bg-white/5 border border-primary-100 dark:border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all"
        >
          <div class="aspect-video overflow-hidden relative">
            <img :src="item.thumbnail" class="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" />
            <div class="absolute inset-0 bg-primary-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <PlayCircle v-if="item.type === 'video'" class="w-12 h-12 text-white" />
              <Search v-else class="w-8 h-8 text-white" />
            </div>
          </div>
          <div class="p-4">
            <h4 class="text-xs font-black text-primary-900 dark:text-white uppercase truncate">{{ item.title }}</h4>
            <p class="text-[9px] font-bold text-primary-400 mt-1">{{ item.created_at }}</p>
          </div>
        </div>
      </div>

      <div v-if="!loading && filteredItems.length === 0" class="p-20 text-center border-2 border-dashed border-primary-100 dark:border-white/10 rounded-[2.5rem]">
        <ImageIcon class="w-12 h-12 mx-auto text-primary-200 mb-4" />
        <p class="text-xs font-black text-primary-400 uppercase tracking-widest">Belum ada media di folder ini</p>
      </div>
    </div>

    <div v-if="isUploadModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-primary-950/60 backdrop-blur-sm" @click="isUploadModalOpen = false"></div>
      <div class="relative bg-white dark:bg-primary-900 w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden">
        <div class="p-8 space-y-6">
          <h3 class="text-xl font-black text-primary-900 dark:text-white uppercase tracking-tighter">Upload <span class="text-secondary-600">New Media</span></h3>
          <form @submit.prevent="handleUpload" class="space-y-4">
            <input v-model="form.title" required placeholder="JUDUL MEDIA" class="w-full bg-primary-50 dark:bg-white/5 border border-primary-100 dark:border-white/10 rounded-2xl px-5 py-3 text-xs font-bold dark:text-white outline-none focus:ring-2 focus:ring-secondary-500" />
            <select v-model="form.type" class="w-full bg-primary-50 dark:bg-white/5 border border-primary-100 dark:border-white/10 rounded-2xl px-5 py-3 text-xs font-bold dark:text-white">
              <option value="photo">Foto (Image File)</option>
              <option value="video">Video (File / URL)</option>
            </select>
            <div v-if="form.type === 'photo'" @click="$refs.fileInput.click()" class="border-2 border-dashed border-primary-100 dark:border-white/10 rounded-2xl p-8 text-center cursor-pointer hover:bg-primary-50 dark:hover:bg-white/5 transition-all">
              <input type="file" ref="fileInput" class="hidden" @change="handleFileChange" accept="image/*" />
              <div v-if="!form.previewUrl">
                <CloudUpload class="w-10 h-10 mx-auto text-primary-300 mb-2" />
                <p class="text-[10px] font-black text-primary-400 uppercase tracking-widest">Klik atau seret foto ke sini</p>
              </div>
              <img v-else :src="form.previewUrl" class="max-h-32 mx-auto rounded-lg" />
            </div>
            <div class="flex gap-3 pt-4">
              <button type="button" @click="isUploadModalOpen = false" class="flex-1 px-6 py-4 border border-white/10 rounded-2xl font-black text-[10px] uppercase text-primary-400">Cancel</button>
              <button type="submit" class="flex-1 px-6 py-4 bg-secondary-600 text-white rounded-2xl font-black text-[10px] uppercase shadow-lg shadow-secondary-600/20">Save Media</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div v-if="isPreviewModalOpen" class="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-primary-950/90 backdrop-blur-md" @click="isPreviewModalOpen = false"></div>
      <div class="relative w-full max-w-4xl animate-in zoom-in-95 duration-300">
        <button @click="isPreviewModalOpen = false" class="absolute -top-12 right-0 text-white flex items-center gap-2 font-black text-[10px] uppercase tracking-widest hover:text-secondary-500 transition-colors">
          Close <X class="w-4 h-4" />
        </button>

        <div class="bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          <div class="aspect-video flex items-center justify-center bg-primary-950">
            <img v-if="activePreview?.type === 'photo'" :src="activePreview?.url" class="max-h-full w-full object-contain" />

            <template v-else>
              <iframe v-if="isYouTube(activePreview?.video_url)" :src="getYoutubeEmbed(activePreview?.video_url)" class="w-full h-full" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
              <video v-else controls autoplay class="w-full h-full outline-none">
                <source :src="activePreview?.video_url" type="video/mp4">
                Browsermu tidak mendukung pemutar video.
              </video>
            </template>
          </div>

          <div class="p-6 bg-white dark:bg-primary-900 flex justify-between items-center border-t dark:border-white/10">
            <div>
              <h3 class="text-lg font-black text-primary-900 dark:text-white uppercase tracking-tight">{{ activePreview?.title }}</h3>
              <p class="text-xs text-primary-400 font-medium">{{ activePreview?.description }}</p>
            </div>
            <button @click="deleteMedia(activePreview?.id)" class="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
              <Trash2 class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
</template>
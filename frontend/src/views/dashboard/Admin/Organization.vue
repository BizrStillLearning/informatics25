<script setup>
import { ref, onMounted, computed } from 'vue';
import {
  Users, UserPlus, ShieldCheck, Mail,
  Phone, GraduationCap, IdCard, Trash2,
  Edit2, Filter, Building2, X
} from 'lucide-vue-next';
import Layout from "../../../components/layouts/dashboard/Layout.vue";
import api from '../../../api/axios';
import Swal from 'sweetalert2';

const loading = ref(true);
const members = ref([]);
const currentFilter = ref('all');
const isModalOpen = ref(false);
const isEdit = ref(false);

const form = ref({
  id: null,
  name: '',
  position: 'Komting',
  nim: '',
  prodi: 'Teknik Informatika',
  email: '',
  phone: '',
  photo: ''
});

const positionOrder = {
  "Komting": 1, "Wakil Komting": 2, "Sekretaris": 3,
  "Wakil Sekretaris": 4, "Bendahara": 5, "Wakil Bendahara": 6
};

const dummyMembers = [
  { id: 1, name: "Abidzar Dzakwan S.", position: "Komting", nim: "20251337037", prodi: "Teknik Informatika", email: "abidzar@informatics.id", phone: "08123456789", photo: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 2, name: "Siti Aminah", position: "Sekretaris", nim: "20251337038", prodi: "Teknik Informatika", email: "siti@informatics.id", phone: "08123456781", photo: "https://randomuser.me/api/portraits/women/44.jpg" },
];

const fetchMembers = async () => {
  loading.value = true;
  try {
    members.value = dummyMembers;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const filteredMembers = computed(() => {
  let filtered = [...members.value];
  if (currentFilter.value !== 'all') {
    filtered = filtered.filter(m => m.position === currentFilter.value);
  }
  return filtered.sort((a, b) => (positionOrder[a.position] || 99) - (positionOrder[b.position] || 99));
});

const openModal = (data = null) => {
  if (data) {
    isEdit.value = true;
    form.value = { ...data };
  } else {
    isEdit.value = false;
    form.value = { id: null, name: '', position: 'Komting', nim: '', prodi: 'Teknik Informatika', email: '', phone: '', photo: '' };
  }
  isModalOpen.value = true;
};

const handleSubmit = async () => {
  Swal.fire('Success', isEdit.value ? 'Profile updated' : 'Member added', 'success');
  isModalOpen.value = false;
  fetchMembers();
};

const confirmDelete = (id) => {
  Swal.fire({
    title: 'Hapus Pengurus?',
    text: "Tindakan ini tidak dapat dibatalkan!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    confirmButtonText: 'Ya, Hapus!'
  }).then((result) => {
    if (result.isConfirmed) {
      members.value = members.value.filter(m => m.id !== id);
      Swal.fire('Deleted', 'Member has been removed.', 'success');
    }
  });
};

const getBadgeColor = (pos) => {
  if (pos.includes('Komting')) return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
  if (pos.includes('Sekretaris')) return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
  if (pos.includes('Bendahara')) return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
  return 'bg-primary-500/10 text-primary-500 border-primary-500/20';
};

onMounted(fetchMembers);
</script>

<template>
    <div class="p-8 space-y-6">

      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-black text-primary-900 dark:text-white uppercase tracking-tighter">
            Struktur <span class="text-secondary-600 dark:text-emerald-500">Organisasi</span>
          </h2>
          <p class="text-[8px] font-bold text-primary-400 dark:text-primary-500 uppercase tracking-[0.4em]">
            Core Council Monitoring Protocol v1.0
          </p>
        </div>
        <button @click="openModal()" class="flex items-center justify-center gap-2 px-6 py-3 bg-secondary-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-secondary-600/20 active:scale-95 transition-all">
          <UserPlus class="w-4 h-4" /> Tambah Pengurus
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="(val, label, i) in { 'Total Pengurus': members.length, 'Jabatan Aktif': 6, 'Periode': '2025/26', 'Staff Ahli': 0 }" :key="i"
             class="bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 p-4 rounded-2xl shadow-soft">
          <p class="text-[9px] font-black text-primary-400 uppercase tracking-widest">{{ label }}</p>
          <p class="text-xl font-black text-primary-900 dark:text-white">{{ val }}</p>
        </div>
      </div>

      <div class="flex flex-wrap gap-2 p-2 bg-white/30 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl overflow-x-auto">
        <button v-for="pos in ['all', 'Komting', 'Wakil Komting', 'Sekretaris', 'Bendahara']" :key="pos"
                @click="currentFilter = pos"
                :class="currentFilter === pos ? 'bg-secondary-600 text-white shadow-lg' : 'hover:bg-white/50 dark:hover:bg-white/10 text-primary-500'"
                class="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
          {{ pos }}
        </button>
      </div>

      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="i in 4" :key="i" class="h-64 bg-white/20 animate-pulse rounded-3xl"></div>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="member in filteredMembers" :key="member.id"
             class="group relative bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-[2.5rem] overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-300">

          <div class="h-20 bg-gradient-to-br from-secondary-600/40 to-indigo-600/40 opacity-50"></div>

          <div class="relative px-5 pb-6">
            <div class="flex justify-center -mt-10 mb-4">
              <img :src="member.photo" class="w-20 h-20 rounded-3xl object-cover border-4 border-white/50 dark:border-primary-900 shadow-2xl group-hover:scale-110 transition-transform" />
            </div>

            <div class="text-center space-y-1 mb-4">
              <h3 class="text-xs font-black text-primary-900 dark:text-white uppercase truncate">{{ member.name }}</h3>
              <span :class="getBadgeColor(member.position)" class="inline-block px-3 py-0.5 rounded-lg text-[8px] font-black uppercase border">
                {{ member.position }}
              </span>
            </div>

            <div class="space-y-2 pt-4 border-t border-white/20 dark:border-white/10">
              <div class="flex items-center gap-3 text-primary-400">
                <IdCard class="w-3 h-3" /> <span class="text-[9px] font-bold font-mono tracking-tighter">{{ member.nim }}</span>
              </div>
              <div class="flex items-center gap-3 text-primary-400">
                <Mail class="w-3 h-3" /> <span class="text-[9px] font-bold truncate">{{ member.email }}</span>
              </div>
            </div>

            <div class="flex gap-2 mt-5">
              <button @click="openModal(member)" class="flex-1 py-2 bg-indigo-500/10 text-indigo-500 rounded-xl text-[9px] font-black uppercase hover:bg-indigo-500 hover:text-white transition-all">Edit</button>
              <button @click="confirmDelete(member.id)" class="flex-1 py-2 bg-red-500/10 text-red-500 rounded-xl text-[9px] font-black uppercase hover:bg-red-500 hover:text-white transition-all">Hapus</button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!loading && filteredMembers.length === 0" class="p-20 text-center border-2 border-dashed border-white/20 rounded-[3rem]">
        <Building2 class="w-12 h-12 mx-auto text-primary-200 mb-4" />
        <p class="text-xs font-black text-primary-400 uppercase tracking-widest">Protocol Member Not Found</p>
      </div>
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-primary-950/60 backdrop-blur-sm" @click="isModalOpen = false"></div>
      <div class="relative bg-white/90 dark:bg-primary-900/90 backdrop-blur-2xl w-full max-w-lg rounded-[3rem] shadow-2xl border border-white/20 p-8">
        <h3 class="text-xl font-black text-primary-900 dark:text-white uppercase tracking-tighter mb-6">
          {{ isEdit ? 'Update' : 'Deploy' }} <span class="text-secondary-600">Member</span>
        </h3>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="text-[9px] font-black text-primary-400 uppercase ml-2">Full Name</label>
            <input v-model="form.name" required class="w-full bg-primary-50 dark:bg-white/5 border border-primary-100 dark:border-white/10 rounded-2xl px-5 py-3 text-xs font-bold dark:text-white outline-none focus:ring-2 focus:ring-secondary-500" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-[9px] font-black text-primary-400 uppercase ml-2">Position</label>
              <select v-model="form.position" class="w-full bg-primary-50 dark:bg-white/5 border border-primary-100 dark:border-white/10 rounded-2xl px-5 py-3 text-xs font-bold dark:text-white outline-none">
                <option v-for="p in Object.keys(positionOrder)" :key="p">{{ p }}</option>
              </select>
            </div>
            <div>
              <label class="text-[9px] font-black text-primary-400 uppercase ml-2">NIM</label>
              <input v-model="form.nim" class="w-full bg-primary-50 dark:bg-white/5 border border-primary-100 dark:border-white/10 rounded-2xl px-5 py-3 text-xs font-bold dark:text-white outline-none" />
            </div>
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
</style>
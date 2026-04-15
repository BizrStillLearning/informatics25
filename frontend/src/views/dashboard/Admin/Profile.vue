<script setup>
import { ref, onMounted } from 'vue';
import {
  User, Mail, Phone, ShieldCheck,
  Key, LogOut, Edit3, Camera,
  Calendar, MapPin, CheckCircle2, X
} from 'lucide-vue-next';
import Layout from "../../../components/layouts/dashboard/Layout.vue";
import { useAuthStore } from "../../../stores/authStore.js";
import Swal from 'sweetalert2';

const authStore = useAuthStore();
const isEditModalOpen = ref(false);

const adminData = ref({
  name: "Abidzar Dzakwan S.",
  fullname: "Abidzar Dzakwan Sahudi",
  role: "Super Administrator",
  email: "abidzar@informatics25.web.id",
  username: "admin_abidzar",
  phone: "+62 812 3456 7890",
  lastLogin: "13 April 2026 11:50",
  location: "Surabaya, Indonesia",
  bio: "Informatics Engineering Student & Full-stack Developer passionate about Core Protocol Security."
});

const handleUpdateProfile = () => {
  Swal.fire({
    title: 'Update Profile?',
    text: "Pastikan data yang dimasukkan sudah benar.",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#6366f1',
    confirmButtonText: 'Ya, Simpan'
  }).then((result) => {
    if (result.isConfirmed) {
      isEditModalOpen.value = false;
      Swal.fire('Berhasil!', 'Profil Anda telah diperbarui.', 'success');
    }
  });
};

const changePassword = () => {
  Swal.fire({
    title: 'Ubah Password',
    input: 'password',
    inputLabel: 'Password Baru',
    inputPlaceholder: 'Masukkan password baru',
    showCancelButton: true,
    confirmButtonColor: '#6366f1',
  });
};
</script>

<template>
    <div class="p-8 space-y-6">

      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-black text-primary-900 dark:text-white uppercase tracking-tighter">
            User <span class="text-secondary-600 dark:text-emerald-500">Profile</span>
          </h2>
          <p class="text-[8px] font-bold text-primary-400 dark:text-primary-500 uppercase tracking-[0.4em]">
            Identity Verification Protocol v1.0
          </p>
        </div>
        <button @click="isEditModalOpen = true" class="flex items-center justify-center gap-2 px-6 py-3 bg-secondary-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-secondary-600/20 active:scale-95 transition-all">
          <Edit3 class="w-4 h-4" /> Edit Profile
        </button>
      </div>

      <div class="bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">

        <div class="h-40 bg-gradient-to-r from-indigo-600 via-purple-600 to-secondary-600 relative">
          <div class="absolute inset-0 bg-black/10"></div>
          <div class="absolute bottom-4 right-8">
             <span class="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-[10px] font-black text-white uppercase tracking-widest">
               Access Level: Root
             </span>
          </div>
        </div>

        <div class="px-8 pb-10">
          <div class="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 relative z-10">
            <div class="relative group">
              <div class="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-secondary-500 to-indigo-600 p-1 shadow-2xl">
                <div class="w-full h-full rounded-[2.3rem] bg-primary-900 flex items-center justify-center text-white text-5xl font-black border-4 border-white dark:border-primary-900 overflow-hidden">
                  AD
                </div>
              </div>
              <button class="absolute bottom-0 right-0 p-2 bg-white dark:bg-primary-800 rounded-xl shadow-lg border border-primary-100 dark:border-white/10 text-secondary-600">
                <Camera class="w-4 h-4" />
              </button>
            </div>

            <div class="flex-1 space-y-1 py-2">
              <div class="flex items-center gap-3">
                <h3 class="text-3xl font-black text-primary-900 dark:text-white uppercase tracking-tighter">{{ adminData.name }}</h3>
                <CheckCircle2 class="w-6 h-6 text-blue-500 fill-blue-500/10" />
              </div>
              <p class="text-sm font-bold text-secondary-600 dark:text-emerald-500 uppercase tracking-widest">{{ adminData.role }}</p>
              <div class="flex flex-wrap gap-4 mt-3">
                <span class="flex items-center gap-2 text-[10px] font-black text-primary-400 uppercase"><MapPin class="w-3 h-3" /> {{ adminData.location }}</span>
                <span class="flex items-center gap-2 text-[10px] font-black text-primary-400 uppercase"><Calendar class="w-3 h-3" /> Joined April 2025</span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">

            <div class="md:col-span-2 space-y-6">
              <div class="bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 p-8 rounded-[2.5rem] space-y-6">
                <h4 class="text-[10px] font-black text-primary-400 uppercase tracking-[0.3em] border-b border-primary-100 dark:border-white/10 pb-4 flex items-center gap-2">
                  <User class="w-4 h-4" /> Personnel Information
                </h4>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div class="space-y-1">
                    <p class="text-[9px] font-black text-primary-400 uppercase">Full Legal Name</p>
                    <p class="text-sm font-bold text-primary-900 dark:text-white">{{ adminData.fullname }}</p>
                  </div>
                  <div class="space-y-1">
                    <p class="text-[9px] font-black text-primary-400 uppercase">Official Email</p>
                    <p class="text-sm font-bold text-primary-900 dark:text-white">{{ adminData.email }}</p>
                  </div>
                  <div class="space-y-1">
                    <p class="text-[9px] font-black text-primary-400 uppercase">Username Access</p>
                    <p class="text-sm font-bold text-secondary-600">@{{ adminData.username }}</p>
                  </div>
                  <div class="space-y-1">
                    <p class="text-[9px] font-black text-primary-400 uppercase">Secure Contact</p>
                    <p class="text-sm font-bold text-primary-900 dark:text-white">{{ adminData.phone }}</p>
                  </div>
                </div>

                <div class="pt-4">
                  <p class="text-[9px] font-black text-primary-400 uppercase mb-2">Biography / System Note</p>
                  <p class="text-xs text-primary-600 dark:text-primary-300 leading-relaxed font-medium italic">
                    "{{ adminData.bio }}"
                  </p>
                </div>
              </div>
            </div>

            <div class="space-y-6">
              <div class="bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 p-8 rounded-[2.5rem] space-y-6">
                <h4 class="text-[10px] font-black text-primary-400 uppercase tracking-[0.3em] border-b border-primary-100 dark:border-white/10 pb-4 flex items-center gap-2">
                  <ShieldCheck class="w-4 h-4" /> Security Status
                </h4>

                <div class="space-y-4">
                  <div class="flex justify-between items-center bg-green-500/5 p-3 rounded-xl border border-green-500/10">
                    <span class="text-[9px] font-black text-green-600 uppercase">Account Status</span>
                    <span class="px-2 py-1 bg-green-500 text-white text-[8px] font-black rounded-lg uppercase">Active</span>
                  </div>

                  <div class="p-4 bg-primary-50 dark:bg-primary-900/40 rounded-2xl border border-primary-100 dark:border-white/5">
                    <p class="text-[8px] font-black text-primary-400 uppercase mb-1">Last Secure Login</p>
                    <p class="text-[10px] font-bold text-primary-900 dark:text-white tracking-tight">{{ adminData.lastLogin }}</p>
                  </div>

                  <button @click="changePassword" class="w-full py-3 px-4 flex items-center justify-center gap-2 bg-primary-900 dark:bg-white/10 text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-secondary-600 transition-all shadow-lg">
                    <Key class="w-3 h-3" /> Reset Protocol Key
                  </button>

                  <button @click="authStore.logout()" class="w-full py-3 px-4 flex items-center justify-center gap-2 border border-red-500/20 text-red-500 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
                    <LogOut class="w-3 h-3" /> Terminate Session
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div v-if="isEditModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-primary-950/60 backdrop-blur-sm" @click="isEditModalOpen = false"></div>
      <div class="relative bg-white/90 dark:bg-primary-900/90 backdrop-blur-2xl w-full max-w-2xl rounded-[3rem] shadow-2xl border border-white/20 p-8 animate-in zoom-in-95 duration-300">
        <div class="flex justify-between items-center mb-8">
          <h3 class="text-xl font-black text-primary-900 dark:text-white uppercase tracking-tighter">Update <span class="text-secondary-600">Personnel Data</span></h3>
          <button @click="isEditModalOpen = false" class="text-primary-400 hover:text-white"><X /></button>
        </div>

        <form @submit.prevent="handleUpdateProfile" class="space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="space-y-1">
              <label class="text-[9px] font-black text-primary-400 uppercase ml-2">Full Name</label>
              <input v-model="adminData.fullname" class="w-full bg-white dark:bg-white/5 border border-primary-100 dark:border-white/10 rounded-2xl px-5 py-3 text-xs font-bold dark:text-white outline-none focus:ring-2 focus:ring-secondary-500" />
            </div>
            <div class="space-y-1">
              <label class="text-[9px] font-black text-primary-400 uppercase ml-2">Display Name</label>
              <input v-model="adminData.name" class="w-full bg-white dark:bg-white/5 border border-primary-100 dark:border-white/10 rounded-2xl px-5 py-3 text-xs font-bold dark:text-white outline-none focus:ring-2 focus:ring-secondary-500" />
            </div>
            <div class="space-y-1">
              <label class="text-[9px] font-black text-primary-400 uppercase ml-2">Email Address</label>
              <input v-model="adminData.email" type="email" class="w-full bg-white dark:bg-white/5 border border-primary-100 dark:border-white/10 rounded-2xl px-5 py-3 text-xs font-bold dark:text-white outline-none focus:ring-2 focus:ring-secondary-500" />
            </div>
            <div class="space-y-1">
              <label class="text-[9px] font-black text-primary-400 uppercase ml-2">Contact Number</label>
              <input v-model="adminData.phone" class="w-full bg-white dark:bg-white/5 border border-primary-100 dark:border-white/10 rounded-2xl px-5 py-3 text-xs font-bold dark:text-white outline-none focus:ring-2 focus:ring-secondary-500" />
            </div>
          </div>
          <div class="space-y-1">
            <label class="text-[9px] font-black text-primary-400 uppercase ml-2">Biography</label>
            <textarea v-model="adminData.bio" rows="3" class="w-full bg-white dark:bg-white/5 border border-primary-100 dark:border-white/10 rounded-2xl px-5 py-3 text-xs font-bold dark:text-white outline-none focus:ring-2 focus:ring-secondary-500"></textarea>
          </div>

          <div class="flex gap-3 pt-4">
            <button type="button" @click="isEditModalOpen = false" class="flex-1 px-6 py-4 border border-primary-100 dark:border-white/10 rounded-2xl font-black text-[10px] uppercase text-primary-400">Cancel</button>
            <button type="submit" class="flex-1 px-6 py-4 bg-secondary-600 text-white rounded-2xl font-black text-[10px] uppercase shadow-lg shadow-secondary-600/20">Execute Update</button>
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
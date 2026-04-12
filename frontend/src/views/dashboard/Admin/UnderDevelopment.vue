<script setup>
import { ref } from 'vue';
import { Settings, Construction, Rocket, ChevronLeft } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
    <div class="relative min-h-[80vh] flex items-center justify-center overflow-hidden rounded-[3rem]">

      <div class="absolute top-1/4 -left-20 w-72 h-72 bg-secondary-600/30 rounded-full blur-[100px] animate-pulse"></div>
      <div class="absolute bottom-1/4 -right-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-[120px] animate-bounce duration-[5s]"></div>

      <div class="relative z-10 w-full max-w-2xl mx-4">
        <div class="bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-[3rem] p-10 md:p-16 shadow-2xl text-center space-y-8">

          <div class="relative flex justify-center">
            <div class="absolute inset-0 scale-150 bg-secondary-600/20 rounded-full blur-3xl animate-pulse"></div>
            <div class="relative bg-gradient-to-br from-secondary-500 to-secondary-700 p-6 rounded-3xl shadow-lg shadow-secondary-600/40">
              <Construction class="w-12 h-12 text-white animate-bounce" />
            </div>
            <Settings class="absolute -top-2 -right-2 w-8 h-8 text-primary-400 animate-[spin_4s_linear_infinite]" />
          </div>

          <div class="space-y-3">
            <h2 class="text-3xl md:text-4xl font-black text-primary-900 dark:text-white uppercase tracking-tighter">
              Protocol <span class="text-secondary-600">Under Development</span>
            </h2>
            <p class="text-[10px] md:text-xs font-bold text-primary-500 dark:text-primary-400 uppercase tracking-[0.5em] max-w-md mx-auto leading-relaxed">
              Kami sedang melakukan enkripsi dan sinkronisasi modul baru untuk meningkatkan fungsionalitas sistem.
            </p>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between items-center px-2">
              <span class="text-[9px] font-black text-secondary-600 uppercase tracking-widest">Progress: 75%</span>
              <span class="text-[9px] font-black text-primary-400 uppercase tracking-widest">v1.0.4-beta</span>
            </div>
            <div class="w-full h-3 bg-primary-900/10 dark:bg-white/5 rounded-full overflow-hidden border border-white/10 p-0.5">
              <div class="h-full bg-gradient-to-r from-secondary-600 to-indigo-600 rounded-full animate-[loading-bar_2s_infinite] w-3/4"></div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
                @click="router.back()"
                class="flex items-center justify-center gap-2 px-8 py-4 bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 text-primary-900 dark:text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border border-white/20 shadow-xl"
            >
              <ChevronLeft class="w-4 h-4" /> Go Back
            </button>
            <button
                class="flex items-center justify-center gap-2 px-8 py-4 bg-secondary-600 hover:bg-secondary-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-secondary-600/30 active:scale-95"
            >
              <Rocket class="w-4 h-4" /> Notify Me
            </button>
          </div>

        </div>
      </div>

    </div>
</template>

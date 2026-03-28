<script setup>
import {
  Heart,
  Target,
  Lightbulb,
  Award,
  ArrowRight
} from 'lucide-vue-next';

const focusAreas = [
  {
    title: 'Visi Kami',
    desc: 'Menjadi angkatan yang inovatif dan solid dalam menghadapi tantangan teknologi masa depan.',
    icon: Target,
    color: 'bg-blue-500'
  },
  {
    title: 'Inovasi',
    desc: 'Selalu bereksperimen dengan ide-ide baru melalui berbagai project kolaboratif.',
    icon: Lightbulb,
    color: 'bg-amber-500'
  }
];
</script>

<template>
  <section id="about" class="py-24 bg-gray-50 overflow-hidden">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

        <div class="relative w-full lg:w-1/2 flex justify-center">
          <div
              v-motion
              :initial="{ opacity: 0, x: -50 }"
              :visible="{ opacity: 1, x: 0, transition: { duration: 800 } }"
              class="relative w-full max-w-[400px] aspect-[4/5] bg-blue-600 rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

            <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070"
                alt="Angkatan 25 Group"
                class="w-full h-full object-cover mix-blend-overlay opacity-90"
            />
          </div>

          <div
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :visible="{ opacity: 1, y: 0, transition: { delay: 400 } }"
              class="absolute -top-6 -left-4 md:-left-10 bg-white p-5 rounded-2xl shadow-xl flex items-center gap-4 border border-gray-100 z-20"
          >
            <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <Award class="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">Status</p>
              <p class="text-sm font-bold text-gray-900 leading-none">Angkatan Emas</p>
            </div>
          </div>

          <div
              v-motion
              :initial="{ opacity: 0, y: -20 }"
              :visible="{ opacity: 1, y: 0, transition: { delay: 600 } }"
              class="absolute -bottom-6 -right-4 md:-right-10 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 z-20"
          >
            <div class="flex items-center gap-2 mb-2">
              <Heart class="w-5 h-5 text-red-500 fill-red-500" />
              <span class="text-sm font-bold text-gray-900">Solidaritas</span>
            </div>
            <div class="flex -space-x-3">
              <div v-for="i in 4" :key="i" class="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                <img :src="`https://i.pravatar.cc/100?img=${i+10}`" alt="member" />
              </div>
              <div class="w-8 h-8 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
                +120
              </div>
            </div>
          </div>
        </div>

        <div
            v-motion
            :initial="{ opacity: 0, x: 50 }"
            :visible="{ opacity: 1, x: 0, transition: { duration: 800 } }"
            class="w-full lg:w-1/2"
        >
          <div class="flex items-center gap-3 mb-6">
            <div class="w-12 h-0.5 bg-blue-600"></div>
            <span class="text-blue-600 font-bold uppercase tracking-[0.3em] text-xs">Tentang Kami</span>
          </div>

          <h2 class="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">
            Membangun <span class="text-blue-600">Koneksi</span> Melalui Teknologi & Kreativitas.
          </h2>

          <p class="text-gray-500 text-lg leading-relaxed mb-10">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores beatae, debitis dolor enim molestias nam neque nesciunt nulla officia officiis placeat qui saepe, sequi tempora veniam vitae? Facilis, quasi.
          </p>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
h2 {
  letter-spacing: -0.02em;
}
</style>
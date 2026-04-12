<script setup>
defineProps({
  title: String,
  value: [String, Number],
  icon: Object,
  trend: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: 'from-blue-500/20 to-cyan-500/20'
  },
  iconColor: {
    type: String,
    default: 'text-blue-400'
  },
  progress: {
    type: String,
    default: null
  },
  progressBar: {
    type: String,
    default: 'from-blue-500 to-cyan-500'
  }
});
</script>

<template>
  <div class="stat-card bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group hover:-translate-y-1 shadow-2xl">

    <div class="flex justify-between items-start mb-4">
      <div
          class="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center bg-gradient-to-br transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg"
          :class="color"
      >
        <component :is="icon" class="w-6 h-6" :class="iconColor" />
      </div>

      <span v-if="trend" class="text-emerald-400 text-[10px] font-black bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-full tracking-tighter">
        {{ trend }}
      </span>
    </div>

    <div class="flex flex-col min-w-0">
      <h3 class="text-2xl font-black text-white tracking-tighter leading-none tabular-nums mb-1">
        {{ value }}
      </h3>
      <p class="text-[10px] font-bold text-white/40 uppercase tracking-[0.15em] leading-tight truncate">
        {{ title }}
      </p>
    </div>

    <div v-if="progress" class="mt-4">
      <div class="h-1 bg-white/10 rounded-full overflow-hidden">
        <div
            class="h-full rounded-full bg-gradient-to-r transition-all duration-1000 ease-out progress-shimmer"
            :class="progressBar"
            :style="{ width: progress }"
        ></div>
      </div>
    </div>

  </div>
</template>
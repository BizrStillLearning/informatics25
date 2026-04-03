<script setup>
defineProps({
  title: String,
  value: [String, Number],
  icon: Object,
  color: {
    type: String,
    default: 'bg-blue-500/10 text-blue-600'
  }
});
</script>

<template>
  <div class="flex items-center gap-4 p-4 bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-white/5 rounded-2xl shadow-sm transition-all duration-300 group">

    <div
        class="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
        :class="color"
    >
      <component :is="icon" class="w-5 h-5" />
    </div>

    <div class="flex flex-col min-w-0">
      <p class="text-[9px] font-black text-gray-400 dark:text-primary-500 uppercase tracking-[0.15em] leading-tight mb-1 truncate">
        {{ title }}
      </p>
      <h3 class="text-xl font-black text-gray-900 dark:text-white tracking-tighter leading-none tabular-nums">
        {{ value }}
      </h3>
    </div>

  </div>
</template>
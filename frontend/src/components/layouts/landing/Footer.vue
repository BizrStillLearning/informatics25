<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  Instagram,
  Github,
  ArrowUp,
  Heart,
  MessageCircle,
  Disc,
  MapPin
} from 'lucide-vue-next';

const { t } = useI18n();

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const currentYear = new Date().getFullYear();

const waNumber = "6289601261250";
const waLink = computed(() => `https://wa.me/${waNumber}?text=${encodeURIComponent(t('footer.wa_text'))}`);

const links = [
  { name: 'home', href: '#' },
  { name: 'about', href: '#about' },
  { name: 'structure', href: '#structure' },
  { name: 'gallery', href: '#gallery' },
  { name: 'students', href: '/students' },
];
</script>

<template>
  <footer class="relative bg-white dark:bg-primary-950 pt-24 overflow-hidden selection:bg-secondary-600 selection:text-white transition-colors duration-500">

    <div class="absolute top-0 left-0 w-full rotate-180 leading-[0] z-0 opacity-50 dark:opacity-10">
      <svg class="relative block w-[calc(100%+1.3px)] h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.23,103.19,114.4,117.29,172,118.71c57.59,1.42,114.44-12.79,149.39-22.27Z"
              class="fill-primary-50 dark:fill-primary-900"></path>
      </svg>
    </div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-16 pb-20">

        <div class="md:col-span-5 space-y-8">
          <div class="space-y-6">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-secondary-600 dark:bg-dark-600 rounded-2xl flex items-center justify-center shadow-xl shadow-secondary-600/20 dark:shadow-dark-600/30">
                <span class="text-white font-black text-xl">25</span>
              </div>
              <h2 class="text-2xl font-black tracking-tighter text-primary-900 dark:text-white uppercase">
                Informatics <span class="text-secondary-600 dark:text-dark-600 italic">25</span>
              </h2>
            </div>
            <p class="text-primary-500 dark:text-primary-400 text-sm leading-relaxed max-w-sm font-medium">
              {{ t('footer.description') }}
            </p>
          </div>

          <div class="flex gap-4">
            <a href="#" class="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-900 flex items-center justify-center text-primary-400 hover:bg-pink-600 hover:text-white transition-all shadow-sm group">
              <Instagram class="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <a href="#" class="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-900 flex items-center justify-center text-primary-400 hover:bg-[#5865F2] hover:text-white transition-all shadow-sm group">
              <Disc class="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <a href="#" class="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-900 flex items-center justify-center text-primary-400 hover:bg-primary-900 dark:hover:bg-dark-600 hover:text-white transition-all shadow-sm group">
              <Github class="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>

        <div class="md:col-span-3 space-y-8">
          <h4 class="font-black text-primary-900 dark:text-white uppercase text-[10px] tracking-[0.3em]">{{ t('footer.nav_title') }}</h4>
          <ul class="space-y-4">
            <li v-for="link in links" :key="link.name">
              <a :href="link.href" class="text-sm text-primary-500 dark:text-primary-400 hover:text-secondary-600 dark:hover:text-dark-600 flex items-center gap-3 group transition-all font-bold uppercase tracking-wider">
                <div class="w-1.5 h-1.5 rounded-full bg-primary-200 dark:bg-primary-800 group-hover:bg-secondary-600 dark:group-hover:bg-dark-600 group-hover:scale-150 transition-all duration-300"></div>
                {{ t(`nav.${link.name}`) }}
              </a>
            </li>
          </ul>
        </div>

        <div class="md:col-span-4 space-y-8">
          <h4 class="font-black text-primary-900 dark:text-white uppercase text-[10px] tracking-[0.3em]">{{ t('footer.contact_title') }}</h4>

          <div class="bg-secondary-50 dark:bg-primary-900/50 backdrop-blur-md p-8 rounded-[3rem] border border-secondary-100 dark:border-primary-800 relative overflow-hidden group shadow-sm transition-all hover:shadow-2xl hover:shadow-secondary-600/10 dark:hover:shadow-dark-600/10 mb-8">
            <div class="relative z-10">
              <p class="text-secondary-600 dark:text-dark-400 text-[10px] font-black uppercase tracking-widest mb-3">Fast Response</p>
              <h3 class="text-primary-900 dark:text-white font-black text-xl mb-6 leading-tight">
                {{ t('footer.cta_title') }}
              </h3>
              <a
                  :href="waLink"
                  target="_blank"
                  class="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#128C7E] hover:shadow-lg hover:shadow-green-500/30 transition-all active:scale-95"
              >
                <MessageCircle class="w-4 h-4 fill-white/20" />
                Chat WhatsApp
              </a>
            </div>
            <MessageCircle class="absolute -bottom-6 -right-6 w-32 h-32 text-green-500/5 dark:text-green-500/10 -rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
          </div>

          <div class="px-2">
            <a
                href="https://maps.app.goo.gl/SshMvYc7UuWofY6p9"
                target="_blank"
                class="flex items-start gap-4 group transition-all"
            >
              <div class="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900 flex items-center justify-center text-secondary-600 dark:text-dark-400 shrink-0 group-hover:bg-secondary-600 group-hover:text-white transition-all duration-500 shadow-sm">
                <MapPin class="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <div class="flex flex-col">
                <span class="text-[11px] font-black text-primary-900 dark:text-white uppercase tracking-wider mb-1 group-hover:text-secondary-600 dark:group-hover:text-dark-400 transition-colors">
                  {{ t('footer.campus_name') }}
                </span>
                <p class="text-[10px] text-primary-400 dark:text-primary-500 leading-relaxed font-bold uppercase tracking-tighter">
                  {{ t('footer.building_detail') }} <br />
                  {{ t('footer.address') }}
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div class="py-10 border-t border-primary-100 dark:border-primary-800 flex flex-col md:flex-row justify-between items-center gap-8">
        <p class="text-[9px] font-black text-primary-400 dark:text-primary-600 uppercase tracking-[0.2em]">
          © {{ currentYear }} Informatics 25 Platform
        </p>

        <button
            @click="scrollToTop"
            class="flex items-center gap-4 text-[10px] font-black text-primary-900 dark:text-white hover:text-secondary-600 dark:hover:text-dark-600 transition-all group uppercase tracking-[0.3em]"
        >
          Back to Top
          <div class="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-900 flex items-center justify-center group-hover:bg-secondary-600 dark:group-hover:bg-dark-600 group-hover:text-white transition-all shadow-sm">
            <ArrowUp class="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </div>
        </button>
      </div>
    </div>

    <div class="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-secondary-100/50 dark:bg-dark-900/10 rounded-full blur-[150px] -z-10 transition-colors duration-1000"></div>
  </footer>
</template>
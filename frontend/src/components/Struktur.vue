<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  UserCircle,
  ShieldCheck,
  FileText,
  FileSearch,
  Wallet,
  Coins,
  Instagram,
  Linkedin,
  Github
} from 'lucide-vue-next';

import Profile from '../assets/img/profile.jpg'

const { t } = useI18n();

const commonColor = 'bg-secondary-600 dark:bg-dark-600';
const commonGlow = 'shadow-secondary-600/20 dark:shadow-dark-600/20';

const team = computed(() => [
  {
    role: t('structure.roles.komting'),
    name: 'Moh. Faiz Haikal',
    nim: '20251337015',
    icon: UserCircle,
    image: Profile,
    socials: { ig: '#', linkedin: '#', github: '#' }
  },
  {
    role: t('structure.roles.wakil'),
    name: 'Haqquni Naurah Widyatna',
    nim: '20251337010',
    icon: ShieldCheck,
    image: Profile,
    socials: { ig: '#', linkedin: '#', github: '#' }
  },
  {
    role: t('structure.roles.sekretaris1'),
    name: 'Manisa Ika Setyaningrum',
    nim: '20251337026',
    icon: FileText,
    image: Profile,
    socials: { ig: '#', linkedin: '#', github: '#' }
  },
  {
    role: t('structure.roles.sekretaris2'),
    name: 'Galang Gumilar Aditama',
    nim: '20251337007',
    icon: FileSearch,
    image: Profile,
    socials: { ig: '#', linkedin: '#', github: '#' }
  },
  {
    role: t('structure.roles.bendahara1'),
    name: 'Improatus Sholiha',
    nim: '20251337006',
    icon: Wallet,
    image: Profile,
    socials: { ig: '#', linkedin: '#', github: '#' }
  },
  {
    role: t('structure.roles.bendahara2'),
    name: 'Kaizer',
    nim: '25.01.2105',
    icon: Coins,
    image: Profile,
    socials: { ig: '#', linkedin: '#', github: '#' }
  }
]);
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
    <div
        v-for="(member, idx) in team"
        :key="idx"
        v-motion
        :initial="{ opacity: 0, y: 40 }"
        :visible="{ opacity: 1, y: 0, transition: { delay: idx * 100, duration: 800 } }"
        class="group h-full"
    >
      <div class="relative h-full flex flex-col bg-white/70 dark:bg-primary-900/40 backdrop-blur-2xl border border-white dark:border-primary-800 rounded-[3rem] p-10 text-center transition-all duration-500 hover:shadow-2xl hover:shadow-secondary-600/10 dark:hover:shadow-dark-600/20 hover:-translate-y-3 shadow-sm group-hover:border-secondary-200 dark:group-hover:border-dark-700">

        <div :class="[commonColor, 'absolute top-0 right-0 px-6 py-2.5 rounded-tr-[3rem] rounded-bl-[2rem] text-[9px] font-black text-white uppercase tracking-[0.2em] shadow-lg']">
          {{ member.role }}
        </div>

        <div class="relative w-32 h-32 mx-auto mb-8 shrink-0">
          <div :class="[commonColor, 'absolute inset-0 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-1000']"></div>
          <img
              :src="member.image"
              class="relative w-full h-full rounded-full object-cover border-4 border-white dark:border-primary-800 shadow-2xl z-10"
              alt="Profile"
          />
          <div :class="[commonColor, commonGlow, 'absolute -bottom-1 -right-1 w-11 h-11 rounded-2xl flex items-center justify-center text-white border-4 border-white dark:border-primary-800 shadow-xl z-20 transition-transform group-hover:rotate-12']">
            <component :is="member.icon" class="w-5 h-5" />
          </div>
        </div>

        <div class="flex-grow flex flex-col justify-center mb-6">
          <h4 class="text-xl md:text-2xl font-black text-primary-900 dark:text-white mb-2 group-hover:text-secondary-600 dark:group-hover:text-dark-400 transition-colors duration-300 tracking-tight uppercase line-clamp-2 min-h-[3.5rem] flex items-center justify-center">
            {{ member.name }}
          </h4>

          <div class="inline-flex items-center justify-center gap-2 px-3 py-1 bg-primary-100/50 dark:bg-primary-800/30 backdrop-blur-md rounded-lg border border-primary-200/50 dark:border-primary-700/50 mx-auto">
            <span class="text-[11px] font-mono font-black text-primary-600 dark:text-primary-300 tracking-wider">
              {{ member.nim }}
            </span>
          </div>
        </div>

        <div class="mt-auto">
          <p class="text-[10px] text-primary-400 dark:text-primary-500 font-black uppercase tracking-[0.2em] mb-8">
            {{ member.role }}
          </p>

          <div class="flex justify-center gap-3 relative z-30">
            <a :href="member.socials.ig" class="w-11 h-11 rounded-2xl bg-primary-50 dark:bg-primary-800 flex items-center justify-center text-primary-400 hover:bg-pink-600 hover:text-white transition-all duration-300 shadow-sm">
              <Instagram class="w-4 h-4" />
            </a>
            <a :href="member.socials.linkedin" class="w-11 h-11 rounded-2xl bg-primary-50 dark:bg-primary-800 flex items-center justify-center text-primary-400 hover:bg-secondary-600 hover:text-white transition-all duration-300 shadow-sm">
              <Linkedin class="w-4 h-4" />
            </a>
            <a :href="member.socials.github" class="w-11 h-11 rounded-2xl bg-primary-50 dark:bg-primary-800 flex items-center justify-center text-primary-400 hover:bg-primary-900 dark:hover:bg-white dark:hover:text-primary-950 hover:text-white transition-all duration-300 shadow-sm">
              <Github class="w-4 h-4" />
            </a>
          </div>
        </div>

        <div :class="[commonColor, 'absolute -bottom-24 -right-24 w-48 h-48 rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-700']"></div>
      </div>
    </div>
  </div>
</template>
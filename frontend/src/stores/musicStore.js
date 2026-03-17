import { defineStore } from 'pinia';
import MyMusic from '../assets/audio/music.mp3';

export const useMusicStore = defineStore('music', {
    state: () => ({
        audio: new Audio(MyMusic),
        isPlaying: false,
        hasStarted: false
    }),
    actions: {
        togglePlay() {
            if (this.isPlaying) {
                this.audio.pause();
            } else {
                this.audio.play();
                this.hasStarted = true;
            }
            this.isPlaying = !this.isPlaying;
        }
    }
});
import { computed } from 'vue';
import type { Track } from '~/types';

/**
 * Tiny singleton audio player for 30s Spotify previews.
 * ponytail: one shared <audio> element; previews are short and non-overlapping.
 */
export const useAudioPlayer = () => {
  const currentId = useState<string | null>('audio-current-id', () => null);
  const isPlaying = useState<boolean>('audio-playing', () => false);
  const currentTime = useState<number>('audio-current-time', () => 0);
  const duration = useState<number>('audio-duration', () => 0);
  // Holds the HTMLAudioElement (client only); not reactive on purpose.
  const audio = useState<HTMLAudioElement | null>('audio-el', () => null);

  const ensureEl = (): HTMLAudioElement | null => {
    if (!import.meta.client) return null;
    if (!audio.value) {
      const el = new Audio();
      el.addEventListener('timeupdate', () => {
        currentTime.value = el.currentTime;
      });
      el.addEventListener('loadedmetadata', () => {
        duration.value = el.duration || 0;
      });
      el.addEventListener('ended', () => {
        isPlaying.value = false;
        currentTime.value = 0;
      });
      audio.value = el;
    }
    return audio.value;
  };

  const play = (track: Track) => {
    const el = ensureEl();
    if (!el || !track.preview) return;
    if (currentId.value !== track.id) {
      el.src = track.preview;
      currentId.value = track.id;
      currentTime.value = 0;
    }
    el.play();
    isPlaying.value = true;
  };

  const pause = () => {
    audio.value?.pause();
    isPlaying.value = false;
  };

  const toggle = (track: Track) => {
    if (currentId.value === track.id && isPlaying.value) {
      pause();
    } else {
      play(track);
    }
  };

  const seek = (seconds: number) => {
    const el = ensureEl();
    if (el) el.currentTime = seconds;
  };

  const isCurrent = (id: string) => currentId.value === id;
  const isTrackPlaying = (id: string) =>
    computed(() => currentId.value === id && isPlaying.value);

  return {
    currentId,
    isPlaying,
    currentTime,
    duration,
    play,
    pause,
    toggle,
    seek,
    isCurrent,
    isTrackPlaying,
  };
};

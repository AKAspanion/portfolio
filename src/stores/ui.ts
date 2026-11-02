import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface CursorState {
  hovered: boolean;
  tooltip: string;
  /** Image shown inside the cursor tooltip. */
  link: string;
}

export const useUiStore = defineStore('ui', () => {
  const cursor = ref<CursorState>({ hovered: false, tooltip: '', link: '' });
  /** True once the intro animation is over and the page chrome is shown. */
  const loaded = ref(false);
  const navMenu = ref(false);
  const scrollPos = ref(0);

  function showCursor(tooltip = '', link = '') {
    cursor.value = { hovered: true, tooltip, link };
  }

  function hideCursor() {
    cursor.value = { hovered: false, tooltip: '', link: '' };
  }

  return { cursor, loaded, navMenu, scrollPos, showCursor, hideCursor };
});

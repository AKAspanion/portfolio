<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useTheme } from 'vuetify';

import { useCursor } from '@/composables/useCursor';
import { useMagnet } from '@/composables/useMagnet';
import { useUiStore } from '@/stores/ui';

withDefaults(defineProps<{ top?: number; right?: number }>(), {
  top: 30,
  right: 30,
});

const { t } = useI18n();
const theme = useTheme();
const { navMenu } = storeToRefs(useUiStore());
const { showCursor, hideCursor } = useCursor();
const { iconHover } = useMagnet();

const container = ref<HTMLElement>();
const inner = ref<HTMLElement>();

// Ignore clicks while the menu is still sliding.
let animating = false;
function toggle() {
  if (animating) return;
  animating = true;
  navMenu.value = !navMenu.value;
  setTimeout(() => (animating = false), 1000);
}
</script>

<template>
  <button
    id="menu-toggle"
    ref="container"
    type="button"
    class="ham-burger-container"
    :style="{ top: `${top}px`, right: `${right}px` }"
    :aria-label="navMenu ? t('a11y.close-menu') : t('a11y.open-menu')"
    :aria-expanded="navMenu"
    aria-controls="nav-menu"
    @mousemove="iconHover($event, container, inner)"
    @mouseover="showCursor()"
    @mouseout="
      iconHover($event, container, inner);
      hideCursor();
    "
    @click="toggle"
  >
    <span
      ref="inner"
      class="ham-burger"
      :class="{ 'ham-burger--alive': navMenu }"
    >
      <span
        v-for="n in 3"
        :key="n"
        class="ham"
        :style="{
          background: theme.current.value.dark ? '#e0e0e0' : '#212121',
        }"
        :class="navMenu ? `ham--alive ham-alive-${n}` : `ham-${n}`"
      />
    </span>
  </button>
</template>

<style>
.ham-burger-container {
  width: 80px;
  height: 80px;
  z-index: 100;
  margin: 0 auto;
  position: fixed;
  cursor: pointer;
  will-change: transform;
  transition:
    transform 150ms ease-out,
    right 450ms ease;
  transform: translate3d(0px, 0px, 0px);
}

.ham-burger {
  display: block;
  padding: 30px 25px;
  transition: 250ms;
}

.ham-burger:hover .ham-1 {
  transform: translate3d(5px, 0px, 0px);
}

.ham-burger:hover .ham-3 {
  transform: translate3d(-5px, 0px, 0px);
}

.ham-burger--alive:hover .ham-alive-1 {
  width: 0;
  transform: rotate(-45deg) skewX(45deg) translate3d(-14px, 8px, 0px);
}

.ham-burger--alive:hover .ham-alive-3 {
  width: 0;
  transform: rotate(-45deg) skewX(45deg) translate3d(14px, 13px, 0px);
}

.ham {
  display: block;
  width: 29px;
  height: 4px;
  transition: 250ms;
  margin-bottom: 4px;
}

.ham:nth-child(3) {
  margin-bottom: 0px;
}

.ham-alive-1 {
  transform: rotate(-45deg) skewX(45deg) translate3d(0.5px, -2.5px, 0px);
}

.ham-alive-2 {
  transform: rotate(180deg) skewX(-45deg);
}

.ham-alive-3 {
  transform: rotate(-45deg) skewX(45deg) translate3d(-0.5px, 2.5px, 0px);
}
</style>

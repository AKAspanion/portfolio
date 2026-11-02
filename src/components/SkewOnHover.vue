<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ classes?: string; noZoom?: boolean }>();

const outer = ref<HTMLElement>();
const inner = ref<HTMLElement>();

// Updating on every mousemove is janky; every 10th event is plenty.
const REFRESH_RATE = 10;
let counter = 0;

/** Tilts the card in 3D towards the pointer. */
function tilt(e: MouseEvent) {
  if (!outer.value || !inner.value) return;
  const originX =
    outer.value.offsetLeft + Math.floor(outer.value.offsetWidth / 2);
  const originY =
    outer.value.offsetTop + Math.floor(outer.value.offsetHeight / 2);
  const { top, left } = inner.value.getBoundingClientRect();
  const x = e.clientX - left - originX;
  const y = (e.clientY - top - originY) * -1;
  const rotateX = y / inner.value.offsetHeight / 2;
  const rotateY = x / inner.value.offsetWidth / 2;
  inner.value.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

function onMove(e: MouseEvent) {
  if (counter++ % REFRESH_RATE === 0) tilt(e);
}

function reset() {
  if (inner.value) inner.value.style.transform = '';
}
</script>

<template>
  <div
    ref="outer"
    class="perspective-outer"
    :class="{ 'perspective-zoom': !noZoom }"
    @mouseenter="tilt"
    @mousemove="onMove"
    @mouseleave="reset"
  >
    <div ref="inner" :class="classes" class="perspective-inner">
      <slot />
    </div>
  </div>
</template>

<style>
.perspective-outer {
  perspective: 24px;
  transition: transform 0.5s;
}

.perspective-inner {
  transition: transform 0.5s;
}

.perspective-zoom:hover {
  transform: scale(1.15);
  transform-origin: center center;
}
</style>

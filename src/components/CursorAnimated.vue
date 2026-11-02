<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useDisplay, useTheme } from 'vuetify';

import { useUiStore } from '@/stores/ui';

const { cursor } = storeToRefs(useUiStore());
const { smAndUp } = useDisplay();
const theme = useTheme();

// Only devices with a precise pointer get the custom cursor.
const finePointer = window.matchMedia?.('(pointer: fine)').matches ?? true;
const enabled = computed(() => finePointer && smAndUp.value);
const hasTooltip = computed(
  () => !!cursor.value.tooltip || !!cursor.value.link,
);

const ring = ref<HTMLElement>();
const tooltip = ref<HTMLElement>();

function follow(e: MouseEvent) {
  const transform = `translate3d(${e.pageX}px, ${e.pageY}px, 0px)`;
  if (ring.value) ring.value.style.transform = transform;
  if (tooltip.value) tooltip.value.style.transform = transform;
}

onMounted(() =>
  document.addEventListener('mousemove', follow, { passive: true }),
);
onBeforeUnmount(() => document.removeEventListener('mousemove', follow));
</script>

<template>
  <div v-if="enabled" aria-hidden="true">
    <div
      ref="ring"
      class="cursor-animated"
      :class="
        cursor.hovered ? 'cursor-animated--large' : 'cursor-animated--small'
      "
    />
    <div
      ref="tooltip"
      class="cursor-tooltip"
      :class="[
        hasTooltip ? '' : 'cursor-tooltip--hidden',
        theme.current.value.dark
          ? 'cursor-tooltip--dark'
          : 'cursor-tooltip--white',
        cursor.link ? 'cursor-tooltip--photo' : '',
      ]"
    >
      <img
        v-if="cursor.link"
        :src="cursor.link"
        alt=""
        width="360"
        height="203"
        class="cursor-photo"
      />
      <div class="text-center" :class="{ 'pt-8': cursor.link }">
        {{ cursor.tooltip }}
      </div>
    </div>
  </div>
</template>

<style>
.cursor-animated,
.cursor-tooltip {
  z-index: 200;
  position: absolute;
  pointer-events: none;
}

.cursor-animated {
  border-radius: 50%;
  border: 2px solid white;
  mix-blend-mode: difference;
  transform: translate3d(-100px, -100px, 0px);
  will-change: transform, width, height;
  transition: all 300ms ease-out;
}

.cursor-animated--small {
  top: -12px;
  left: -12px;
  width: 24px;
  height: 24px;
}

.cursor-animated--large {
  top: -28px;
  left: -28px;
  width: 56px;
  height: 56px;
  background: white;
}

.cursor-tooltip {
  top: 28px;
  left: 28px;
  padding: 16px;
  overflow: hidden;
  transform: translate3d(-100px, -100px, 0px);
  transition: all 300ms ease-out;
  box-shadow:
    0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.cursor-tooltip--photo {
  padding: 32px;
}

.cursor-tooltip--dark {
  background: #e0e0e0;
  color: #212121;
}

.cursor-tooltip--white {
  background: #212121;
  color: #e0e0e0;
}

.cursor-tooltip--hidden {
  width: 0px;
  height: 0px;
  padding: 0px;
  opacity: 0;
}

.cursor-photo {
  display: block;
  object-fit: cover;
  transition: all 300ms ease-out;
}
</style>

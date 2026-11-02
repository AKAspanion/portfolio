<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useTheme } from 'vuetify';

import { useUiStore } from '@/stores/ui';

const props = withDefaults(defineProps<{ delay?: number }>(), { delay: 100 });

const { navMenu } = storeToRefs(useUiStore());
const theme = useTheme();

const root = ref<HTMLElement>();
const showText = ref(false);
const maskClass = ref('mask--enter');

const timers: number[] = [];
const later = (fn: () => void, ms: number) =>
  timers.push(window.setTimeout(fn, ms));

// A block wipes across the text, reveals it, and moves on.
function reveal() {
  if (showText.value) return;
  later(() => (maskClass.value = 'mask--show'), props.delay);
  later(() => (showText.value = true), props.delay + 600);
  later(() => (maskClass.value = 'mask--leave'), props.delay + 700);
}

// Cover the text while the menu slides over the page.
watch(navMenu, (open) => {
  if (open) maskClass.value = 'mask--leave mask--show';
  else later(() => (maskClass.value = 'mask--leave'), 400);
});

let observer: IntersectionObserver | undefined;

onMounted(() => {
  if (!root.value) return;
  observer = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) {
      reveal();
      observer?.disconnect();
    }
  });
  observer.observe(root.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  timers.forEach(clearTimeout);
});
</script>

<template>
  <span
    ref="root"
    class="mask--text d-inline-block"
    :class="[
      theme.current.value.dark ? 'dark--mask' : 'white--mask',
      maskClass,
    ]"
  >
    <span :style="{ opacity: showText ? 1 : 0 }">
      <slot />
    </span>
  </span>
</template>

<style scoped>
.mask--text {
  position: relative;
  will-change: transform;
  transform-origin: bottom;
}

.mask--text::before {
  top: 0;
  content: '';
  height: 100%;
  position: absolute;
  transition: width 500ms cubic-bezier(1, 0, 0, 1);
}

.mask--text.mask--enter::before {
  width: 0%;
}

.mask--text.mask--leave::before {
  width: 0%;
  left: 100%;
  transform: translate3d(-100%, 0, 0);
}

.mask--text.mask--show::before {
  width: 100%;
}

.mask--text.dark--mask::before {
  background: #e0e0e0;
}

.mask--text.white--mask::before {
  background: #212121;
}
</style>

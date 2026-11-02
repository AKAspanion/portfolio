<script setup lang="ts">
import { ref, type ComponentPublicInstance } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useGoTo, useTheme } from 'vuetify';

import { useCursor } from '@/composables/useCursor';
import { useMagnet } from '@/composables/useMagnet';

withDefaults(defineProps<{ top?: number; left?: number }>(), {
  top: 30,
  left: 30,
});

const { t } = useI18n();
const theme = useTheme();
const route = useRoute();
const goTo = useGoTo();
const { showCursor, hideCursor } = useCursor();
const { iconHover } = useMagnet();

const container = ref<ComponentPublicInstance>();
const inner = ref<HTMLElement>();

// On the home page the logo scrolls back to the top instead of navigating.
function onClick(e: MouseEvent) {
  if (route.path === '/') {
    e.preventDefault();
    void goTo(0);
  }
}
</script>

<template>
  <router-link
    ref="container"
    to="/"
    class="logo-container"
    :aria-label="t('a11y.back-to-top')"
    :style="{ top: `${top}px`, left: `${left}px` }"
    @mousemove="
      iconHover($event, container?.$el as HTMLElement | undefined, inner)
    "
    @mouseout="
      iconHover($event, container?.$el as HTMLElement | undefined, inner);
      hideCursor();
    "
    @mouseover="showCursor()"
    @click="onClick"
  >
    <span ref="inner" class="logo-wrapper">
      <span
        v-for="n in 3"
        :key="n"
        class="logo-bar"
        :class="`logo-bar-${n}`"
        :style="{
          background: theme.current.value.dark ? '#e0e0e0' : '#212121',
        }"
      />
    </span>
  </router-link>
</template>

<style scoped>
.logo-container {
  display: block;
  width: 80px;
  height: 80px;
  z-index: 50;
  margin: 0 auto;
  position: fixed;
  cursor: pointer;
  will-change: transform;
  transition:
    transform 150ms ease-out,
    left 450ms ease;
  transform: translate3d(0px, 0px, 0px);
}

.logo-wrapper {
  display: block;
  padding: 30px 25px;
  transition: 250ms;
}

.logo-bar {
  display: block;
  width: 29px;
  height: 4px;
  transition: 250ms;
  margin-bottom: 4px;
}

.logo-bar-1 {
  transform: rotate(-45deg) skewX(45deg) translate3d(0.5px, -2.5px, 0px);
}

.logo-bar-2 {
  transform: rotate(180deg) skewX(-45deg);
}

.logo-bar-3 {
  transform: rotate(-45deg) skewX(45deg) translate3d(-0.5px, 2.5px, 0px);
}
</style>

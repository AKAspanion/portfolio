<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useGoTo, useTheme } from 'vuetify';

import { useCursor } from '@/composables/useCursor';
import { useMagnet } from '@/composables/useMagnet';
import { icons } from '@/icons';
import { useUiStore } from '@/stores/ui';

withDefaults(defineProps<{ bottom?: number; right?: number }>(), {
  bottom: 24,
  right: 24,
});

const { t } = useI18n();
const theme = useTheme();
const goTo = useGoTo();
const ui = useUiStore();
const { navMenu } = storeToRefs(ui);
const { showCursor, hideCursor } = useCursor();
const { iconHover } = useMagnet();

const container = ref<HTMLElement>();
const inner = ref<HTMLElement>();
const percentage = ref(0);
const goesUp = computed(() => percentage.value > 10);
const color = computed(() =>
  theme.current.value.dark ? '#e0e0e0' : '#212121',
);

function onClick() {
  hideCursor();
  void goTo(goesUp.value ? 0 : 200);
}

function onScroll() {
  const top = Math.floor(window.scrollY);
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  ui.scrollPos = top;
  percentage.value =
    scrollable > 0 ? Math.min(100, Math.floor((top / scrollable) * 100)) : 0;
}

onMounted(() => {
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
});
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll));
</script>

<template>
  <div
    v-if="!navMenu"
    ref="container"
    class="scroll-arrow-container"
    :style="{ bottom: `${bottom}px`, right: `${right}px` }"
    @mouseout="
      iconHover($event, container, inner);
      hideCursor();
    "
    @mousemove="iconHover($event, container, inner)"
    @mouseover="showCursor(goesUp ? t('go-up') : t('scroll'))"
  >
    <div ref="inner" class="scroll-arrow-wrapper">
      <v-progress-circular
        size="40"
        width="2"
        aria-hidden="true"
        :color="color"
        :model-value="percentage >= 95 ? 100 : percentage"
      />
      <v-btn
        icon
        variant="text"
        size="small"
        :color="color"
        :aria-label="goesUp ? t('a11y.back-to-top') : t('a11y.scroll-down')"
        @click="onClick"
      >
        <v-icon
          :icon="icons.arrowBottomLeft"
          :style="{ transform: `rotate(${goesUp ? 135 : -45}deg)` }"
        />
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.scroll-arrow-container {
  width: 80px;
  height: 80px;
  z-index: 50;
  margin: 0 auto;
  position: fixed;
  cursor: pointer;
  will-change: transform;
  transition:
    transform 150ms ease-out,
    right 450ms ease;
  transform: translate3d(0px, 0px, 0px);
}

.scroll-arrow-wrapper {
  position: relative;
  padding: 20px;
  transition: 250ms;
}

.scroll-arrow-wrapper .v-btn {
  position: absolute;
  top: 20px;
  left: 20px;
}
</style>

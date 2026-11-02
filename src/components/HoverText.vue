<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useTheme } from 'vuetify';

import { useCursor } from '@/composables/useCursor';
import { useMagnet } from '@/composables/useMagnet';

const props = defineProps<{
  /** Cursor tooltip. */
  text?: string;
  /** Image shown in the cursor tooltip. */
  link?: string;
  /** Makes the text a link; external links open in a new tab. */
  href?: string;
  classes?: string;
}>();

defineEmits<{ click: [event: MouseEvent] }>();

const { t } = useI18n();
const theme = useTheme();
const { showCursor, hideCursor } = useCursor();
const { textHover } = useMagnet();

const external = computed(() => !!props.href && /^https?:/.test(props.href));
/** Side the underline grows from, following where the pointer entered. */
const side = ref<'left' | 'right'>('left');

function onEdge(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement;
  const { left, top, width, height } = el.getBoundingClientRect();
  const x = e.clientX - left;
  const y = e.clientY - top;
  const dist = (x2: number, y2: number) => (x - x2) ** 2 + (y - y2) ** 2;
  const edges = {
    left: dist(0, height / 2),
    right: dist(width, height / 2),
    top: dist(width / 2, 0),
    bottom: dist(width / 2, height),
  };
  const closest = (Object.keys(edges) as (keyof typeof edges)[]).reduce(
    (a, b) => (edges[a] <= edges[b] ? a : b),
  );
  side.value = closest === 'left' || closest === 'top' ? 'left' : 'right';
}
</script>

<template>
  <component
    :is="href ? 'a' : 'span'"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    class="hover--text d-inline-block"
    :class="[
      classes,
      `${side}--hover`,
      theme.current.value.dark ? 'dark--hover' : 'white--hover',
    ]"
    @mousemove="textHover($event)"
    @mouseover="
      onEdge($event);
      showCursor(text, link);
    "
    @mouseout="
      onEdge($event);
      hideCursor();
      textHover($event, true);
    "
    @click="$emit('click', $event)"
  >
    <slot />
    <span v-if="external" class="visually-hidden">
      ({{ t('a11y.new-tab') }})</span
    >
  </component>
</template>

<style scoped>
.hover--text {
  position: relative;
}

.hover--text::before {
  top: 0;
  width: 0%;
  content: '';
  height: 50%;
  position: absolute;
  transition: width 600ms cubic-bezier(1, 0, 0, 1);
}

.hover--text.right--hover::before {
  left: 100%;
  transform: translate3d(-100%, 0, 0);
}

.hover--text.dark--hover::before {
  background: #e0e0e0;
}

.hover--text.white--hover::before {
  background: #212121;
}

.hover--text:hover::before,
.hover--text:focus-visible::before {
  width: 100%;
}
</style>

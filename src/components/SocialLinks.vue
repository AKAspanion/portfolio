<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useTheme } from 'vuetify';

import { useCursor } from '@/composables/useCursor';
import { useMagnet } from '@/composables/useMagnet';
import { useContent } from '@/content';
import { icons, socialBrand } from '@/icons';

withDefaults(defineProps<{ bottom?: number; left?: number }>(), {
  bottom: 24,
  left: 24,
});

const { t } = useI18n();
const theme = useTheme();
const content = useContent();
const { showCursor, hideCursor } = useCursor();
const { iconHover } = useMagnet();

const hide = ref(true);
const color = computed(() =>
  theme.current.value.dark ? '#e0e0e0' : '#212121',
);

// Each link leans towards the pointer on its own; refs keyed by link name.
const containers = ref<Record<string, HTMLElement | null>>({});
const inners = ref<Record<string, HTMLElement | null>>({});
const toggle = ref<HTMLElement>();
const toggleInner = ref<HTMLElement>();
</script>

<template>
  <div
    class="social-links-wrapper text-center"
    :style="{ bottom: `${bottom}px`, left: `${left}px` }"
  >
    <div class="social-links-content-wrapper">
      <div
        ref="toggle"
        class="speedial-container"
        @mouseover="showCursor(t('links'))"
        @mousemove="iconHover($event, toggle, toggleInner)"
        @mouseout="
          iconHover($event, toggle, toggleInner);
          hideCursor();
        "
      >
        <div ref="toggleInner" class="speedial-wrapper">
          <v-progress-circular
            size="40"
            width="2"
            aria-hidden="true"
            :model-value="hide ? 0 : 100"
            :color="color"
          />
          <v-btn
            icon
            variant="text"
            size="small"
            :color="color"
            :aria-label="t('a11y.social-links')"
            :aria-expanded="!hide"
            aria-controls="social-links"
            @click="hide = !hide"
          >
            <v-icon
              :icon="icons.chevronLeft"
              :style="{ transform: `rotate(${hide ? 45 : 90}deg)` }"
            />
          </v-btn>
        </div>
      </div>
      <ul id="social-links" class="social-links-list" :inert="hide">
        <li
          v-for="(link, i) in content.social"
          :key="link.id"
          :ref="(el) => (containers[link.name] = el as HTMLElement | null)"
          class="link-logo-container"
          :class="{ 'hide-icon': hide }"
          :style="{
            top: `${-82 * (content.social.length - i)}px`,
            transitionDelay: `${50 * (content.social.length - 1 - i)}ms`,
          }"
          @mouseover="showCursor()"
          @mousemove="
            iconHover($event, containers[link.name], inners[link.name])
          "
          @mouseout="
            iconHover($event, containers[link.name], inners[link.name]);
            hideCursor();
          "
        >
          <a
            :ref="(el) => (inners[link.name] = el as HTMLElement | null)"
            class="link-logo-wrapper"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`${link.name} (${t('a11y.new-tab')})`"
          >
            <v-icon :icon="socialBrand(link.url)?.icon" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.social-links-wrapper {
  width: 80px;
  z-index: 50;
  margin: 0 auto;
  position: fixed;
  will-change: transform;
  transition:
    transform 150ms ease-out,
    left 450ms ease;
  transform: translate3d(0px, 0px, 0px);
}

.social-links-content-wrapper {
  position: relative;
}

.social-links-list {
  list-style: none;
}

.speedial-container,
.link-logo-container {
  width: 80px;
  height: 80px;
  cursor: pointer;
  margin-bottom: 2px;
}

.speedial-wrapper {
  position: relative;
  padding: 20px;
  transition: 250ms;
}

.speedial-wrapper .v-btn {
  position: absolute;
  top: 20px;
  left: 20px;
}

.link-logo-container {
  position: absolute;
  left: 0px;
  transition: 250ms;
}

.link-logo-wrapper {
  display: block;
  padding: 28px;
  transition: 250ms;
}

.hide-icon {
  opacity: 0;
  left: -100%;
  pointer-events: none;
}
</style>

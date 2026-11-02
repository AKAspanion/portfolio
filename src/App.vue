<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useDisplay, useTheme } from 'vuetify';

import CursorAnimated from '@/components/CursorAnimated.vue';
import MenuHamburger from '@/components/MenuHamburger.vue';
import ScrollProgress from '@/components/ScrollProgress.vue';
import SocialLinks from '@/components/SocialLinks.vue';
import SpanionLogo from '@/components/SpanionLogo.vue';
import NavMenu from '@/views/NavMenu.vue';
import { useUiStore } from '@/stores/ui';

const ui = useUiStore();
const { loaded, navMenu, scrollPos } = storeToRefs(ui);
const { xs } = useDisplay();
const theme = useTheme();

/** Distance of the fixed controls from the window edges. */
const inset = computed(() =>
  xs.value ? { top: 0, side: 12 } : { top: 40, side: 40 },
);
/** Controls slide in from off-screen once the intro is over. */
const side = computed(() => (loaded.value ? inset.value.side : -80));

// On phones the controls sit on a bar that takes the colour of the section
// scrolled underneath it.
const SECTIONS = ['projects', 'skills', 'experience', 'contact'];
const BAR_HEIGHT = 80;
const barColor = ref('');

watch(
  [scrollPos, xs, () => theme.current.value.dark],
  ([pos, isXs, dark]) => {
    if (!isXs) return;
    const fallback = dark ? '#212121' : '#e0e0e0';
    const under = SECTIONS.map((id) => document.getElementById(id))
      .filter(
        (el): el is HTMLElement => !!el && el.offsetTop < pos + BAR_HEIGHT,
      )
      .at(-1);
    barColor.value = under ? getComputedStyle(under).backgroundColor : fallback;
  },
  // Read colours after the DOM has the new theme classes.
  { immediate: true, flush: 'post' },
);
</script>

<template>
  <v-app :class="{ 'disable-cursor': !loaded }">
    <NavMenu />
    <CursorAnimated />
    <MenuHamburger :top="inset.top" :right="side" />
    <!-- Everything behind the open menu is taken out of focus order. -->
    <div class="app-content" :inert="navMenu">
      <v-fade-transition>
        <div
          v-show="xs && scrollPos > 1"
          class="nav-shadow"
          :style="{ background: barColor }"
        />
      </v-fade-transition>
      <SpanionLogo :top="inset.top" :left="side" />
      <ScrollProgress :bottom="inset.top" :right="side" />
      <SocialLinks v-if="!xs" :bottom="inset.top" :left="side" />
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </v-app>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: transform 0.9s cubic-bezier(1, 0, 0, 1);
}

.page-enter-from,
.page-leave-to {
  transform: translateX(100vw);
}

.nav-shadow {
  top: 0;
  width: 100vw;
  height: 80px;
  z-index: 48;
  position: fixed;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>

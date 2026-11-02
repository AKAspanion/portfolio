<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useTheme } from 'vuetify';

import { useUiStore } from '@/stores/ui';

const { t } = useI18n();
const theme = useTheme();
const ui = useUiStore();

// Firebase serves index.html with a 200 for every path, so tell crawlers
// this is not a real page and keep it out of the index (and out of ads).
const robots = document.createElement('meta');
robots.name = 'robots';
robots.content = 'noindex';

// A canonical link pointing at the home page would contradict noindex.
const canonical = document.head.querySelector('link[rel="canonical"]');

onMounted(() => {
  document.head.appendChild(robots);
  canonical?.remove();
  ui.loaded = true;
});

onBeforeUnmount(() => {
  robots.remove();
  if (canonical) document.head.appendChild(canonical);
});
</script>

<template>
  <main
    class="not-found-container"
    :style="
      theme.current.value.dark
        ? { background: '#212121', color: '#e0e0e0' }
        : { background: '#e0e0e0', color: '#212121' }
    "
  >
    <h1 class="not-found-text">404</h1>
    <p class="type-title font-weight-light pt-4">{{ t('not-found.title') }}</p>
    <router-link
      to="/"
      class="not-found-link type-title font-weight-light pt-8"
    >
      &larr; {{ t('not-found.back') }}
    </router-link>
  </main>
</template>

<style scoped>
.not-found-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 32px;
}

.not-found-text {
  font-size: max(16vw, 96px);
  line-height: 1;
  font-weight: 100;
  font-family: Roboto, sans-serif;
}
</style>

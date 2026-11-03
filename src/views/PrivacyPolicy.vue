<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, watchEffect } from 'vue';
import { I18nT, useI18n } from 'vue-i18n';
import { useTheme } from 'vuetify';

import { CONTACT_EMAIL } from '@/content';
import { useUiStore } from '@/stores/ui';

const CANONICAL_URL = 'https://spanion.in/privacy';
/** When the policy last changed: update it with every edit to the text. */
const UPDATED = '2026-11-03';
const GOOGLE_PARTNER_SITES =
  'https://policies.google.com/technologies/partner-sites';
const GOOGLE_AD_SETTINGS = 'https://myadcenter.google.com/';

const sections = [
  'who',
  'stored',
  'ads',
  'fonts',
  'hosting',
  'rights',
  'changes',
] as const;

const googleLinks = [
  { key: 'google-partner-sites', href: GOOGLE_PARTNER_SITES },
  { key: 'google-ad-settings', href: GOOGLE_AD_SETTINGS },
] as const;

const { t, locale } = useI18n();
const theme = useTheme();
const ui = useUiStore();

const updated = computed(() =>
  new Intl.DateTimeFormat(locale.value, {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(UPDATED)),
);

// Firebase serves index.html for every path, so its canonical link names the
// home page. While this page is shown, the link names this page instead.
const previousTitle = document.title;
const canonical = document.head.querySelector('link[rel="canonical"]');
const previousHref = canonical?.getAttribute('href') ?? null;
let addedCanonical: HTMLLinkElement | undefined;

watchEffect(() => {
  document.title = t('privacy.page-title');
});

onMounted(() => {
  if (canonical) {
    canonical.setAttribute('href', CANONICAL_URL);
  } else {
    addedCanonical = document.createElement('link');
    addedCanonical.rel = 'canonical';
    addedCanonical.href = CANONICAL_URL;
    document.head.appendChild(addedCanonical);
  }
  ui.loaded = true;
});

onBeforeUnmount(() => {
  document.title = previousTitle;
  if (canonical && previousHref !== null) {
    canonical.setAttribute('href', previousHref);
  }
  addedCanonical?.remove();
});
</script>

<template>
  <main
    class="privacy-container"
    :style="
      theme.current.value.dark
        ? { background: '#212121', color: '#e0e0e0' }
        : { background: '#e0e0e0', color: '#212121' }
    "
  >
    <article class="privacy-article">
      <h1 class="type-display-1 font-weight-light">
        {{ t('privacy.title') }}
      </h1>
      <p class="privacy-updated type-subtitle">
        {{ t('privacy.updated', { date: updated }) }}
      </p>

      <section
        v-for="id in sections"
        :key="id"
        :aria-labelledby="`privacy-${id}`"
        class="privacy-section"
      >
        <h2 :id="`privacy-${id}`" class="type-headline font-weight-light">
          {{ t(`privacy.sections.${id}.title`) }}
        </h2>
        <I18nT
          v-if="id === 'who'"
          keypath="privacy.sections.who.body"
          tag="p"
          class="type-subtitle"
        >
          <template #email>
            <a class="privacy-link" :href="`mailto:${CONTACT_EMAIL}`">{{
              CONTACT_EMAIL
            }}</a>
          </template>
        </I18nT>
        <p v-else-if="id === 'rights'" class="type-subtitle">
          {{ t('privacy.sections.rights.body', { email: CONTACT_EMAIL }) }}
        </p>
        <p v-else class="type-subtitle">
          {{ t(`privacy.sections.${id}.body`) }}
        </p>
        <ul v-if="id === 'ads'" class="privacy-links type-subtitle">
          <li v-for="link in googleLinks" :key="link.key">
            <a
              class="privacy-link"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              >{{ t(`privacy.links.${link.key}`)
              }}<span class="visually-hidden">
                ({{ t('a11y.new-tab') }})</span
              ></a
            >
          </li>
        </ul>
      </section>

      <router-link
        to="/"
        class="privacy-link privacy-back type-title font-weight-light"
      >
        &larr; {{ t('privacy.back') }}
      </router-link>
    </article>
  </main>
</template>

<style scoped>
.privacy-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 120px 24px 64px;
}

.privacy-article {
  width: 100%;
  max-width: 760px;
}

.privacy-updated {
  opacity: 0.7;
  margin-top: 8px;
}

.privacy-section {
  margin-top: 40px;
}

.privacy-section p,
.privacy-links {
  margin-top: 12px;
}

.privacy-links {
  padding-left: 24px;
}

.privacy-link {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.privacy-back {
  display: inline-block;
  margin-top: 56px;
}
</style>

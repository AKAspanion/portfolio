<script setup lang="ts">
import { storeToRefs } from 'pinia';
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useDisplay, useGoTo, useTheme } from 'vuetify';

import HoverText from '@/components/HoverText.vue';
import { useCursor } from '@/composables/useCursor';
import { useContent } from '@/content';
import { icons } from '@/icons';
import { locales, type Locale } from '@/plugins/i18n';
import { useUiStore } from '@/stores/ui';
import { saveLocale, saveTheme } from '@/util/preferences';
import { findSection, focusSection } from '@/util/sections';

const { t, locale } = useI18n();
const theme = useTheme();
const route = useRoute();
const router = useRouter();
const goTo = useGoTo();
const { xs } = useDisplay();
const { navMenu } = storeToRefs(useUiStore());
const { hideCursor } = useCursor();
const content = useContent();

const hostName = window.location.hostname;
const year = new Date().getFullYear();

const themeName = computed({
  get: () => (theme.current.value.dark ? 'dark' : 'light'),
  set: (name: 'light' | 'dark') => {
    void theme.change(name);
    saveTheme(name);
  },
});

const language = computed({
  get: () => locale.value as Locale,
  set: (value: Locale) => {
    locale.value = value;
    saveLocale(value);
  },
});

/**
 * Items rise into place one after another once the menu has slid in, and
 * drop away quickly when it closes.
 */
function delay(index: number, base = 800) {
  return {
    transitionDelay: navMenu.value
      ? `${base + 120 * index}ms`
      : `${60 * index}ms`,
  };
}

function navigateTo(e: MouseEvent, domId: string) {
  e.preventDefault();
  hideCursor();
  navMenu.value = false;

  // From another page, the home page scrolls to the hash once it is shown.
  if (route.path !== '/') {
    void router.push({ path: '/', hash: `#${domId}` });
    return;
  }
  const section = findSection(domId);
  if (!section) return;
  void goTo(section);
  focusSection(section);
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && navMenu.value) {
    navMenu.value = false;
    document.getElementById('menu-toggle')?.focus();
  }
}

// Move keyboard focus into the menu when it opens; the page behind is inert.
const menu = ref<HTMLElement>();
watch(navMenu, async (open) => {
  if (!open) return;
  await nextTick();
  menu.value
    ?.querySelector<HTMLElement>('.nav-item')
    ?.focus({ preventScroll: true });
});

onMounted(() => document.addEventListener('keydown', onKeydown));
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown));
</script>

<template>
  <div
    id="nav-menu"
    ref="menu"
    class="nav-menu-container d-flex flex-column"
    :class="{ 'nav-menu-container--active': navMenu }"
    :style="{ background: theme.current.value.dark ? '#000000' : '#FFFFFF' }"
    :inert="!navMenu"
    :aria-hidden="!navMenu"
  >
    <div class="mb-auto">
      <v-row density="compact">
        <v-col cols="12" md="2">
          <div
            :class="xs ? 'my-3' : 'my-8'"
            class="name-item-container type-overline font-weight-medium"
          >
            <div class="name-item-wrapper slide-small" :style="delay(0)">
              {{ hostName }}
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="10">
          <nav class="nav-container" :aria-label="t('a11y.main-nav')">
            <ul>
              <li
                v-for="(item, i) in content.nav"
                :key="item.id"
                :class="xs ? 'type-display-2' : 'type-display-3'"
                class="nav-item-container font-weight-thin my-4"
              >
                <div class="nav-item-wrapper slide-large" :style="delay(i)">
                  <HoverText
                    classes="nav-item"
                    :text="item.tooltip"
                    :href="`#${item.domId}`"
                    @click="navigateTo($event, item.domId)"
                  >
                    {{ item.name }}
                  </HoverText>
                </div>
              </li>
            </ul>
          </nav>
        </v-col>
      </v-row>
    </div>
    <div class="mt-auto">
      <v-row density="compact" class="align-center">
        <v-col cols="12" md="2" class="theme-item-container">
          <div
            class="theme-item-wrapper slide-large d-flex align-center"
            :style="delay(0, 1600)"
          >
            <v-btn-toggle
              v-model="themeName"
              mandatory
              rounded="0"
              class="my-4"
              :aria-label="t('a11y.theme')"
            >
              <v-btn
                value="light"
                size="x-small"
                variant="text"
                :aria-label="t('a11y.light')"
              >
                <v-icon size="x-small" :icon="icons.sun" />
              </v-btn>
              <v-btn
                value="dark"
                size="x-small"
                variant="text"
                :aria-label="t('a11y.dark')"
              >
                <v-icon
                  size="x-small"
                  :icon="icons.moon"
                  style="transform: rotate(-45deg)"
                />
              </v-btn>
            </v-btn-toggle>
            <v-btn-toggle
              v-model="language"
              mandatory
              rounded="0"
              class="my-4 ml-4"
              :aria-label="t('a11y.language')"
            >
              <v-btn
                v-for="code in locales"
                :key="code"
                :value="code"
                size="x-small"
                variant="text"
              >
                {{ code.toUpperCase() }}
              </v-btn>
            </v-btn-toggle>
          </div>
        </v-col>
        <v-col cols="12" md="7">
          <ul class="d-flex flex-wrap align-center">
            <li
              v-for="(link, i) in content.social"
              :key="link.id"
              :class="xs ? 'mb-3 pr-4' : 'my-8 pr-8'"
              class="type-overline font-weight-medium link-item-container"
            >
              <div class="link-item-wrapper slide-small" :style="delay(i)">
                <HoverText classes="link-item" :href="link.url">{{
                  link.name
                }}</HoverText>
              </div>
            </li>
          </ul>
        </v-col>
        <v-col cols="12" md="3">
          <div
            :class="{ 'mb-4': xs }"
            class="type-overline font-weight-medium text-sm-right copy-item-wrapper slide-large"
            :style="delay(0, 1600)"
          >
            {{ t('copyright', { year }) }}
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<style>
.nav-menu-container {
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  transition: transform 1s cubic-bezier(1, 0, 0, 1);
  transform: translate3d(100vw, 0px, 0px);
  padding: 24px 48px 0px 48px;
  will-change: transform;
  position: fixed;
  z-index: 100;
  right: 0;
  top: 0;
}

.nav-menu-container--active {
  transform: translate3d(0px, 0px, 0px);
}

.nav-menu-container ul {
  list-style: none;
}

.nav-item-container,
.theme-item-container,
.name-item-container,
.link-item-container {
  overflow: hidden;
}

.slide-large,
.slide-small {
  transition: transform 0.5s cubic-bezier(1, 0, 0, 1);
  will-change: transform;
}

.slide-large {
  transform: translate3d(0px, 100px, 0px);
}

.slide-small {
  transform: translate3d(0px, 16px, 0px);
}

.nav-menu-container--active .slide-large,
.nav-menu-container--active .slide-small {
  transform: translate3d(0px, 0px, 0px);
}

.nav-item,
.link-item {
  cursor: pointer;
  will-change: transform;
  transition: transform 150ms ease-out;
}

.nav-container {
  margin-top: 24px;
}

/* Compact toggles, as in the original design. */
.nav-menu-container .v-btn-group {
  height: 20px;
}

.nav-menu-container .v-btn-group .v-btn {
  min-width: 28px;
  padding: 0 6px;
}

@media only screen and (max-width: 600px) {
  .nav-menu-container {
    padding: 16px 24px 4px 24px;
  }

  .nav-container {
    margin-top: 0px;
  }
}
</style>

import { createTestingPinia } from '@pinia/testing';
import { mount, type ComponentMountingOptions } from '@vue/test-utils';
import { vi } from 'vitest';
import type { Component } from 'vue';
import { createI18n } from 'vue-i18n';
import { createMemoryHistory, createRouter } from 'vue-router';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';

import en from '@/assets/i18n/en/lang.json';
import hi from '@/assets/i18n/hi/lang.json';
import { routes } from '@/router';

// jsdom lacks the browser observers the components use.
class NoopObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
vi.stubGlobal('IntersectionObserver', NoopObserver);
vi.stubGlobal('ResizeObserver', NoopObserver);
vi.stubGlobal('matchMedia', (query: string) => ({
  matches: false,
  media: query,
  addEventListener() {},
  removeEventListener() {},
}));

/** Mounts a component with the app's plugins (store state is real). */
export async function mountWithApp<C extends Component>(
  component: C,
  options: ComponentMountingOptions<C> = {},
  path = '/',
) {
  const router = createRouter({ history: createMemoryHistory(), routes });
  await router.push(path);
  await router.isReady();

  const wrapper = mount(component, {
    ...options,
    attachTo: document.body,
    global: {
      plugins: [
        createTestingPinia({ stubActions: false, createSpy: vi.fn }),
        router,
        createVuetify({ icons: { defaultSet: 'mdi', aliases, sets: { mdi } } }),
        createI18n({ legacy: false, locale: 'en', messages: { en, hi } }),
      ],
    },
  });
  return { wrapper, router };
}

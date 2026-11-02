import { describe, expect, it } from 'vitest';

import { useUiStore } from '@/stores/ui';
import { mountWithApp } from '@/test/mount';

import NotFound from '../NotFound.vue';

const robotsMeta = () => document.head.querySelector('meta[name="robots"]');

describe('NotFound', () => {
  it('marks the page noindex, without a canonical link, while it is shown', async () => {
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = 'https://spanion.in/';
    document.head.appendChild(canonical);
    const canonicalLink = () =>
      document.head.querySelector('link[rel="canonical"]');

    const { wrapper } = await mountWithApp(NotFound, {}, '/nope');
    expect(robotsMeta()?.getAttribute('content')).toBe('noindex');
    expect(canonicalLink()).toBeNull();

    wrapper.unmount();
    expect(robotsMeta()).toBeNull();
    expect(canonicalLink()).not.toBeNull();
    canonical.remove();
  });

  it('explains the error, links home and enables the page controls', async () => {
    const { wrapper } = await mountWithApp(NotFound, {}, '/nope');
    expect(wrapper.text()).toContain('404');
    expect(wrapper.text()).toContain("This page doesn't exist.");
    expect(wrapper.find('a[href="/"]').exists()).toBe(true);
    expect(useUiStore().loaded).toBe(true);
    wrapper.unmount();
  });
});

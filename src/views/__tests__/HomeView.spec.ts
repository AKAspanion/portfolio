import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { content } from '@/content';
import { useUiStore } from '@/stores/ui';
import { mountWithApp } from '@/test/mount';

import HomeView from '../HomeView.vue';

const loadAds = vi.hoisted(() => vi.fn());
vi.mock('@/util/ads', () => ({ loadAds, adsLoaded: () => false }));

describe('HomeView', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    vi.useRealTimers();
    loadAds.mockClear();
  });

  it('renders every section with its content straight away', async () => {
    const { wrapper } = await mountWithApp(HomeView);
    for (const id of ['home', 'projects', 'skills', 'experience', 'contact']) {
      expect(wrapper.find(`#${id}`).exists(), id).toBe(true);
    }
    expect(wrapper.findAll('.work-grid__item')).toHaveLength(
      content.en.projects.length,
    );
    expect(wrapper.findAll('.skill-grid__item')).toHaveLength(
      content.en.skills.length,
    );
    expect(wrapper.findAll('.exp-grid__item')).toHaveLength(
      content.en.experience.length,
    );
    wrapper.unmount();
  });

  it('requests ads only after the intro, once content is shown', async () => {
    const { wrapper } = await mountWithApp(HomeView);
    expect(loadAds).not.toHaveBeenCalled();
    expect(useUiStore().loaded).toBe(false);

    await vi.advanceTimersByTimeAsync(1500);

    expect(useUiStore().loaded).toBe(true);
    expect(loadAds).toHaveBeenCalledOnce();
    wrapper.unmount();
  });

  it('opens external links safely in a new tab', async () => {
    const { wrapper } = await mountWithApp(HomeView);
    const external = wrapper.findAll('a[target="_blank"]');
    expect(external.length).toBeGreaterThan(0);
    for (const link of external) {
      expect(link.attributes('rel')).toContain('noopener');
      expect(link.attributes('href')).toMatch(/^https:\/\//);
    }
    wrapper.unmount();
  });

  it('links the contact email', async () => {
    const { wrapper } = await mountWithApp(HomeView);
    const link = wrapper.find('a[href^="mailto:"]');
    expect(link.attributes('href')).toBe('mailto:panditankit1995@gmail.com');
    expect(link.text()).toBe('panditankit1995@gmail.com');
    wrapper.unmount();
  });

  it('shows the current year in the footer', async () => {
    const { wrapper } = await mountWithApp(HomeView);
    expect(wrapper.find('footer').text()).toContain(
      String(new Date().getFullYear()),
    );
    wrapper.unmount();
  });
});

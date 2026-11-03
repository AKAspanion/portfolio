import { afterEach, describe, expect, it, vi } from 'vitest';

import { useUiStore } from '@/stores/ui';
import { mountWithApp } from '@/test/mount';

import PrivacyPolicy from '../PrivacyPolicy.vue';

const loadAds = vi.hoisted(() => vi.fn());
vi.mock('@/util/ads', () => ({ loadAds, adsLoaded: () => false }));

const EMAIL = 'panditankit1995@gmail.com';
const ORIGINAL_TITLE = 'Ankit Kumar Pandit — Software Engineer';
const SECTIONS = [
  'who',
  'stored',
  'ads',
  'fonts',
  'hosting',
  'rights',
  'changes',
];

const canonicalLink = () =>
  document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
const addCanonical = () => {
  const link = document.createElement('link');
  link.rel = 'canonical';
  link.href = 'https://spanion.in/';
  document.head.appendChild(link);
};

afterEach(() => {
  canonicalLink()?.remove();
  document.title = '';
  loadAds.mockClear();
});

describe('PrivacyPolicy', () => {
  it('shows the heading and one heading per section', async () => {
    const { wrapper } = await mountWithApp(PrivacyPolicy, {}, '/privacy');
    expect(wrapper.find('h1').text()).toBe('Privacy policy');
    expect(wrapper.findAll('h2')).toHaveLength(SECTIONS.length);
    for (const h2 of wrapper.findAll('h2')) expect(h2.text()).not.toBe('');
    wrapper.unmount();
  });

  it('links the contact email once and names it in the who section', async () => {
    const { wrapper } = await mountWithApp(PrivacyPolicy, {}, '/privacy');
    expect(wrapper.findAll(`a[href="mailto:${EMAIL}"]`)).toHaveLength(1);
    expect(wrapper.find('section').text()).toContain(EMAIL);
    wrapper.unmount();
  });

  it('points the canonical link at /privacy while shown and restores it', async () => {
    addCanonical();
    const { wrapper } = await mountWithApp(PrivacyPolicy, {}, '/privacy');
    expect(canonicalLink()?.getAttribute('href')).toBe(
      'https://spanion.in/privacy',
    );
    wrapper.unmount();
    expect(canonicalLink()?.getAttribute('href')).toBe('https://spanion.in/');
  });

  it('sets the title while shown and restores it', async () => {
    document.title = ORIGINAL_TITLE;
    const { wrapper } = await mountWithApp(PrivacyPolicy, {}, '/privacy');
    expect(document.title).toBe('Privacy policy — Ankit Kumar Pandit');
    wrapper.unmount();
    expect(document.title).toBe(ORIGINAL_TITLE);
  });

  it('copes with a head that has no canonical link', async () => {
    const { wrapper } = await mountWithApp(PrivacyPolicy, {}, '/privacy');
    expect(() => wrapper.unmount()).not.toThrow();
    expect(canonicalLink()).toBeNull();
  });

  it('is indexable: no robots meta', async () => {
    const { wrapper } = await mountWithApp(PrivacyPolicy, {}, '/privacy');
    expect(document.head.querySelector('meta[name="robots"]')).toBeNull();
    wrapper.unmount();
  });

  it('enables the page controls and requests no ads', async () => {
    const { wrapper } = await mountWithApp(PrivacyPolicy, {}, '/privacy');
    expect(useUiStore().loaded).toBe(true);
    expect(loadAds).not.toHaveBeenCalled();
    wrapper.unmount();
  });

  it('opens external links safely in a new tab, to Google', async () => {
    const { wrapper } = await mountWithApp(PrivacyPolicy, {}, '/privacy');
    const external = wrapper.findAll('a[target="_blank"]');
    expect(external.map((a) => a.attributes('href'))).toEqual([
      'https://policies.google.com/technologies/partner-sites',
      'https://myadcenter.google.com/',
    ]);
    for (const link of external) {
      expect(link.attributes('rel')).toContain('noopener');
      expect(link.attributes('href')).toMatch(/^https:\/\//);
      expect(link.text()).toContain('opens in a new tab');
    }
    wrapper.unmount();
  });

  it('links back to the portfolio', async () => {
    const { wrapper } = await mountWithApp(PrivacyPolicy, {}, '/privacy');
    expect(wrapper.find('a[href="/"]').text()).toContain(
      'Back to the portfolio',
    );
    wrapper.unmount();
  });

  it('shows the last-updated date', async () => {
    const { wrapper } = await mountWithApp(PrivacyPolicy, {}, '/privacy');
    expect(wrapper.text()).toMatch(/Last updated.*2026/);
    wrapper.unmount();
  });
});

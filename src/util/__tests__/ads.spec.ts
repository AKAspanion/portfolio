import { afterEach, describe, expect, it } from 'vitest';

import { createAdsLoader } from '../ads';

const adScripts = () =>
  [...document.head.querySelectorAll('script')].filter((s) =>
    s.src.includes('adsbygoogle'),
  );

describe('createAdsLoader', () => {
  afterEach(() => adScripts().forEach((s) => s.remove()));

  it('injects the AdSense script once, with the client id', () => {
    const { loadAds, adsLoaded } = createAdsLoader({
      client: 'ca-pub-1234567890123456',
      enabled: true,
    });
    expect(adsLoaded()).toBe(false);
    loadAds();
    loadAds();
    expect(adsLoaded()).toBe(true);

    const scripts = adScripts();
    expect(scripts).toHaveLength(1);
    expect(scripts[0]?.src).toContain('client=ca-pub-1234567890123456');
    expect(scripts[0]?.async).toBe(true);
    expect(scripts[0]?.crossOrigin).toBe('anonymous');
  });

  it('does nothing without a client id', () => {
    createAdsLoader({ client: undefined, enabled: true }).loadAds();
    expect(adScripts()).toHaveLength(0);
  });

  it('does nothing when disabled (development builds)', () => {
    createAdsLoader({
      client: 'ca-pub-1234567890123456',
      enabled: false,
    }).loadAds();
    expect(adScripts()).toHaveLength(0);
  });
});

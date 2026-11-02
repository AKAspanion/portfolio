// AdSense is loaded on demand instead of from index.html, so ads only
// appear on screens that have rendered publisher content (see HomeView.vue).
export function createAdsLoader({
  client,
  enabled,
}: {
  client?: string;
  enabled: boolean;
}) {
  let requested = false;

  function loadAds(): void {
    if (requested || !client || !enabled) return;
    requested = true;

    const script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
    document.head.appendChild(script);
  }

  /** Whether the AdSense script was added to this page. */
  const adsLoaded = () => requested;

  return { loadAds, adsLoaded };
}

export const { loadAds, adsLoaded } = createAdsLoader({
  client: import.meta.env.VITE_ADSENSE_CLIENT,
  enabled: import.meta.env.PROD,
});

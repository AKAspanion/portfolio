// AdSense is loaded on demand instead of from index.html, so ads only
// appear on screens that have rendered publisher content (see Home.vue).
const ADSENSE_CLIENT = process.env.VUE_APP_ADSENSE_CLIENT;

let requested = false;

export function loadAds() {
  if (requested || !ADSENSE_CLIENT || process.env.NODE_ENV !== 'production')
    return;
  requested = true;

  const script = document.createElement('script');
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
  document.head.appendChild(script);
}

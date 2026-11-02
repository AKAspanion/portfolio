window.addEventListener('load', () => {
  registerSW();
});

async function registerSW() {
  if (!('serviceWorker' in navigator)) return;
  try {
    await navigator.serviceWorker.register('./sw.js');
  } catch (e) {
    console.warn('ServiceWorker registration failed', e);
  }
}

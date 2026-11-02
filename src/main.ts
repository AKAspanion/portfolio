import { createPinia } from 'pinia';
import { createApp, watchEffect } from 'vue';

import App from './App.vue';
import i18n from './plugins/i18n';
import vuetify from './plugins/vuetify';
import router from './router';
import './styles/main.css';
import { installSmoothScroll } from './util/smoothScroll';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(i18n);

watchEffect(() => {
  document.documentElement.lang = i18n.global.locale.value;
});

installSmoothScroll();

// Mount once the first route is resolved, so the page transition only plays
// on later navigations and not on first load.
// A failed first navigation is handled by router.onError; mount regardless so
// the page never stays blank.
void router
  .isReady()
  .catch((error: unknown) => console.error(error))
  .finally(() => app.mount('#app'));

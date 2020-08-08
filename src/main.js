import Vue from "vue";

import store from "./store.js";
import router from "./router.js";
import vuetify from "./vuetify.js";
import i18n from "./i18n.js";
import "./assets/style.css";

import SmoothScroll from "./util/smoothScroll";
new SmoothScroll(document);

import App from "./App.vue";
import hover from "./mixin/hover";
import cursor from "./mixin/cursor";

Vue.mixin(hover);
Vue.mixin(cursor);

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  vuetify,
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");

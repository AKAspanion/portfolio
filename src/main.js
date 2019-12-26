import Vue from 'vue'

import store from './store.js'
import router from './router.js'
import vuetify from './vuetify.js'
import i18n from './i18n.js'
import "./assets/style.css"


import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  vuetify,
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
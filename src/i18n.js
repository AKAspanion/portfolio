import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const requireContext = require.context('./assets/i18n', true, /\.json$/);
let messages = {};
requireContext.keys().forEach(key => {
  const obj = requireContext(key);
  let lang = key.split('/')[1];
  if (!messages.hasOwnProperty(lang)) {
    messages[lang] = {};
  }
  messages[lang] = Object.assign(messages[lang], obj);
});

const i18n = new VueI18n({
  locale: 'en',
  messages,
});

export default i18n;

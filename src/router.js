import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from './views/Home.vue';
import NotFound from './views/NotFound.vue';

// The whole portfolio lives on the home page. Older section URLs redirect
// there so they never render an empty or under-construction screen.
const legacyPaths = [
  '/home',
  '/about',
  '/experience',
  '/projects',
  '/projects/:id',
  '/contact',
  '/exp',
];

const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      index: 0,
    },
  },
  ...legacyPaths.map((path) => ({ path, redirect: '/' })),
  {
    path: '*',
    component: NotFound,
    meta: {
      index: 0,
    },
  },
];

export default new VueRouter({
  mode: 'history',
  routes,
});

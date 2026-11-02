import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router';

import { adsLoaded } from '@/util/ads';
import HomeView from '@/views/HomeView.vue';

// The whole portfolio lives on the home page. Older section URLs redirect
// there so they never render an empty or under-construction screen.
export const legacyPaths = [
  '/home',
  '/about',
  '/experience',
  '/projects',
  '/projects/:id',
  '/contact',
  '/exp',
];

export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomeView },
  ...legacyPaths.map((path) => ({ path, redirect: '/' })),
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// The AdSense script can't be removed from a page once loaded. If the visitor
// goes back from the home page to a 404, load that page fresh so it carries
// no ads.
router.afterEach((to, from, failure) => {
  if (!failure && to.name === 'not-found' && from.name && adsLoaded()) {
    window.location.reload();
  }
});

// After a deploy, an open tab may ask for code chunks that no longer exist.
// Reload once to pick up the new version.
const RELOAD_KEY = 'chunk-reload';
router.onError((error: unknown, to) => {
  const message = error instanceof Error ? error.message : String(error);
  if (
    !/dynamically imported module|Importing a module script failed/i.test(
      message,
    )
  )
    return;
  try {
    if (sessionStorage.getItem(RELOAD_KEY) === to.fullPath) return;
    sessionStorage.setItem(RELOAD_KEY, to.fullPath);
  } catch {
    return;
  }
  window.location.assign(to.fullPath);
});

export default router;

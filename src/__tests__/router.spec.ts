import { describe, expect, it } from 'vitest';
import { createMemoryHistory, createRouter } from 'vue-router';

import { legacyPaths, routes } from '@/router';

function makeRouter() {
  return createRouter({ history: createMemoryHistory(), routes });
}

describe('router', () => {
  it.each(legacyPaths.map((p) => p.replace(':id', 'some-project')))(
    'redirects %s to the home page',
    async (path) => {
      const router = makeRouter();
      await router.push(path);
      expect(router.currentRoute.value.path).toBe('/');
      expect(router.currentRoute.value.name).toBe('home');
    },
  );

  it('serves the privacy policy at /privacy', async () => {
    const router = makeRouter();
    await router.push('/privacy');
    expect(router.currentRoute.value.name).toBe('privacy');
    expect(router.currentRoute.value.path).toBe('/privacy');
  });

  it('sends paths below /privacy to the 404 page', async () => {
    const router = makeRouter();
    await router.push('/privacy/extra');
    expect(router.currentRoute.value.name).toBe('not-found');
  });

  it('sends unknown paths to the 404 page', async () => {
    const router = makeRouter();
    await router.push('/does/not/exist');
    expect(router.currentRoute.value.name).toBe('not-found');
  });
});

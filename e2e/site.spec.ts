import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const AD_HOST = 'pagead2.googlesyndication.com';
const AD_SCRIPT = /^https:\/\/pagead2\.googlesyndication\.com\//;

/** Errors caused by the blocked AdSense request are expected. */
const unexpected = (errors: string[]) =>
  errors.filter((e) => !e.includes(AD_HOST) && !e.includes('ERR_FAILED'));

/** Records page errors and blocks (but counts) AdSense requests. */
async function watch(page: Page) {
  const errors: string[] = [];
  const adRequests: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await page.route(AD_SCRIPT, (route) => {
    adRequests.push(route.request().url());
    return route.abort();
  });
  return { errors, adRequests };
}

const adsConfigured = (page: Page) =>
  page
    .locator('meta[name="google-adsense-account"]')
    .count()
    .then((n) => n > 0);

test('home page shows all sections without errors', async ({ page }) => {
  const { errors } = await watch(page);
  await page.goto('/');

  await expect(page).toHaveTitle(/Ankit Kumar Pandit/);
  for (const id of ['projects', 'skills', 'experience', 'contact']) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
  await expect(page.locator('.work-grid__item').first()).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://spanion.in/',
  );
  expect(unexpected(errors)).toEqual([]);
});

test('ads are requested only after the home content is shown', async ({
  page,
}) => {
  const { adRequests } = await watch(page);
  await page.goto('/');
  test.skip(!(await adsConfigured(page)), 'build has no VITE_ADSENSE_CLIENT');

  expect(adRequests).toHaveLength(0);
  await expect(
    page.locator('#projects .work-grid__item').first(),
  ).toBeAttached();
  await expect.poll(() => adRequests.length, { timeout: 5_000 }).toBe(1);
});

test('legacy section URLs redirect home', async ({ page }) => {
  for (const path of ['/about', '/projects/notes-app', '/contact']) {
    await page.goto(path);
    await expect(page).toHaveURL(/\/$/);
  }
});

test('unknown URLs show a noindex 404 page without ads', async ({ page }) => {
  const { adRequests } = await watch(page);
  await page.goto('/does-not-exist');

  await expect(page.getByRole('heading', { name: '404' })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    'noindex',
  );
  await page.waitForTimeout(2_000);
  expect(adRequests).toHaveLength(0);

  await page.getByRole('link', { name: /Back to the portfolio/ }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
});

test('menu opens, navigates to a section and closes', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Open menu' });
  await expect(toggle).toBeVisible();
  // Controls slide in after the intro.
  await page.waitForTimeout(1_600);

  await toggle.click();
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(nav.getByRole('link', { name: 'skills' })).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(page.locator('#nav-menu')).not.toHaveClass(/--active/);
  // The toggle ignores clicks while the menu is still sliding.
  await page.waitForTimeout(1_000);

  await page.getByRole('button', { name: 'Open menu' }).click();
  await nav.getByRole('link', { name: 'skills' }).click();
  await expect(page.locator('#nav-menu')).not.toHaveClass(/--active/);
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          document.getElementById('skills')?.getBoundingClientRect().top ??
          Infinity,
      ),
    )
    .toBeLessThan(5);
});

test('theme and language choices persist across reloads', async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(1_600);
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.getByRole('button', { name: 'Dark theme' }).click();
  await page.getByRole('button', { name: 'HI', exact: true }).click();

  await page.reload();
  await expect(page.locator('.v-application')).toHaveClass(/v-theme--dark/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'hi');
  await expect(page.locator('#projects-title')).toHaveText('प्रोजेक्ट्स');
});

test('has no serious accessibility violations', async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(3_000);
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter((v) =>
    ['serious', 'critical'].includes(v.impact ?? ''),
  );
  expect(serious.map((v) => `${v.id}: ${v.nodes.length} nodes`)).toEqual([]);
});

test('static files are served as text', async ({ request }) => {
  for (const path of ['/robots.txt', '/sitemap.xml']) {
    const res = await request.get(path);
    expect(res.ok(), path).toBe(true);
    expect(await res.text(), path).not.toContain('<!doctype html>');
  }
});

test('menu links on the 404 page go to the right home section', async ({
  page,
}) => {
  await page.goto('/nope');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'skills' })
    .click();

  await expect(page).toHaveURL(/\/#skills$/);
  await expect
    .poll(
      () =>
        page.evaluate(
          () =>
            document.getElementById('skills')?.getBoundingClientRect().top ??
            Infinity,
        ),
      {
        timeout: 8_000,
      },
    )
    .toBeLessThan(5);
  await expect(page.locator('#skills')).toBeFocused();
});

test('going back to a 404 after ads loaded gives a fresh page without ads', async ({
  page,
}) => {
  const { adRequests } = await watch(page);
  await page.goto('/nope');
  test.skip(!(await adsConfigured(page)), 'build has no VITE_ADSENSE_CLIENT');

  await page.getByRole('link', { name: /Back to the portfolio/ }).click();
  await expect.poll(() => adRequests.length, { timeout: 5_000 }).toBe(1);

  await page.goBack();
  await expect(page.getByRole('heading', { name: '404' })).toBeVisible();
  await expect(page.locator('script[src*="adsbygoogle"]')).toHaveCount(0);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    'noindex',
  );
});

test('menu manages keyboard focus', async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(1_600);
  const toggle = page.getByRole('button', { name: 'Open menu' });
  await toggle.click();

  // Focus moves into the menu, and the page behind it is inert.
  await expect(page.getByRole('link', { name: 'home' })).toBeFocused();
  await expect(page.locator('.app-content')).toHaveAttribute('inert', '');

  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();
  await expect(page.locator('.app-content')).not.toHaveAttribute('inert');
});

test('a hash that is not a valid selector does not break the page', async ({
  page,
}) => {
  const { errors } = await watch(page);
  await page.goto('/#1');
  await page.waitForTimeout(2_500);
  expect(unexpected(errors)).toEqual([]);
});

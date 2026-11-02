import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  initialLocale,
  initialTheme,
  saveLocale,
  saveTheme,
} from '../preferences';

function mockSystemDark(dark: boolean) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: dark && query.includes('dark'),
  }));
}

describe('preferences', () => {
  afterEach(() => {
    localStorage.clear();
    vi.unstubAllGlobals();
  });

  it('follows the system colour scheme when nothing is saved', () => {
    mockSystemDark(true);
    expect(initialTheme()).toBe('dark');
    mockSystemDark(false);
    expect(initialTheme()).toBe('light');
  });

  it('prefers a saved theme over the system one', () => {
    mockSystemDark(true);
    saveTheme('light');
    expect(initialTheme()).toBe('light');
  });

  it('round-trips the language', () => {
    expect(initialLocale()).toBe('en');
    saveLocale('hi');
    expect(initialLocale()).toBe('hi');
  });

  it('reads the JSON-encoded language older versions stored', () => {
    localStorage.setItem('lang', '"hi"');
    expect(initialLocale()).toBe('hi');
  });

  it('survives storage that throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    mockSystemDark(false);
    expect(initialTheme()).toBe('light');
    expect(initialLocale()).toBe('en');
    vi.restoreAllMocks();
  });
});

import type { Locale } from '@/plugins/i18n';

// Theme and language are remembered per browser. Storage can throw (private
// mode, blocked site data), so every access is guarded.
function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Not persisting the choice is fine.
  }
}

export function initialTheme(): 'light' | 'dark' {
  const saved = read('dark');
  if (saved === 'true') return 'dark';
  if (saved === 'false') return 'light';
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function saveTheme(theme: 'light' | 'dark'): void {
  write('dark', String(theme === 'dark'));
}

export function initialLocale(): Locale {
  // Older versions stored the locale JSON-encoded ("\"hi\"").
  return read('lang')?.replaceAll('"', '') === 'hi' ? 'hi' : 'en';
}

export function saveLocale(locale: Locale): void {
  write('lang', locale);
}

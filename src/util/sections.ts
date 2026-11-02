/**
 * Finds the page section a URL hash points at. Hashes come from the URL, so
 * they are looked up by id rather than used as CSS selectors.
 */
export function findSection(hash: string): HTMLElement | null {
  let id = hash.replace(/^#/, '');
  try {
    id = decodeURIComponent(id);
  } catch {
    // Malformed escapes: use the raw id.
  }
  return id ? document.getElementById(id) : null;
}

/** Moves keyboard focus to a section without scrolling to it again. */
export function focusSection(section: HTMLElement): void {
  section.focus({ preventScroll: true });
}

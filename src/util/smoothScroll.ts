// Eases mouse-wheel scrolling of the page. Inspired by
// https://stackoverflow.com/questions/47011055/smooth-vertical-scrolling-on-mouse-wheel-in-vanilla-javascript

const SMOOTHING = 20;

const LINE_HEIGHT = 40;

/** Returns a function that removes the listener again. */
export function installSmoothScroll(
  target: Element = document.scrollingElement ?? document.documentElement,
): () => void {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    return () => {};
  }

  let moving = false;
  let pos = target.scrollTop;
  let lastSet = target.scrollTop;

  function onWheel(e: WheelEvent) {
    // Leave pinch-zoom and horizontal scrolling to the browser.
    if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    e.preventDefault();

    // Start from where the page really is: it may have been scrolled by
    // keyboard, scrollbar or a scripted scroll since the last wheel turn.
    if (!moving) pos = target.scrollTop;

    const scale =
      e.deltaMode === WheelEvent.DOM_DELTA_LINE
        ? LINE_HEIGHT
        : e.deltaMode === WheelEvent.DOM_DELTA_PAGE
          ? target.clientHeight
          : 1;
    const max = target.scrollHeight - target.clientHeight;
    pos = Math.max(0, Math.min(pos + e.deltaY * scale, max));

    if (!moving) {
      moving = true;
      lastSet = target.scrollTop;
      requestAnimationFrame(update);
    }
  }

  function update() {
    // Something else (e.g. a "back to top" animation) took over the scroll.
    if (Math.abs(target.scrollTop - lastSet) > 2) {
      moving = false;
      return;
    }

    const before = target.scrollTop;
    const delta = (pos - before) / SMOOTHING;
    target.scrollTop = before + delta;
    lastSet = target.scrollTop;

    // Stop once close enough, or when the browser can't move by a fraction.
    if (Math.abs(delta) > 0.5 && target.scrollTop !== before) {
      requestAnimationFrame(update);
    } else {
      moving = false;
    }
  }

  window.addEventListener('wheel', onWheel, { passive: false });
  return () => window.removeEventListener('wheel', onWheel);
}

import { useDisplay } from 'vuetify';

/**
 * "Magnetic" hover effects: elements lean towards the pointer while it is
 * over them. Disabled on phones, where there is no hover.
 */
export function useMagnet() {
  const { xs } = useDisplay();

  /** Moves `inner` towards the pointer while it is inside `container`. */
  function iconHover(
    e: MouseEvent,
    container?: HTMLElement | null,
    inner?: HTMLElement | null,
  ) {
    if (xs.value || !container || !inner) return;
    const rect = container.getBoundingClientRect();
    const inside =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;
    const x = inside ? e.clientX - rect.right + rect.width / 2 : 0;
    const y = inside ? e.clientY - rect.bottom + rect.height / 2 : 0;
    inner.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

  /** Nudges the hovered text along the pointer; `end` resets it. */
  function textHover(e: MouseEvent, end = false) {
    const el = e.currentTarget;
    if (xs.value || !(el instanceof HTMLElement)) return;
    if (end) {
      el.style.transform = 'translate3d(0px, 0px, 0px)';
      return;
    }
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * (rect.width / 4);
    const y = ((e.clientY - rect.top) / rect.height) * (rect.height / 2);
    el.style.transform = `translate3d(${Math.floor(x)}px, ${Math.floor(y)}px, 0px)`;
  }

  return { iconHover, textHover };
}

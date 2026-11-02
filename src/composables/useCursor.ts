import { useDisplay } from 'vuetify';

import { useUiStore } from '@/stores/ui';

/** Shows a tooltip, or an image preview, on the animated cursor. */
export function useCursor() {
  const ui = useUiStore();
  const { xs } = useDisplay();

  const showCursor = (tooltip?: string, link?: string) => {
    if (!xs.value) ui.showCursor(tooltip, link);
  };
  const hideCursor = () => {
    if (!xs.value) ui.hideCursor();
  };

  return { showCursor, hideCursor };
}

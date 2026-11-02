import {
  mdiAndroid,
  mdiArrowBottomLeft,
  mdiChevronLeft,
  mdiEmailOutline,
  mdiFacebook,
  mdiFirebase,
  mdiGithub,
  mdiInstagram,
  mdiJquery,
  mdiLinkedin,
  mdiMoonWaningCrescent,
  mdiNodejs,
  mdiNotebookMultiple,
  mdiReact,
  mdiVuejs,
  mdiVuetify,
  mdiWhiteBalanceSunny,
} from '@mdi/js';

export const icons = {
  arrowBottomLeft: mdiArrowBottomLeft,
  chevronLeft: mdiChevronLeft,
  email: mdiEmailOutline,
  moon: mdiMoonWaningCrescent,
  sun: mdiWhiteBalanceSunny,
};

const socialBrands: Record<string, { icon: string; color: string }> = {
  github: { icon: mdiGithub, color: '#181717' },
  linkedin: { icon: mdiLinkedin, color: '#0077B5' },
  instagram: { icon: mdiInstagram, color: '#E4405F' },
  facebook: { icon: mdiFacebook, color: '#1877F2' },
};

/**
 * Icon and brand colour for a social profile, from its URL's domain (link
 * names are translated, so they can't be used as keys).
 */
export function socialBrand(
  url: string,
): { icon: string; color: string } | undefined {
  const host = new URL(url).hostname.replace(/^www\./, '');
  return socialBrands[host.split('.')[0] ?? ''];
}

/** Icons that projects.json may refer to by MDI name. */
const projectIcons: Record<string, string> = {
  android: mdiAndroid,
  firebase: mdiFirebase,
  jquery: mdiJquery,
  nodejs: mdiNodejs,
  'notebook-multiple': mdiNotebookMultiple,
  react: mdiReact,
  vuejs: mdiVuejs,
  vuetify: mdiVuetify,
};

/** Resolves a project tag icon to an SVG path; raw paths pass through. */
export function projectIcon(icon: string): string | undefined {
  return icon.startsWith('M') ? icon : projectIcons[icon];
}

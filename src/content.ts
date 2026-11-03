import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import experienceEn from '@/assets/json/en/experience.json';
import navEn from '@/assets/json/en/nav.json';
import projectsEn from '@/assets/json/en/projects.json';
import skillsEn from '@/assets/json/en/skills.json';
import socialEn from '@/assets/json/en/social.json';
import experienceHi from '@/assets/json/hi/experience.json';
import navHi from '@/assets/json/hi/nav.json';
import projectsHi from '@/assets/json/hi/projects.json';
import skillsHi from '@/assets/json/hi/skills.json';
import socialHi from '@/assets/json/hi/social.json';
import type { Locale } from '@/plugins/i18n';

export interface ProjectTag {
  name: string;
  /** An MDI icon name (see icons.ts) or a raw SVG path. */
  icon: string;
  color: string;
}

export interface Project {
  name: string;
  /** Basename of public/images/<img>.webp and public/images/ss/<img>.webp. */
  img: string;
  link: string;
  icons: ProjectTag[];
}

export interface Experience {
  name: string;
  role: string;
  location: string;
  time: string;
  img: string;
  link: string;
  desc: string;
}

export interface Skill {
  name: string;
  /** Basename of public/images/icons/<icon>.svg. */
  icon: string;
  top?: boolean;
}

export interface NavItem {
  id: number;
  name: string;
  domId: string;
  tooltip: string;
}

export interface SocialLink {
  id: number;
  name: string;
  url: string;
}

export interface Content {
  projects: Project[];
  experience: Experience[];
  skills: Skill[];
  nav: NavItem[];
  social: SocialLink[];
}

/** The address visitors write to, shown on the home page and in the privacy policy. */
export const CONTACT_EMAIL = 'panditankit1995@gmail.com';

export const content: Record<Locale, Content> = {
  en: {
    projects: projectsEn,
    experience: experienceEn,
    skills: skillsEn,
    nav: navEn,
    social: socialEn,
  },
  hi: {
    projects: projectsHi,
    experience: experienceHi,
    skills: skillsHi,
    nav: navHi,
    social: socialHi,
  },
};

/** The portfolio content for the current language. */
export function useContent() {
  const { locale } = useI18n();
  return computed(() => content[locale.value as Locale] ?? content.en);
}

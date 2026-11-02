import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import en from '@/assets/i18n/en/lang.json';
import hi from '@/assets/i18n/hi/lang.json';
import { content } from '@/content';
import { projectIcon, socialBrand } from '@/icons';

const publicFile = (path: string) =>
  existsSync(resolve(__dirname, '../../public', path));

function keys(obj: object, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === 'object' && !Array.isArray(v)
      ? keys(v as object, `${prefix}${k}.`)
      : [`${prefix}${k}`],
  );
}

describe('translations', () => {
  it('Hindi has exactly the English keys', () => {
    expect(keys(hi).sort()).toEqual(keys(en).sort());
  });
});

describe.each(Object.entries(content))('content (%s)', (locale, data) => {
  it('has the same number of items as English', () => {
    for (const key of Object.keys(data) as (keyof typeof data)[]) {
      expect(data[key], `${locale}.${key}`).toHaveLength(
        content.en[key].length,
      );
    }
  });

  it('every project has its images and resolvable tag icons', () => {
    for (const project of data.projects) {
      expect(publicFile(`images/${project.img}.webp`), project.img).toBe(true);
      expect(
        publicFile(`images/ss/${project.img}.webp`),
        `ss/${project.img}`,
      ).toBe(true);
      expect(project.link).toMatch(/^https:\/\//);
      for (const tag of project.icons) {
        expect(
          projectIcon(tag.icon),
          `${project.name}: ${tag.icon}`,
        ).toBeTruthy();
      }
    }
  });

  it('every job has its logo and an https link', () => {
    for (const job of data.experience) {
      expect(publicFile(`images/${job.img}.webp`), job.img).toBe(true);
      expect(job.link).toMatch(/^https:\/\//);
    }
  });

  it('every skill has its icon', () => {
    for (const skill of data.skills) {
      expect(publicFile(`images/icons/${skill.icon}.svg`), skill.icon).toBe(
        true,
      );
    }
  });

  it('every social link has an icon and an https url', () => {
    for (const link of data.social) {
      expect(socialBrand(link.url), link.name).toBeTruthy();
      expect(link.url).toMatch(/^https:\/\//);
    }
  });

  it('nav items point at sections that exist on the home page', () => {
    const sections = ['home', 'projects', 'skills', 'experience', 'contact'];
    for (const item of data.nav) expect(sections).toContain(item.domId);
  });
});

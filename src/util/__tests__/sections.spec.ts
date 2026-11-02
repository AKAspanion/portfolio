import { afterEach, describe, expect, it } from 'vitest';

import { findSection } from '../sections';

describe('findSection', () => {
  afterEach(() => (document.body.innerHTML = ''));

  it('finds a section by hash', () => {
    document.body.innerHTML = '<section id="skills"></section>';
    expect(findSection('#skills')?.id).toBe('skills');
  });

  it('copes with hashes that are not valid CSS selectors', () => {
    document.body.innerHTML = '<section id="1"></section>';
    expect(findSection('#1')?.id).toBe('1');
    expect(findSection('#%E0%A4')).toBeNull();
    expect(findSection('#')).toBeNull();
    expect(findSection('#does-not-exist')).toBeNull();
  });
});

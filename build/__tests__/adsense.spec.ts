import { describe, expect, it } from 'vitest';

import { adsTxt } from '../adsense';

describe('adsTxt', () => {
  it('builds the ads.txt line from the publisher id', () => {
    expect(adsTxt('ca-pub-1234567890123456')).toBe(
      'google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0\n',
    );
  });
});

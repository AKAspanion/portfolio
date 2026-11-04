import { describe, expect, it, vi } from 'vitest';
import type { ResolvedConfig } from 'vite';

import { adsense, adsTxt } from '../adsense';

describe('adsTxt', () => {
  it('builds the ads.txt line from the publisher id', () => {
    expect(adsTxt('ca-pub-1234567890123456')).toBe(
      'google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0\n',
    );
  });
});

function runBuild(client: string) {
  const plugin = adsense();
  const emitFile = vi.fn();
  const configResolved = plugin.configResolved as (
    config: ResolvedConfig,
  ) => void;
  const generateBundle = plugin.generateBundle as (this: {
    emitFile: typeof emitFile;
  }) => void;
  configResolved({
    env: { VITE_ADSENSE_CLIENT: client },
  } as unknown as ResolvedConfig);
  generateBundle.call({ emitFile });
  return emitFile;
}

describe('adsense generateBundle', () => {
  it('emits ads.txt and app-ads.txt with the same line when the id is set', () => {
    const emitFile = runBuild('ca-pub-1234567890123456');
    const source =
      'google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0\n';

    expect(emitFile).toHaveBeenCalledTimes(2);
    expect(emitFile).toHaveBeenCalledWith({
      type: 'asset',
      fileName: 'ads.txt',
      source,
    });
    expect(emitFile).toHaveBeenCalledWith({
      type: 'asset',
      fileName: 'app-ads.txt',
      source,
    });
  });

  it('emits nothing when the id is empty', () => {
    expect(runBuild('')).not.toHaveBeenCalled();
  });
});

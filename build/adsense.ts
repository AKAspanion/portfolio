import type { Plugin } from 'vite';

// Google's TAG ID for AdSense, the same for every publisher.
const GOOGLE_TAG_ID = 'f08c47fec0942fa0';
const CLIENT_PATTERN = /^ca-pub-\d{10,20}$/;

export function adsTxt(client: string): string {
  return `google.com, ${client.replace(/^ca-/, '')}, DIRECT, ${GOOGLE_TAG_ID}\n`;
}

/**
 * Adds the AdSense site-verification meta tag and generates ads.txt from
 * VITE_ADSENSE_CLIENT, so the publisher ID lives in .env rather than in the
 * repository. The same line is also emitted as app-ads.txt, which serves
 * AdMob's verification of the Android app. Without the variable the build
 * ships no ads at all.
 */
export function adsense(): Plugin {
  let client: string | undefined;

  return {
    name: 'adsense',
    configResolved(config) {
      client = config.env.VITE_ADSENSE_CLIENT || undefined;
      if (client && !CLIENT_PATTERN.test(client)) {
        throw new Error(
          `VITE_ADSENSE_CLIENT must look like ca-pub-0000000000000000, got "${client}"`,
        );
      }
    },
    transformIndexHtml() {
      if (!client) return [];
      return [
        {
          tag: 'meta',
          attrs: { name: 'google-adsense-account', content: client },
          injectTo: 'head',
        },
      ];
    },
    generateBundle() {
      if (!client) return;
      for (const fileName of ['ads.txt', 'app-ads.txt']) {
        this.emitFile({ type: 'asset', fileName, source: adsTxt(client) });
      }
    },
  };
}

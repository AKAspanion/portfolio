/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** AdSense publisher ID, e.g. ca-pub-0000000000000000. */
  readonly VITE_ADSENSE_CLIENT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

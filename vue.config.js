const adsenseClient = process.env.VUE_APP_ADSENSE_CLIENT;

// ads.txt has to be served from the site root, so it is generated at build
// time from .env instead of keeping the publisher ID in public/.
class AdsTxtPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('AdsTxtPlugin', (compilation) => {
      if (!adsenseClient) return;
      const publisherId = adsenseClient.replace(/^ca-/, '');
      const content = `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`;
      compilation.assets['ads.txt'] = {
        source: () => content,
        size: () => content.length,
      };
    });
  }
}

module.exports = {
  configureWebpack: {
    plugins: [new AdsTxtPlugin()],
  },
};

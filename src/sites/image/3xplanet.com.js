/**
 * @domain 3xpla.net
 * @domain 3xplanet.com
 * @domain 3xplanet.net
 * @domain 3xplanet.xyz
 * @domain jav-load.com
 * @domain javtenshi.com
 * @domain javxspot.com
 * @domain uncenav.com
 */
_.register({
  rule: {
    host: [
      /^3xpla\.net/,
      /^3xplanet\.(com|net|xyz)$/,
      /^jav-load\.com$/,
      /^javtenshi\.com$/,
      /^javxspot\.com$/,
      /^uncenav\.com$/,
    ],
    path: /^\/viewimage\//,
    },
    async ready() {
      const o = $("#show_image");
      await $.openImage(o.src);
  },
});

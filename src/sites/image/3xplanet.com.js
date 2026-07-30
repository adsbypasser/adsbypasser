/**
 * @domain 3xplanet.com
 * @domain 3xplanet.net
 * @domain jav-load.com
 * @domain javtenshi.com
 * @domain uncenav.com
 */
_.register({
  rule: {
    host: [
      /^3xplanet\.(com|net)$/,
      /^jav-load\.com$/,
      /^javtenshi\.com$/,
      /^uncenav\.com$/,
    ],
    path: /^\/viewimage\//,
    },
    async ready() {
      const o = $("#show_image");
      await $.openImage(o.src);
  },
});

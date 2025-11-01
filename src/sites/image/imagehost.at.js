/**
 * @domain imagehost.at
 * @domain im.ge
 * @domain pixxxar.com
 */
_.register({
  rule: [
    {
      host: [/^www\.imagehost\.at$/, "pixxxar.com"],
      path: /^\/image\//,
    },
    {
      host: /^im\.ge$/,
      path: /^\/i\//,
    },
  ],
  async ready() {
    const i = $('meta[property="og:image"]');
    await $.openImage(i.content);
  },
});

/**
 * @domain image.javbee.vip
 * @domain javbee.vip
 */
_.register({
  rule: {
    host: /^image\.javbee\.vip$/,
    path: /^\/en\//,
  },
  async ready() {
    const i = $('meta[property="og:image"]');
    // This url will response 404 with normal header and body.
    // Using $.get here will need to bypass status === 200 check in AJAX.
    // Here we simply redirect to the url then handle it in another handler.
    await $.openLink(i.content);
  },
});

_.register({
  rule: {
    host: /^image\.javbee\.vip$/,
    path: /^\/ib\//,
  },
  async ready() {
    const a = $("a");
    await $.openImage(a.href);
  },
});

_.register({
  rule: "https://javbee.vip/upload/en/*",
  async ready() {
    const m = $('meta[property="og:image"]');
    await $.openImage(m.content);
  },
});

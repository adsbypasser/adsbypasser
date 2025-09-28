/**
 * @domain imgbaron.com
 * @domain imgsto.com
 * @domain pics4you.org
 * @domain silverpic.net
 * @domain fappic.com
 */
_.register({
  rule: {
    host: [
      /^imgbaron\.com$/,
      /^imgsto\.com$/,
      /^pics4you\.org/,
      /^silverpic\.net$/,
      /^www\.fappic\.com$/,
    ],
  },
  async ready() {
    const i = $.$(".main-content-image img");
    if (i) {
      await $.openImage(i.src);
      return;
    }

    const f = $("form");
    f.submit();
  },
});

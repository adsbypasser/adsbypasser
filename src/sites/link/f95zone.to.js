/**
 * @domain f95zone.to
 */
_.register({
  rule: {
    host: /^f95zone\.to$/,
    path: [/^\/masked\//],
  },
  async ready() {
    const a = await _.tryEvery(500, () => $.$(".host_link") ?? _.none);
    a.click();
  },
});

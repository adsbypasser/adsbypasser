/**
 * @domain fastpic.org
 */
_.register({
  rule: {
    host: /^fastpic\.org$/,
    path: /^\/view\//
  },
  async ready() {
  const a = $.$("#imglink");
  if (a) {
    await $.openLink(a.href);
    return;
  }
  const directUrl = $.searchFromScripts(/loading_img = '([^"]+)';/);
  await $.openLink(directUrl[1]);
  },
});

_.register({
  rule: {
    host: /^fastpic\.org$/,
  },
  async ready () {
    let a = $.$('#imglink');
    if (a) {
      await $.openLink(a.href);
      return;
    }
    const directUrl = $.searchFromScripts(/loading_img = '([^"]+)';/);
    await $.openLink(directUrl[1]);
  },
});

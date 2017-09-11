_.register({
  rule: {
    host: /^www\.spaste\.com$/,
    path: /^\/go\/\w+$/,
  },
  async ready () {
    const id = $.searchFromScripts(/\{id:'(\d+)'\}/);
    await _.wait(3000);
    const url = await $.post('/site/getRedirectLink', {
      id: id[1],
    });
    await $.openLink(url);
  },
});

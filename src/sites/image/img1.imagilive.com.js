_.register({
  rule: 'http://img1.imagilive.com/*/*',
  async ready () {
    const a = $.$('#page a.button');
    if (a) {
      await $.openLink(a.href);
      return;
    }

    const i = $('#page > img:not([id])');
    await $.openImage(i.src);
  },
});

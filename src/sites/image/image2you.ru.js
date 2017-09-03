_.register({
  rule: {
    host: /^image2you\.ru$/,
    path: /^\/\d+\/\d+/,
  },
  async ready () {
    const i = $.$('div.t_tips2 div > img');
    if (!i) {
      await $.openLink('', {
        post: {
          _confirm: '',
        },
      });
      return;
    }
    await $.openImage(i.src);
  },
});

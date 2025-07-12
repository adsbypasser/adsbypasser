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
    a = $('.image');
    await $.openImage(a.src);
  },
});

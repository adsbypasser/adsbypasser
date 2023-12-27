_.register({
  rule: {
    host: /^imgdawgknuttz\.com$/,
  },
  async ready () {
    let a = $('.button.blue');
    if (a) {
      a.click();
    }
    a = $('.centred');
    await $.openImage(a.src);
  },
});

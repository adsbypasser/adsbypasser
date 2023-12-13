_.register({
  rule: {
    host: [
      /^acidimg\.cc$/,
      /^imgdawgknuttz\.com$/,
    ],
  },
  async ready () {
    let a = $('.button');
    if (a) {
      a.click();
    }
    a = $('.centred');
    await $.openImage(a.src);
  },
});

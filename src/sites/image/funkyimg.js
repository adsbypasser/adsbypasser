_.register({
  rule: [
    'http://funkyimg.com/viewer.php?img=*',
    'http://funkyimg.com/view/*',
  ],
  async ready () {
    const i = $('#viewer img');
    await $.openImage(i.src);
  },
});

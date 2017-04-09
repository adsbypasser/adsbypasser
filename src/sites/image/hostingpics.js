_.register({
  rule: 'http://www.hostingpics.net/viewer.php?id=*',
  async ready () {
    const i = $('#img_viewer');
    await $.openImage(i.src);
  },
});

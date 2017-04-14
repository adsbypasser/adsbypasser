_.register({
  rule: 'http://picshare.geenza.com/pics/*',
  async ready () {
    const i = $('#picShare_image_container');
    await $.openImage(i.src);
  },
});

_.register({
  rule: 'http://imgdrive.net/img-*',
  async ready () {
    const m = $('meta[property="og:image"]');
    await $.openImage(m.content.replace("small", "big"));
  },
});

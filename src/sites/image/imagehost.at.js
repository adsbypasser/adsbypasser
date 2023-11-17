_.register({
  rule: 'https://www.imagehost.at/image/*',
  async ready () {
    const i = $('meta[property="og:image"]');
    await $.openImage(i.content);
  },
});

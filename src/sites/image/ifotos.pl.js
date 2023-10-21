_.register({
  rule: [
    'https://img.javstore.net/image/*',
    'https://picnew.space/image/*',
    'https://pig69.com/*',
    'https://javball.com/*'
  ],
  async ready () {
    const m = $('meta[property="og:image"]');
    await $.openImage(m.content);
  },
});

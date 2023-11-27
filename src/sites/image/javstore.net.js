_.register({
  rule: [
    'https://ai18.pics/upload/en/*',
    'https://cnpics.org/upload/en/*',
    'https://cnxx.me/upload/en/*',
    'https://cosplay18.pics/upload/en/*',
    'https://idol69.net/upload/en/*',
    'https://img.javstore.net/image/*',
    'https://javball.com/upload/en/*',
    'https://ovabee.com/upload/en/*',
    'https://picnew.space/image/*',
    'https://pig69.com/upload/en/*',
    'https://porn4f.com/upload/en/*',
  ],
  async ready () {
    const m = $('meta[property="og:image"]');
    await $.openImage(m.content);
  },
});

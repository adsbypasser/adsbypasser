_.register({
  rule: [    
    'https://2i.cz/i/*',
    'https://2i.sk/i/*',
    'https://www.imagehost.at/image/*',
  ],
  async ready () {
    const i = $('meta[property="og:image"]');
    await $.openImage(i.content);
  },
});

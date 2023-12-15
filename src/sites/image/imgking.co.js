_.register({
  rule: [
    {
      host: [
        /^imgking\.co$/,
        /^imgkings\.com$/,
      ],
      path: /^\/img*.*\.html/,
    },
  ],
  async ready () {
    const url = $.window.linkid;
    await $.openImage(url);
      
    const i = $('img[alt]');
    await $.openImage(i.src);
  },
});

_.register({
  rule: {
    host: /^javcity\.com$/,
  },
  async ready () {
    const a = $('.entry-content > h1:nth-child(1) > a:nth-child(1)');
    let url = a.onclick.toString();
    url = url.match(/window\.open\('([^']+)'\)/);
    if (!url) {
      _.info('pattern changed');
      return;
    }
    // NOTE actually this site points to another image host
    await $.openImage(url[1]);
  },
});

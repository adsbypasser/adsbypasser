_.register({
  rule: {
    host: /^tinyurl\.is$/,
  },
  async ready() {
    // force countdown to 0 from site's eval script
    $.window.count = 0;

    const link = await _.tryEvery(200, () => {
      const link = $('a[id^=newskip-btn]').href;
      if (link.includes('tinyurl.is')) {
        return _.none;
      } else {
        return link;
      }
    });
    await $.openLink(link);
  },
});

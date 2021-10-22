_.register({
  rule: {
    host: /^tinyurl\.is$/,
  },
  async ready () {
    // force countdown to 0 from site's eval script
    count=0; // eslint-disable-line
    _.tryEvery(200, function () {
      const link = $('a[id^=skip-btn]').href;
      if (link.includes('tinyurl.is')) {
        return _.none;
      } else {
        return link;
      }
    }).then(function (link) {
      $.openLink(link);
    });

  },
});

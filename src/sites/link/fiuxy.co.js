$.register({
  rule: {
    host: /^(www\.)?fiuxy\.co$/,
    path: /^\/links?\/$/,
  },
  ready: function () {
    $.openLink($('a.btn.a').href);
  }
});

$.register({
  rule: {
    host: /empireload\.com$/,
    path: /^\/plugin\.php$/,
    query: /^\?id=linkout&url=([^&]+)$/,
  },
  start: function (m) {
    $.openLink(m.query[1]);
  },
});

$.register({
  rule: {
    host: /^imgreality\.com$/,
    path: /^\/img-(.*?)(?:-full)?\.html$/
  },
  ready: function (m) {
    $.openImage("https://imgreality.com/dlimg.php?id=" + m.path[1], {
      replace: true
    })
  },
});

$.register({
  rule: {
    host: /^imgboom\.net$/,
    path: /^\/img-.*?\.html$/
  },
  ready: function () {
    $.openLink("http://imgboom.net/view.php");
  }
});

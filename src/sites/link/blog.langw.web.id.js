_.register({
  rule: {
    host: /^blog\.langw\.web\.id$/,
  },
  async ready () {
    const url = decodeURIComponent(decodeURIComponent($.getCookie('wpb_visit_time')));
    if (url.match(/^http/)) {
      $.resetCookies();
      await $.openLink(url);
    }
    // TODO handling of the countdown, when no url found
  },
});

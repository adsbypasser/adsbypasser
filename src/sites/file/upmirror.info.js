_.register({
  rule: {
    host: /^(www\.)?upmirror\.info$/,
  },
  async ready () {
    // We set it everywhere to avoid a potential page reload (this is unset each time the user accesses a download page)
    $.setCookie('user', 'ppp');

    // If we are on the waiting page, reload
    if ($.$('#countDownText')) {
      await $.openLink(document.location.toString());
    }
  },
});

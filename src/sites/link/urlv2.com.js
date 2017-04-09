_.register({
  rule: {
    host: /^(www\.)?urlv2\.com$/,
  },
  async ready () {
    if (window.location.pathname.indexOf('locked') >= 0) {
      // NOTE dirty fix
      const path = window.location.pathname.replace('/locked', '');
      await $.openLink(path);
      return;
    }

    const m = $.searchFromScripts(/jeton=([\w]+)/);
    const l = 'http://urlv2.com/algo.php?action=passer&px=0&so=1&jeton=' + m[1];

    // Necessary because of server-side checks
    await _.wait(5 * 1000);
    await $.openLink(l);
  },
});

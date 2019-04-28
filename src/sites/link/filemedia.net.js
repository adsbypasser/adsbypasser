_.register({
  rule: {
    host: /^filemedia\.net$/,
  },
  async ready () {
    const script = $.searchFromScripts(/window.location.href\s?=\s?\("(http.+?)"\)/);
    if (script.length > 1) {
      await $.openLink(script[1]);
    }
  },
});

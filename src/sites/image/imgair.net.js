_.register({
  rule: {
    host: /^imgair\.net$/,
    path: /^\/(.*)$/,
  },
  async ready () {
    const script = $.searchFromScripts('lekigns');
    const matches = script.match(/document\.location\.href="([^"]+)";/);

    await $.openImage(matches[1]);
  },
});

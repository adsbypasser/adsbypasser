_.register({
  rule: {
    host: /^(linkshrink|lnkshrnk)\.net$/,
    path: /^\/[a-zA-Z0-9]+$/,
  },
  async start () {
    $.window._impspcabe = 0;
  },
  async ready () {
    let l = $.searchFromScripts(/revC\("([^"]+)"\)/);
    l = atob(l[1]);
    await $.openLink('/' + l);
  },
});

_.register({
  rule: {
    host: /^(linkshrink|lnkshrnk)\.net$/,
    path: /=(.+)$/,
  },
  async start (m) {
    await $.openLink(m.path[1]);
  },
});

_.register({
  rule: {
    host: /^dwindly\.io$/,
  },
  async ready () {
    let l = $.searchFromScripts(/encD\("([^"]+)"\)/);
    if (l) {
      // second stage
      l = atob(l[1]);
      await $.openLink('/' + l);
      return;
    }

    // first stage
    l = $.searchFromScripts(/document\.location\.href = "([^"]+)"/);
    await $.openLink(l[1]);
  },
});

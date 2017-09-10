_.register({
  rule: {
    host: /^linkshrink\.net$/,
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
    host: /^linkshrink\.net$/,
    path: /=(.+)$/,
  },
  async start (m) {
    await $.openLink(m.path[1]);
  },
});

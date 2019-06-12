_.register({
  rule: {
    host: /^surfsees\.com$/,
    query: /^\?go=([a-zA-Z0-9]+)$/,
  },
  async start () {
    const path = window.location.href.replace('go', 'link');
    await $.openLink(path);
  },
});

_.register({
  rule: {
    host: /^surfsees\.com$/,
    query: /^\?link=([a-zA-Z0-9]+)(clickarurl)?$/,
  },
  async ready () {
    const s = $('input.btn.btn-primary');
    s.click();
  },
});

_.register({
  rule: {
    host: /^surfsees\.com$/,
  },
  async ready () {
    const surl = $('#wpsafe-linkz a');
    await $.openLink(surl.href);
  },
});

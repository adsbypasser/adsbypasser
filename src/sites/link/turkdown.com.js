_.register({
  rule: {
    host: /^turkdown\.com$/,
    path: /^\/link/,
    query: /^\?id=(.+)/,
  },
  async ready (m) {
    let html = await $.get(`?ajax=${m.query[1]}`);
    html = JSON.parse(html);
    const res = /stepone=(.+)/.exec(html.url);
    await $.openLink(atob(res[1]));
  },
});

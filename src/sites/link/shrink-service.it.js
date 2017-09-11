_.register({
  rule: {
    host: /^get\.shrink-service\.it$/,
    path: /^\/(.+)/,
  },
  async start (m) {
    await $.openLink(`//www.shrink-service.it/shrinked/${m.path[1]}`);
  },
});

_.register({
  rule: {
    host: /^www\.shrink-service\.it$/,
    path: /^\/shrinked\//,
  },
  async ready () {
    const i = $('input[id][name]');
    await $.openLink(i.value);
  },
});

_.register({
  rule: {
    host: /^www\.shrink-service\.it$/,
    path: /^\/[se]\//,
  },
  async ready () {
    $.remove('iframe');
    const i = $('body > input[id][name]');
    $.openLink(i.value);
  },
});

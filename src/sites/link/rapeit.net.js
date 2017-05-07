_.register({
  rule: {
    host: /^(www\.)?\w+\.rapeit\.net$/,
    path: /^\/(go|prepair|request|collect|analyze)\/[a-f0-9]+$/,
  },
  async ready () {
    const a = $('a#download_link');
    await $.openLink(a.href);
  },
});

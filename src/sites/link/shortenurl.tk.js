_.register({
  rule: {
    host: [
      /^(www\.)?shortenurl\.tk$/,
      /^(www\.)?pengaman\.link$/,
      /^urlgo\.gs$/,
      /^gunting\.web\.id$/,
    ],
    path: /^\/\w+$/,
  },
  async ready () {
    const l = $('a.btn-block.redirect');
    await $.openLink(l.href);
  },
});

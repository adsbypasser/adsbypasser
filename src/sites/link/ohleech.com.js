_.register({
  rule: {
    host: /^(www\.)?ohleech\.com$/,
    path: /^\/dl\/$/,
  },
  async ready () {
    $.window.startdl();
  },
});

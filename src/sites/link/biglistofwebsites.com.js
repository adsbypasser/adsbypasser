/**
 * @domain biglistofwebsites.com
 */
_.register({
  rule: {
    host: /^(www\.)?biglistofwebsites\.com$/,
    path: /^\/go\/(\w+\.\w+)$/,
  },
  async start(m) {
    await $.openLink("http://" + m.path[1]);
  },
});

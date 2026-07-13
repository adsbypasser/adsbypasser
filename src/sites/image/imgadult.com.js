/**
 * @domain imgadult.com
 * @domain imgtaxi.com
 */
_.register({
  rule: {
    host: [/^(www\.)?(imgadult|imgtaxi)\.com$/],
  },
  async ready() {
    let m = $('meta[property="og:image"]');
    m = m.content.replace("small", "big");
    await $.openImage(m);
  },
});

/**
 * @domain imgadult.com
 * @domain imgdrive.net
 * @domain imgtaxi.com
 */
_.register({
  rule: {
    host: [/^(www\.)?(imgadult|imgtaxi)\.com$/, /^(www\.)?imgdrive\.net$/],
  },
  async ready() {
    let m = $('meta[property="og:image"]');
    m = m.content.replace("small", "big");
    await $.openImage(m);
  },
});

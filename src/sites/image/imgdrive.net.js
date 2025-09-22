/**
 * @domain imgadult.com
 * @domain imgdrive.net
 * @domain imgtaxi.com
 * @domain imgwallet.com
 */
_.register({
  rule: {
    host: [
      /^(www\.)?(imgadult|imgtaxi|imgwallet)\.com$/,
      /^(www\.)?imgdrive\.net$/,
    ],
  },
  async ready() {
    let m = $('meta[property="og:image"]');
    m = m.content.replace("small", "big");
    await $.openImage(m);
  },
});

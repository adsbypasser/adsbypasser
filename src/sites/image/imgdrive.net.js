/**
 * @domain imgadult.com
 * @domain imgdrive.net
 * @domain imgtaxi.com
 * @domain imgwallet.com
 */
_.register({
  rule: {
    host: [
      /^(www\.)?imgdrive\.net$/,
      /^(www\.)?(imgtaxi|imgwallet|imgadult)\.com$/,
    ],
  },
  async ready() {
    let m = $('meta[property="og:image"]');
    m = m.content.replace("small", "big");
    await $.openImage(m);
  },
});

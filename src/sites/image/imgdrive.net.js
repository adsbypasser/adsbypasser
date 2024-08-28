_.register({
  rule: {
    host: [
      /^(www\.)?imgdrive\.net$/,
      /^(www\.)?(imgtaxi|imgwallet|imgadult)\.com$/,
      /^(14xpics|47xpics)\.space$/,
    ],
  },
  async ready () {
    let m = $('meta[property="og:image"]');
    m = m.content.replace('small', 'big');
    await $.openImage(m);
  },
});

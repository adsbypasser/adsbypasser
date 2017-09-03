_.register({
  rule: {
    host: /^imglocker\.com$/,
    path: [
      /^(\/\w+)\/(.+)\.html$/,
      /^(\/\w+)\/(.+)$/,
    ],
  },
  async start (m) {
    const url = _.template('//img.imglocker.com{0}_{1}');
    await $.openImage(url(m.path[1], m.path[2]));
  },
});

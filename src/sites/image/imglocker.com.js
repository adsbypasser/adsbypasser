_.register({
  rule: {
    host: /^imglocker\.com$/,
    path: [
      /^(\/\w+)\/(.+)\.html$/,
      /^(\/\w+)\/(.+)$/,
    ],
  },
  async start (m) {
    await $.openImage(`//img.imglocker.com${m.path[1]}_${m.path[2]}`);
  },
});

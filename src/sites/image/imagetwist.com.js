_.register({
  rule: {
    host: [
      /^imagetwist\.com$/,
      /^imagenpic\.com$/,
      /^imagexport\.com$/,
      /^imageshimage\.com$/,
      /^croea\.com$/,
      /^vipr\.im$/,
    ],
  },
  async ready() {
    const i = $("img.pic");
    if (window.location.host === "vipr.im") {
      await $.openImage(i.src, { replace: true });
    } else {
      await $.openImage(i.src);
    }
  },
});

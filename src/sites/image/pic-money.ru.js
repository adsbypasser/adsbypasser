_.register({
  rule: {
    host: [
      /^imgazure\.com$/,
      /^shaggyimg\.pro$/,
      /^pic-money\.ru$/,
      /^dailyimages\.xyz$/,
    ],
  },
  async ready () {
    const f = document.forms[0];
    const sig = $('input[name="sig"]', f).value;
    const pic_id = $('input[name="pic_id"]', f).value;
    const referer = $('input[name="referer"]', f).value;
    await $.openImage(`/pic.jpeg?pic_id=${pic_id}&sig=${sig}&referer=${referer}`);
  },
});

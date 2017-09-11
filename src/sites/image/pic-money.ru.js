_.register({
  rule: 'http://pic-money.ru/*.html',
  async ready () {
    const f = document.forms[0];
    const sig = $('input[name="sig"]', f).value;
    const pic_id = $('input[name="pic_id"]', f).value;
    const referer = $('input[name="referer"]', f).value;
    await $.openImage(`/pic.jpeg?pic_id=${pic_id}&sig=${sig}&referer=${referer}`);
  },
});

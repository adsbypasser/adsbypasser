_.register({
  rule: 'http://pic-money.ru/*.html',
  async ready () {
    const f = document.forms[0];
    const sig = $('input[name="sig"]', f).value;
    const pic_id = $('input[name="pic_id"]', f).value;
    const referer = $('input[name="referer"]', f).value;
    const url = _.template('/pic.jpeg?pic_id={pic_id}&sig={sig}&referer={referer}');
    await $.openImage(url({
      sig: sig,
      pic_id: pic_id,
      referer: referer,
    }));
  },
});

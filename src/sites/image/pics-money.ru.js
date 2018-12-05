_.register({
  rule: [
    'http://pics-money.ru/allpicfree/*',
    'http://www.pics-money.ru/allimage/*',
  ],
});

_.register({
  rule: {
    host: /^pics-money\.ru$/,
    path: /^\/v\.php$/,
  },
  async ready () {
    $.remove('iframe');
    const i = $('center img:not([id])');
    await $.openImage(i.src);
  },
});

_.register({
  rule: {
    host: [
      /^www\.pics-money\.ru$/,
      /^(picker-click|p0xpicmoney)\.ru$/,
    ],
  },
  async ready () {
    $.remove('iframe');
    let i = $('#d1 img, #pay_thumb_img > img');
    i = i.onclick.toString();
    i = i.match(/mshow\('(.+)'\)/);
    i = i[1];
    await $.openImage(i);
  },
});

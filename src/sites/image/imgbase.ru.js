/**
 * @domain imgbase.ru
 * @domain picforall.eu
 */
_.register({
  rule: {
    host: [/^imgbase\.ru$/, /^picforall\.eu$/],
  },
  async ready() {
    let i = $("#pay_thumb_img img, #d1 table tbody tr td img");
    i = i.getAttribute("onclick");
    i = i.match(/mshow\('(.+)'\)/);
    i = i[1];
    await $.openImage(i);
  },
});

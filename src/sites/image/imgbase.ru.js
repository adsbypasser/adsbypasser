/**
 * @domain imgbase.ru
 * @domain picforall.ru
 */
_.register({
  rule: {
    host: [
      /^(imgbase|picforall)\.ru$/,
    ],
  },
  async ready() {
    let i = $("#pay_thumb_img img, #d1 table tbody tr td img");
    i = i.getAttribute("onclick");
    i = i.match(/mshow\('(.+)'\)/);
    i = i[1];
    await $.openImage(i);
  },
});

_.register({
  rule: {
    host: [
      /^(drlink|picpic)\.online$/,
      /^(picclock|imgbase)\.ru$/,
    ],
    path: /^\/\d+\/\d+\/$/,
  },
  async ready () {
    let i = $('#pay_thumb_img img');
    i = i.getAttribute('onclick');
    i = i.match(/mshow\('(.+)'\)/);
    i = i[1];
    await $.openImage(i);
  },
});

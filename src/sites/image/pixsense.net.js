_.register({
  rule: {
    host: [
      /^www\.imagespicy\.site$/,
      /^www\.(imgsky|imgfile)\.net$/,
    ],
    path: /^\/site\/v\/\d+$/,
  },
  async ready () {
    const a = $('#myUniqueImg').parentNode;
    await $.openLink(a.href);
  },
});

_.register({
  rule: {
    host: [
      /^www\.imagespicy\.site$/,
      /^www\.(imgsky|imgfile)\.net$/,
    ],
    path: /^\/[a-z|0-9]{4,10}$/,
  },
  async ready () {
    await _.wait(1000);
    const b = $('body .main-content-box');
    b.style.display = 'initial';
    const c = $('body .container');
    c.style.display = 'initial';
    const img = $('body .big_img img');
    await $.openImage(img.src);
  },
});

_.register({
  rule: {
    host: [
      /^www\.pixsense\.net$/,
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
      /^www\.pixsense\.net$/,
      /^www\.imagespicy\.site$/,
      /^www\.(imgsky|imgfile)\.net$/,
    ],
    path: /^\/[a-z|0-9]{4,10}$/,
  },
  async ready () {
    await _ADSBYPASSER_NAMESPACE___WEBPACK_IMPORTED_MODULE_0__["_"].wait(1000);
    const b = Object(_ADSBYPASSER_NAMESPACE___WEBPACK_IMPORTED_MODULE_0__["$"])('body .main-content-box');
    b.style.display = 'initial';
    const c = Object(_ADSBYPASSER_NAMESPACE___WEBPACK_IMPORTED_MODULE_0__["$"])('body .container');
    c.style.display = 'initial';
    const img = Object(_ADSBYPASSER_NAMESPACE___WEBPACK_IMPORTED_MODULE_0__["$"])('body .big_img img');
    await _ADSBYPASSER_NAMESPACE___WEBPACK_IMPORTED_MODULE_0__["$"].openImage(img.src);
  },
});

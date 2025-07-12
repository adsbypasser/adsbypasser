_.register({
  rule: {
    host: /^fastpic\.org$/,
  },
  async ready () {
    let a = _ADSBYPASSER_NAMESPACE___WEBPACK_IMPORTED_MODULE_0__.$.$('#imglink');
    if (a) {
      await _ADSBYPASSER_NAMESPACE___WEBPACK_IMPORTED_MODULE_0__.$.openLink(a.href);
      return;
    }
    i = (0,_ADSBYPASSER_NAMESPACE___WEBPACK_IMPORTED_MODULE_0__.$)('.image');
    await _ADSBYPASSER_NAMESPACE___WEBPACK_IMPORTED_MODULE_0__.$.openImage(i.src);
  },
});

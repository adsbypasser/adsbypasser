_.register({
  rule: {
    host: /^www\.imagebam\.com$/,
    path: /^\/(view|image)\/.*$/,
  },
  async ready () {
    const img = (_ADSBYPASSER_NAMESPACE___WEBPACK_IMPORTED_MODULE_0__["$"])('img.main-image');
    await _ADSBYPASSER_NAMESPACE___WEBPACK_IMPORTED_MODULE_0__["$"].openImage(img.src);
});

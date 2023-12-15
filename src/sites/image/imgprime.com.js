_.register({
  rule: {
    host: /^imgprime\.com$/,
  },
  async ready () {
    let a = $.$('#continuetoimage a');
    if (a) {
      await $.openLink(a.href);
      return;
    }
    a = $('center a img');
    await $.openImage(a.src);
  },
});

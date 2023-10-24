_.register({
  rule: {
    host: /^get-click2\.blogspot\.com$/,
  },
  async ready () {
    const clbt = $('button#gotolink');
    clbt.removeAttribute('disabled');
    await _.wait(1);
    clbt.click();
  },
});

_.register({
  rule: {
    host: /^(www\.)?vidto\.me$/,
  },
  async ready () {
    const f = $('#btn_download').form;
    await _.wait(6 * 1000);
    f.submit();
  },
});

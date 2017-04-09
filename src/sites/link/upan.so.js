_.register({
  rule: {
    host: /^(www\.)?(upan|gxp)\.so$/,
    path: /^\/\w+$/,
  },
  async ready () {
    const a = $('table.td_line a[onclick="down_process_s();"]');
    await $.openLink(a.href);
  },
});

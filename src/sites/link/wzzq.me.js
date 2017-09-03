_.register({
  rule: {
    host: /^(www\.)?wzzq\.me$/,
  },
  async ready () {
    const l = $('#img_loading_table2  div.wz_img_hit a[target=_blank]').href;
    await $.openLink(l);
  },
});

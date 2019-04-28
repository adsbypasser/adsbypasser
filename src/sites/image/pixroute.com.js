_.register({
  rule: {
    host: /^(www\.)?pixroute\.com$/,
  },
  async ready () {
    // the img ID is a random string
    const o = $('#download_box img#imgpreview.pic');
    await $.openImage(o.src);
  },
});

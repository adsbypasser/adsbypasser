_.register({
  rule: {
    host: /^(www\.)?adfe\.es$/,
    path: /^\/\w+$/,
  },
  async ready () {
    const f = $('#frmvideo');
    // Not at the final step?
    if (!f.STEP4) {
      return;
    }
    f.submit();
  },
});

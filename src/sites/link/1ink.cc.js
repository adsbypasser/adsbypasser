_.register({
  rule: {
    host: /^1ink\.cc$/,
  },
  async ready() {
    const a = $("#countingbtn");
    await $.openLink(a.href);
  },
});

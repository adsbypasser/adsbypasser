/**
 * @domain 1ink.cc
 */
_.register({
  rule: {
    host: /^1ink\.cc$/,
  },
  async ready() {
    const a = $("#countingbtn");
    await $.openLink(a.href);
  },
});

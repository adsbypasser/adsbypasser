/**
 * @domain lnk2.cc
 */
_.register({
  rule: {
    host: /^lnk2\.cc$/,
    path: /^\/go\//,
  },
  async ready() {
    $.remove("iframe, .popupOverlay");
    await _.wait(18000);
    const b = $("#getLink");
    b.click();
  },
});

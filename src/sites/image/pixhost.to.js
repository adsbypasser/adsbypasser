/**
 * @domain pixho.st
 * @domain pixhost.cc
 * @domain pixhost.to
 */
_.register({
  rule: {
    host: [/^(www\.)?pixhost\.(cc|to)$/, /^pixho\.st$/],
    path: /^\/show\//,
  },
  async ready() {
    const button = document.querySelector("[data-age-gate-enter]");
    if (button) {
      button.click();
      // Wait briefly for Pixhost's click handler to set the
      // verification cookie. Usually only one or two iterations
      // are needed.
      for (let i = 0; i < 20; i++) {
        if (document.cookie.includes("pixhost_age_verified=1")) {
          break;
        }
        await _.wait(25);
      }
    }
    const image = document.querySelector("#image");
    if (!image) return;
    const url = image.currentSrc || image.src;
    if (!url) return;
    location.replace(url);
  },
});

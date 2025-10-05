/**
 * @domain network-loop.com
 */
_.register({
  rule: {
    host: /^network-loop\.com$/,
    query: /u=([^&]+)/,
  },
  async start() {
    await _.wait(3000);
    const shadowHost = document.querySelector("#print_button");
    const shadowRoot = shadowHost.shadowRoot;
    const buttonInShadow = shadowRoot.querySelector("a#pb_2");
    await $.openLink(buttonInShadow.href);
  },
});

/**
 * @domain simpcity.cr
 */
_.register({
  rule: {
    host: /^simpcity\.cr$/,
    path: [/^\/redirect\/?$/],
  },
  ready() {
    const link = document.querySelector(".simpLinkProxy-targetLink");
    if (link?.href) {
      location.replace(link.href);
    }
  },
});

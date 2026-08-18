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
    const i = $("#image");
    window.location.replace(i.src);
  },
});

_.register({
  rule: {
    host: /^(www\.)?ultshare\.com$/,
    path: /^\/(?:(?:\d-)?(\d+)|index\.php)$/,
    query: /^(?:\?a=\d&c=(\d+))?$/
  },
  async start (m) {
    // The id of the link is either in the path or in the query
    const linkId = m.path[1] ? m.path[1] : m.query[1];
    // Bypass all interstitial pages, cookie check is only made on page 1 and 2 :)
    const directLink = '/3-' + linkId;
    await $.openLink(directLink);
  },
});

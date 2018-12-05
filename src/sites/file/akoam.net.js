_.register({
  rule: {
    host: /^akoam\.net$/,
    path: /^\/download\/([^/]+)\//,
  },
  async start (m) {
    // the site's rule
    let data = await $.post(location.href, m.path[1]);
    try {
      data = JSON.parse(data);
    } catch (e) {
      _.warn('JSON error:', e);
      return;
    }
    await $.openLink(data.direct_link);
  },
});

_.register({
  rule: {
    host: /^akoam\.com$/,
    path: /^\/download\//,
  },
  async start () {
    // the site's rule
    const locationLink = location.hash;
    let data = await $.post(locationLink);
    try {
      data = JSON.parse(data);
    } catch (e) {
      _.warn('JSON error:', e);
      return;
    }
    await $.openLink(data.direct_link);
  },
});

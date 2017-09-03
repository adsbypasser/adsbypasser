_.register({
  rule: {
    host: /^akoam\.com$/,
    path: /^\/download\//,
  },
  async start () {
    // the site's rule
    const locationLink = location.hash;
    let data = await $.post(locationLink);
    data = _.parseJSON(data);
    if (!data.hash_data) {
      _.warn('rule changed');
      return;
    }
    await $.openLink(data.direct_link);
  },
});

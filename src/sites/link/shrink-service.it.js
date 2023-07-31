_.register({
  rule: {
    host: /^get\.shrink-service\.it$/,
    path: /^\/(.+)/,
  },
  async start (m) {
    await $.openLink(`//www.shrink-service.it/shrinked/${m.path[1]}`);
  },
});

_.register({
  rule: {
    host: /^www\.shrink-service\.it$/,
    path: /^\/btn\/(.+)/,
  },
  async ready (m) {

    const path_id = m.path[1];

    const API_URL = '//www.shrink-service.it/v3/api/prototype/init?req=init&uri=https://adshnk.com/'+path_id;

    let linkInfo = await $.get(API_URL, false, {
      Origin: _.none,
      Referer: _.none,
      // referrer must be here
      Cookie: 'referrer=1',
      'X-Requested-With': _.none,
    });
    linkInfo = JSON.parse(linkInfo);
    if (!linkInfo.success) {
      throw new $.AdsBypasserError('error when getting api information');
    }

    const urlInfo = JSON.parse(linkInfo['0'].metadata);
    if (urlInfo.url) {
      await $.openLink(urlInfo.url);
      return;
    }
  },
});

_.register({
  rule: {
    host: /^www\.shrink-service\.it$/,
    path: /^\/shrinked\//,
  },
  async ready () {
    const i = $('input[id][name]');
    await $.openLink(i.value);
  },
});

_.register({
  rule: {
    host: /^www\.shrink-service\.it$/,
    path: /^\/[se]\//,
  },
  async ready () {
    $.remove('iframe');
    const i = $('body > input[id][name]');
    $.openLink(i.value);
  },
});
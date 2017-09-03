_.register({
  rule: 'http://reffbux.com/refflinx/view/*',
  async ready () {
    $.remove('iframe');

    let m = $.searchFromScripts(/skip_this_ad_(\d+)_(\d+)/);
    const id = m[1];
    const share = m[2];
    const location = window.location.toString();

    const text = await $.post('http://reffbux.com/refflinx/register', {
      id: id,
      share: share,
      fp: 0,
      location: location,
      referer: '',
    });
    m = text.match(/'([^']+)'/);
    if (!m) {
      throw new _.AdsBypasserError('pattern changed');
    }
    await $.openLink(m[1]);
  },
});

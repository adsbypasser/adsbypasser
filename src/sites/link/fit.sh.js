_.register({
  rule: {
    host: /^fit\.sh$/,
  },
  async ready () {
    $.remove('.container-body');

    let m = $.searchFromScripts(/token="([^"]+)"/);
    if (!m) {
      throw new _.AdsBypasserError('site changed');
    }
    m = m[1];

    const interLink = '/go/' + m + '?fa=15466&a=' + window.location.hash.substr(1);

    await _.wait(6 * 1000);
    await $.openLink(interLink);
  },
});

_.register({
  rule: {
    host: /^(www\.)?adlot\.us$/,
  },
  async ready () {
    $.remove('iframe');

    const script = $.searchFromScripts('form');
    const p = /name='([^']+)' value='([^']+)'/g;
    const opt = {
      image: ' ',
    };
    let tmp = null;
    while ((tmp = p.exec(script))) {
      opt[tmp[1]] = tmp[2];
    }
    await $.openLink('', {
      path: opt,
    });
  },
});

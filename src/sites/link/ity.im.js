_.register({
  rule: {
    host: /^ity\.im$/,
  },
  async ready () {
    let f = $.$('#main');
    if (f) {
      await $.openLink(f.src);
      return;
    }

    [, , f] = _.find($.$$('frame'), (frame) => {
      if (frame.src.indexOf('interheader.php') < 0) {
        return _.none;
      }
      return frame.src;
    });
    if (f !== _.none) {
      await $.openLink(f);
      return;
    }

    f = $.searchFromScripts(/krypted=([^&]+)/);
    if (!f) {
      throw new _.AdsBypasserError('site changed');
    }
    f = f[1];
    const data = $.window.des('ksnslmtmk0v4Pdviusajqu', $.window.hexToString(f), 0, 0);
    if (data) {
      await $.openLink('http://ity.im/1104_21_50846_' + data);
    }
  },
});

_.register({
  rule: {
    host: [
      /^(www\.)?mirrorcreator\.com$/,
      /^(www\.)?mirrored\.to$/,
    ],
    path: /^\/downlink\//,
  },
  async ready () {
    let a = $.$('#redirectlink a');
    if (a) {
      await $.openLink(a.href);
      return;
    }

    a = $('#redirectlink > div.redirecturl');
    a = a.innerHTML;
    if (!a.match(/^http/)) {
      throw new _.AdsBypasserError('not a valid URL');
    }
    await $.openLink(a);
  },
});


_.register({
  rule: {
    host: [
      /^(www\.)?mirrorcreator\.com$/,
      /^(www\.)?mirrored\.to$/,
    ],
    path: /^\/files\//,
  },
  async ready () {
    const b = $('.downloadarea.downlinks form button');
    b.click();
  },
});

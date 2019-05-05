_.register({
  rule: {
    host: [
      /^(www\.)?mirrorcreator\.com$/,
      /^(www\.)?mirrored\.to$/,
    ],
    path: /^\/downlink\//,
  },
  async ready () {
    const a = $('.col-sm.centered.highlight a');
    await $.openLink(a.href);
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
    $('#dl_form').style.display = 'none';

    const res = $('#result');
    res.style.display = 'block';

    const o = new MutationObserver(() => {
      res.style.display = 'block'; //never hide me again
    });
    o.observe(res, {
      attributes: true,
    });

    await _.wait(1000);
    $.window.start();
  },
});

_.register({
  rule: {
    host: /^(www\.)?shorti\.ga$/,
    path: [
      /^\/\w+$/,
      /^\/url_redirector\.html$/,
    ],
  },
  async ready () {
    const f = $.$$('frame');

    // Find the right frame
    const [, v,] = _.find(f, (value) => {
      if (value.getAttribute('class')) {
        return _.none;
      }

      // Target frame has no class
      return 'Target frame found';
    });

    await $.openLink(v.src);
  },
});

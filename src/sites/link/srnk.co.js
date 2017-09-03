_.register({
  rule: {
    host: /^srnk\.co$/,
    path: /^\/i\//,
  },
  async ready () {
    const a = $.$('#btn-with-link');
    if (!a) {
      // recaptcha stage
      return;
    }

    const href = a.href;
    const method = a.dataset.method;
    if (method) {
      // waiting stage
      const csrfParam = $('meta[name="csrf-param"]').content;
      const csrfToken = $('meta[name="csrf-token"]').content;

      const form = document.createElement('form');
      form.method = 'post';
      form.action = href;
      let input = document.createElement('input');
      input.name = '_method';
      input.value = method;
      form.appendChild(input);
      input = document.createElement('input');
      input.name = csrfParam;
      input.value = csrfToken;
      form.appendChild(input);

      document.body.appendChild(form);
      form.submit();
      return;
    }

    // final stage
    const script = await $.post(location.pathname + '.js');
    const m = script.match(/const link = "([^"]+)";/);
    if (!m) {
      _.warn('script changed');
      return;
    }
    await $.openLink(m[1]);
  },
});

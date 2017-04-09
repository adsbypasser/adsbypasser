_.register({
  rule: {
    host: /^mirrorfilehost\.com$/,
  },
  async ready () {
    // seems need an interval to avoid looping
    await _.wait(3 * 1000);
    const frame = frames[0];
    const form = frame.document.createElement('form');
    form.target = '_parent';
    form.action = location.toString();
    const input = frame.document.createElement('input');
    input.value = 'Download';
    input.type = 'submit';
    form.appendChild(input);
    frame.document.body.appendChild(form);
    input.click();
  },
});

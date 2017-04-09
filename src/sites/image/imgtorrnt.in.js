_.register({
  rule: {
    host: /^imgtorrnt\.in$/,
    path: /^\/view\.php$/,
    query: /^\?id=.*/,
  },
  async ready () {
    const img = $('center div table.tg tbody tr td center img');
    await $.openImage(img.src);
  },
});

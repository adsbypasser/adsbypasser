_.register({
  rule: {
    host: /^(www\.)?leechbd\.tk$/,
    path: /^\/Shortener\/(\w+)$/,
  },
  async start (m) {
    const text = await $.get('/Shortener/API/read/get', {
      id: m.path[1],
      type: 'json',
    });
    const r = JSON.parse(text);
    if (r.success == true && r.data.full) {
      await $.openLink(r.data.full);
    } else {
      _.warn('API Error ' + r.error.code + ' : ' + r.error.msg);
    }
  },
});

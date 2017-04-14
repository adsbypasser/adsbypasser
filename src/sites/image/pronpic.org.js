_.register({
  rule: {
    host: /^pronpic\.org$/,
  },
  async ready () {
    const urlBaseImg = $('table.new_table2:nth-child(1) img.link');
    const baseUrl = urlBaseImg.src.split('th_')[0];
    const img = $('table.new_table2:nth-child(2) img.link');
    const url = baseUrl + img.src.split('th_')[1];
    await $.openImage(url);
  },
});

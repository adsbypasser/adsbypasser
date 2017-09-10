_.register({
  rule: {
    host: /^(www\.)?gallery(nova|sense)\.se$/,
    path: /^\/site\/v\//,
  },
  async ready () {
    const i = $('#myUniqueImg').parentNode;
    await $.openImage(i.href);
  },
});

_.register({
  rule: {
    host: /^(www\.)?gallerynova\.se$/,
    path: /^\/site\/viewImage\/(\w+)/,
  },
  async ready (m) {
    // Confirm value, seems to always be '0' yet, but we anyways get it in case it changes in the future.
    const confirm = $.searchFromScripts(/\$\("#confirmImage"\).val\("([^"]+)"\)/)[1];

    const rawJson = await $.post('/site/viewConfirmCode/' + m.path[1], {
      confirm,
    });
    // Good to know: the image is already present in the JSON as base64
    const json = JSON.parse(rawJson);

    // Allows to decode \n \t \r and other characters like this
    const decodedHTML = document.createTextNode(json.content).data;

    const imgURL = decodedHTML.match(/<a href="([^"]+)" target="_blank">/)[1];
    await $.openImage(imgURL);
  },
});

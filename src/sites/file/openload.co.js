_.register({
  rule: {
    host: [
      /^openload\.(co|pw)$/,
      /^openloed\.(co)$/,
      /^oload\.(stream|info|site|tv|win|download|cloud|cc|fun|club|live|space|services|network|life)$/,
      /^oladblock\.(services|xyz|me)$/,
    ],
    path: /^\/f\/.*/,
  },
  async start () {
    $.window.adblock = false;
    $.window.adblock2 = false;
    $.window.popAdsLoaded = true;
  },
  async ready () {
    await _.wait(500);

    const timer = $('#downloadTimer');
    timer.style.display = 'none';

    const dlCtn = $('#realdl');
    dlCtn.style.display = 'inline-block';

    const dlBtn = $('a', dlCtn);
    const ePath = $('#DtsBlkVFQx');
    dlBtn.href = '/stream/' + ePath.textContent;

    const videoCtn = $.$('.videocontainer');

    if (videoCtn) {
      const overlay = $('#videooverlay', videoCtn);
      overlay.click();

      // use iframe instead of $.openLink
      // in order to not affect streaming
      dlBtn.addEventListener('click', (evt) => {
        evt.preventDefault();

        // TODO *iframe* hack is not normal
        // please generalize in the future
        const iframe = document.createElement('iframe');
        iframe.src = dlBtn.href;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
      });

      _.info(`${window.location} -> ${dlBtn.href}`);

      dlBtn.click();
    } else {
      await $.openLink(dlBtn.href);
    }
  }
});

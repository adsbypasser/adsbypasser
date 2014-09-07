# IMPORTANT

This project has been renamed to [AdsBypasser](https://github.com/adsbypasser/adsbypasser).
No more new features will add in this script.
There are only bug fixes, **until the end of 2014**.

[New home page](https://adsbypasser.github.io/)

New mirrors:

* Greasy Fork {[full](https://greasyfork.org/scripts/4881-adsbypasser), [lite](https://greasyfork.org/scripts/4882-adsbypasserlite)}
* OpenUserJS.org {[full](https://openuserjs.org/scripts/legnaleurc/AdsBypasser), [lite](https://openuserjs.org/scripts/legnaleurc/AdsBypasserLite)}
* MonkeyGuts {[full](https://monkeyguts.com/code.php?id=439), [lite](https://monkeyguts.com/code.php?id=440)}


# NoPicAds

This user script helps you

* skip ads' count down page
* remove overlays over pictures
* prevent windows pop up

Forked from [RedirectionHelper] written by [SuYS].

Please install from [home page][1].

Mirrors:

* [Greasy Fork][2]
* [OpenUserJS.org][3]
* [MonkeyGuts][4]

[![Build Status][5]][6]


## Supported Sites

See [SITES.md](SITES.md)


## Run-time Configurations

Please see [this page][7] to adjust configurations.

* Align to center (default: on)

    Image will align to the center of screen.
    If you turn it off, **NoPicAds** will not adjust that for you.

* Change background (default: on)

    Image page will have a dark background, just like the theme used in
    Mozilla Firefox.
    If you turn it off, **NoPicAds** will not adjust that for you.

* Scale image (default: on)

    Image will scale to fit your screen size.
    You can still toggle the image size by clicking on the image.
    If you turn this off, **NoPicAds** will not adjust that for you.

* Redirect image (default: on)

    **NoPicAds** will directly open the image by browser if the
    current site is an image hosting site.
    If you turn this off, **NoPicAds** will only work on sites that shorten links.

* External server support (default: off)

    **NoPicAds** will send requests to an external server, because browser-side
    JavaScript can not solve some problems (e.g.: captcha).
    This is not enabled by default because of privacy concern.


## How To Build

Please install [Node.js] and [npm], then run:

```
npm install -g grunt-cli
npm install
grunt
```

Combined userscript will be `dest/nopicads.user.js`, which could install on
browser.

For more information, please see [Wiki].


[1]: https://legnaleurc.github.io/nopicads/
[2]: https://greasyfork.org/scripts/1209-nopicads
[3]: https://openuserjs.org/scripts/legnaleurc/FoolproofProject/NoPicAds
[4]: https://monkeyguts.com/code.php?id=124
[5]: https://travis-ci.org/legnaleurc/nopicads.png?branch=master,develop
[6]: https://travis-ci.org/legnaleurc/nopicads
[7]: https://legnaleurc.github.io/nopicads/configure.html
[Node.js]: http://nodejs.org/
[npm]: https://npmjs.org/
[RedirectionHelper]: http://userscripts.org/scripts/show/69797
[SuYS]: http://userscripts.org/users/SuYS
[Wiki]: https://github.com/legnaleurc/nopicads/wiki

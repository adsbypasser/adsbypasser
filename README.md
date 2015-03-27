# AdsBypasser

This user script helps you to

* skip ads' count-down or continue pages
* prevent windows popup

Forked from [RedirectionHelper] written by [SuYS].

Please install from [home page][1].

Mirrors:

* Greasy Fork [full][2], [lite][3]
* OpenUserJS.org [full][4], [lite][5]
* MonkeyGuts [full][6], [lite][7]

[![Build Status][8]][9]


## Supported Sites

See [SITES.md](SITES.md)


## Run-time Configurations

Please see [this page][10] to adjust configurations.

* Align to center (default: on)

    Image will align to the center of screen.
    If you turn it off, **AdsBypasser** will not adjust that for you.

* Change background (default: on)

    Image page will have a dark background, just like the theme used in
    Mozilla Firefox.
    If you turn it off, **AdsBypasser** will not adjust that for you.

* Scale image (default: on)

    Image will scale to fit your screen size.
    You can still toggle the image size by clicking on the image.
    If you turn this off, **AdsBypasser** will not adjust that for you.

* Redirect image (default: on)

    **AdsBypasser** will directly open the image by browser if the
    current site is an image hosting site.
    If you turn this off, **AdsBypasser** will only work on sites that shorten links.

* External server support (default: off)

    **AdsBypasser** will send requests to an external server, because browser-side
    JavaScript can not solve some problems (e.g.: captcha).
    This is not enabled by default because of privacy concern.


## How To Build

Please install [Node.js] and [npm], then run:

```
npm install
npm run build
```

Combined userscript will be `dest/adsbypasser.user.js`, which could install on
browser.

For more information, please see [Wiki].


[1]: https://adsbypasser.github.io/
[2]: https://greasyfork.org/scripts/4881-adsbypasser
[3]: https://greasyfork.org/scripts/4882-adsbypasserlite
[4]: https://openuserjs.org/scripts/legnaleurc/AdsBypasser
[5]: https://openuserjs.org/scripts/legnaleurc/AdsBypasserLite
[6]: https://monkeyguts.com/code.php?id=439
[7]: https://monkeyguts.com/code.php?id=440
[8]: https://travis-ci.org/adsbypasser/adsbypasser.png?branch=master,develop
[9]: https://travis-ci.org/adsbypasser/adsbypasser
[10]: https://adsbypasser.github.io/configure.html
[Node.js]: http://nodejs.org/
[npm]: https://npmjs.org/
[RedirectionHelper]: http://userscripts-mirror.org/scripts/show/69797
[SuYS]: http://userscripts-mirror.org/users/SuYS.html
[Wiki]: https://github.com/adsbypasser/adsbypasser/wiki

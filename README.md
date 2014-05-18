# NoPicAds

This user script helps you

* skip ads' count down page
* remove overlays over pictures
* prevent windows pop up

Forked from [RedirectionHelper] written by [SuYS].

[![Build Status][2]][3]


## Run-time Configurations

Please see [this page][4] to adjust configurations.

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


## Supported Sites

* adfly
    * ad7.biz
    * adf.acb.im
    * adf.animechiby.com
    * adf.ly
    * adf.sazlina.com
    * adf.tuhoctoan.net
    * adfly.itsrinaldo.net
    * adv.coder143.com
    * alien.apkmania.co
    * ay.gy
    * chathu.apkmania.co
    * david.nhachot.info
    * ddl.animesave.com
    * dl.apkpro.net
    * dl.nhachot.info
    * file.tamteo.com
    * gamecopyworld.com
    * go.nicoblog-games.com
    * go.phpnulledscripts.com
    * goto.adflytutor.com
    * j.gs
    * ksn.mx
    * n.shareme.in
    * q.gs
    * u.shareme.in
* linkbucks
    * allanalpass.com
    * amy.gs
    * any.gs
    * cash4files.com
    * deb.gs
    * drstickyfingers.com
    * dyo.gs
    * fapoff.com
    * filesonthe.net
    * freean.us
    * freegaysitepass.com
    * galleries.bz
    * goneviral.com
    * hornywood.tv
    * linkbabes.com
    * linkbucks.com
    * linkbucksmedia.com
    * megaline.co
    * miniurls.co
    * picbucks.com
    * poontown.net
    * qqc.co
    * rqq.co
    * seriousdeals.net
    * sexpalace.gs
    * theseblogs.com
    * theseforums.com
    * tinylinks.co
    * tnabucks.com
    * tubeviral.com
    * ultrafiles.net
    * urlbeat.net
    * whackyvidz.com
    * youfap.me
    * yyv.co
    * zff.co
* Mihalism Multi Host
    * 244pix.com
    * catpic.biz
    * dwimg.com
    * funextra.hostzi.com
    * hentai-hosting.com
    * imageback.info
    * imagecurl.com
    * imagecurl.org
    * imagepong.info
    * imagepremium.com
    * imageview.me
    * imgking.us
    * imgnip.com
    * imgsin.com
    * miragepics.com
    * nixhelp.de
    * overpic.net
    * pictureshoster.com
    * postimg.net
* reklama
    * bulkimg.info
    * croftimage.com
    * damimage.com
    * dragimage.org
    * gallerycloud.net
    * hotimages.eu
    * imagedecode.com
    * imageontime.com
    * img-zone.com
    * imgadult.com
    * imgcoin.net
    * imgfap.net
    * imgserve.net
    * imgstudio.org
    * myhotimage.com
    * pic.apollon-fervor.com
    * picstwist.com
    * zeljeimage.com
    * zonezeedimage.com
* imageporter
    * imagecarry.com
    * imagedunk.com
    * imageporter.com
    * imageswitch.com
    * imgspice.com
    * piclambo.net
    * picleet.com
    * picturedip.com
    * pictureturn.com
    * pixroute.com
    * yankoimages.net
* CF Image Host
    * d69.in
    * ghanaimages.co
    * images.woh.to
    * imgurban.info
    * mypixxx.lonestarnaughtygirls.com
    * x45x.info
* imgrill.com
    * 08lkk.com
    * hosturimage.com
    * imagecorn.com
    * imagefolks.com
    * imagepicsa.com
    * img.spicyzilla.com
    * imgcandy.net
    * imgcloud.co
    * imgcorn.com
    * imgmaster.net
    * imgnext.com
    * imgrill.com
    * imgsavvy.com
    * imgskull.info
    * imgtube.net
    * imgult.com
    * pixup.us
* picfox
    * amateurfreak.org
    * euro-pic.eu
    * freeimage.us
    * gratisimage.dk
    * images.maxigame.by
    * npicture.net
    * onlinepic.net
    * picfox.org
    * pixsor.com
* imgchili
    * imgchili.com
    * imgchili.net
* imgdino
    * imgdino.com
    * imgtiger.com
* hanimes
    * adultmove.info
    * h-animes.info
* abload
    * abload.de
    * fastpic.ru
    * imageup.ru
    * itmages.ru
* bc.vc
    * ad5.eu
    * adb.ug
    * adbla.us
    * adcrun.ch
    * adjet.eu
    * adtr.im
    * adwat.ch
    * bc.vc
    * cun.bz
    * fly2url.com
    * gx.si
    * hit.us
    * link.tl
    * miniurl.tk
    * myam.me
    * shortit.in
    * shrink.gs
    * ssl.gs
    * tl7.us
    * tr5.in
    * ultry.net
    * urlwiz.com
    * wwy.me
    * xafox.com
    * xip.ir
    * ysear.ch
    * zpoz.net
* coinurl
    * coinurl.com
    * cur.lv
* lnxlu
    * lnx.lu
    * url.fm
    * z.gs
* lnkco
    * lnk.co
    * rdlnk.co
    * reducelnk.com
* urlcash
    * bat5.com
    * celebclk.com
    * clb1.com
    * detonating.com
    * eightteen.com
    * looble.net
    * peekatmygirlfriend.com
    * pornyhost.com
    * smilinglinks.com
    * urlcash.com
    * urlcash.org
    * urlcash.net
    * urlgalleries.com
    * xxxs.org
* imagesnake
    * freebunker.com
    * imagefruit.com
    * imagesnake.com
* imagetwist
    * imagecherry.com
    * imagenpic.com
    * imagetwist.com
* b4he
    * b4he.com
    * fastpics.net
    * freeimgup.com
    * fullimg.com
    * ifap.co
* emptypix
    * emptypix.com
    * fotohosting.net
    * overdream.cz
* fotoo
    * fotoo.pl
    * fotoszok.pl
    * hornyimage.com
    * imagestime.com
* freakimage
    * freakimage.com
    * hostpic.org
* imagevenue
    * imagevenue.com
    * hotchyx.com
    * hostingfailov.com
* imgfantasy
    * imagedomino.com
    * imgfantasy.com
    * imgleech.com
    * imgsure.com
* imgbabes
    * imgbabes.com
    * imgflare.com
* cloudimg
    * cloudimg.net
    * imageheli.com
* urlcow
    * miniurl.com
    * urlcow.com
* cashfly
    * cf2.me
    * cf3.me
    * cf5.me
    * cf6.co
    * cf7.co
    * ex9.co
    * xt3.me
* 2i.cz
    * 2i.cz
    * 2i.sk
    * 2imgs.com
* pic2profit.com
    * pic2profit.com
    * picp2.com
* depic.me
    * depic.me
    * picamatic.com
* pic4you.ru
    * pic4you.ru
    * pic5you.ru
* buzurl.com
    * buzurl.com
    * vzturl.com
* easyurl.net
    * atu.ca
    * clickthru.ca
    * easyurl.net
    * goshrink.com
    * readthis.ca
    * redirects.ca
* sh.st
    * dh10thbvu.com
    * sh.st
    * u2ks.com
* seomafia.net
    * apploadz.ru
    * seomafia.net
* imagescream.com
    * anonpic.com
    * imagescream.com
    * picturevip.com
* shr77.com
    * cpv.acb.im
    * cpv.bz
    * shr44.com
    * shr55.com
    * shr77.com
* else
    * 01.nl
    * 1be.biz
    * 1pics.ru
    * 1tiny.net
    * 1to4.me
    * 2ty.cc
    * 3ra.be
    * 4fun.tw
    * 4owl.info
    * adfoc.us
    * adjet.biz
    * adlock.in
    * adlot.us
    * adv.li
    * ah-informatique.com
    * aka.gr
    * alabout.com
    * bayimg.com
    * beeimg.com
    * bild.me
    * bilder-hochladen.net
    * bilder-space.de
    * bilder-upload.eu
    * bildr.no
    * blackcatpix.com
    * casimages.com
    * cf.ly
    * cli.gs
    * coin-ads.com
    * comyonet.com
    * cubeupload.com
    * cyberpics.net
    * dapat.in
    * dd.ma
    * digitalfrenzy.net
    * directupload.net
    * dumppix.com
    * durl.me
    * filedump.net
    * filoops.info
    * fit.sh
    * fotolink.su
    * fotosik.pl
    * free.link2dollar.com
    * freeimagehosting.net
    * fundurl.com
    * funkyimg.com
    * gkurl.us
    * go2.me
    * goimagehost.com
    * hostingpics.net
    * hotshorturl.com
    * ibunker.us
    * ichan.org
    * ifotos.pl
    * ilix.in
    * ima.so
    * imadul.com
    * image18.org
    * image2you.ru
    * imagearn.com
    * imagebam.com
    * imageban.net
    * imageban.ru
    * imagehousing.com
    * imagenetz.de
    * imageno.com
    * imagepix.org
    * imageshack.us
    * imageshost.ru
    * imageupper.com
    * imagevau.eu
    * imagezilla.net
    * imagik.fr
    * img.3ezy.net
    * img.acianetmedia.com
    * img.deli.sh
    * img1.imagilive.com
    * img3x.net
    * imgbar.net
    * imgbin.me
    * imgbox.com
    * imgcarry.com
    * imgdollar.com
    * imgpaying.com
    * imgtheif.com
    * imgvault.pw
    * ipic.su
    * ity.im
    * javelite.tk
    * keptarolo.hu
    * kingofshrink.com
    * lienscash.com
    * link2you.ru
    * lix.in
    * lnk.in
    * lostpic.net
    * madlink.sk
    * mrjh.org
    * my-link.pro
    * noelshack.com
    * nsfw.in
    * nutshellurl.com
    * oxyl.me
    * p.pw
    * pic-money.ru
    * pic-upload.de
    * piccash.net
    * picmoe.net
    * pics-money.ru
    * picshare.geenza.com
    * pixhost.org
    * pixhub.eu
    * pixpal.net
    * postimg.org
    * preview.rlu.ru
    * prntscr.com
    * qrrro.com
    * ref.so
    * reffbux.com
    * richlink.com
    * rijaliti.info
    * riurl.com
    * robo.us
    * safeurl.eu
    * screenlist.ru
    * setlinks.us
    * sh.st
    * similarsites.com
    * stash-coins.com
    * subirimagenes.com
    * thinfi.com
    * tinyarrows.com
    * tinypic.com
    * turboimagehost.com
    * typ.me
    * ulmt.in
    * ultshare.com
    * unfake.it
    * url.ie
    * urlgator.com
    * urlinn.com
    * urlms.com
    * urlz.so
    * viidii.info
    * vir.al
    * vvcap.net
    * x.pixfarm.net
    * xlink.me
    * yep.it
    * yfrog.com
    * yooclick.com
    * zo.mu
    * zzz.gl


[2]: https://travis-ci.org/legnaleurc/nopicads.png?branch=master,develop
[3]: https://travis-ci.org/legnaleurc/nopicads
[4]: http://legnaleurc.github.io/nopicads/configure.html
[Node.js]: http://nodejs.org/
[npm]: https://npmjs.org/
[RedirectionHelper]: http://userscripts.org/scripts/show/69797
[SuYS]: http://userscripts.org/users/SuYS
[Wiki]: https://github.com/legnaleurc/nopicads/wiki

# How to Contribute

Before you create any issue or pull request, please read this guide carefully:

* **Please search existing issues first.**

    Avoid creating a duplicate issue. If the existing issue has been closed,
    you could reopen it.

* **One site, one issue.**

    Avoid to report multiple sites in an issue, except you are pretty sure they
    are similar.

* **Please provide an example link if possible.**

    By providing a link, we can speed up testing and developing.


## TL; DR

Welcome to submit any issue that you have, but it would be glad if you
have read sections below:

* [Bug Report](#bug-report)
* [Feature Request](#feature-request)
* [Pull Request](#pull-request)


## Bug Report

Please check your environment matches [Supported Platforms](https://github.com/adsbypasser/adsbypasser/wiki/Supported-Platforms).

Also please note that it is very hard to guarantee the compatibility to other
userscripts or browser extensions.

If other people can not reproduce your problem, you could create a new profile
and try again.

**Any new site request is not a bug.**

### Opening an issue to report a bug

Please describe your environment as detial as possible, such as:

1. What browser are you using?

    e.g.: Mozilla Firefox 23.0.1

2. What is your userscript manager?

    e.g.: GreaseMonkey 1.11

3. Are you using other similar userscripts to bypass ads as well?

4. What other extensions are you using? (notably NoScript or Ghostery)

5. What site are you browsing?

    e.g.: https://www.google.com/

6. How to reproduce this bug?

    e.g.: Visit the above site with other userscript installed
    (http://us.o/script/xxxxxx).

7. What went wrong?

    e.g.: It does not redirect.

8. What did you expect?

    e.g.: It should redirect properly.

The more information you provide, the easier the issue could be addressed.

## Feature Request

Any feature request is welcome but won't always be accepted.

### Opening an issue to request a feature

Typical feature types are:

* new site

    Please provide a sample link.

* new functionality

    Please explain why this is important to you.


## Pull Request

If it is a bug fix, please send to `master` branch. Any other types should send
to `develop` branch.

There is something you should keep in mind:

* coding style

    Especially indention, you should use an editor which supports vim's
    modeline feature.

* some sites use same system

    Such as *adf.ly*, *linkbucks.com*, *bc.vc* ... etc.
    If you can find an existing site which is homogeneous to your new site,
    simply update the URL rule instead of adding a new file.

* do not add multiple features in one commit

    Such pull request would be rejected. Please split them into different commits.

# How to Contribute

Before you create any issue or pull request, please read this guide carefully:

1. **Please search existing issues first.**

    Avoid to create a duplicate issue. If the issue has been closed, you can
    reopen it.

2. **One site, one issue.**

    Avoid to report multiple sites in an issue, except you are pretty sure they
    are similar.

3. **Please provide an example link if possible.**

    By providing a link, we can speed up testing and developing.


## Bug Report

Please note that it's very hard to guarantee the compatibility to other
userscripts or browser extensions.
If other people can not reproduce your problem, you could create a new profile
and try again.

**Any new site request is not a bug.** I can't fix a bug which does not exist
at all.

### Opening an issue to report a bug

Please describe your situation as detial as possible, such as:

1. What operating system are you using?

    e.g.: Mac OS 10.7

2. What browser are you using?

    e.g.: Mozilla Firefox 23.0.1

3. What userscript extension are you using? (e.g.: GreaseMonkey,
TamperMonkey ... etc.)

    e.g.: GreaseMonkey 1.11

4. What site are you browsing?

    e.g.: https://www.google.com/

5. How to reproduce this bug?

    e.g.: Visit the above site with other userscript installed
    (http://us.o/script/xxxxxx).

6. What went wrong?

    e.g.: It does not redirect.

7. What were you expected instead?

    e.g.: It should redirect properly.

The more information you give, the more easier to address the issue.


## Feature Request

Any feature request is welcome, but won't always be accepted.

### Opening an issue to request a feature

Typical feature types are:

1. new site

    Please provide a sample link.

2. new functionality

    Please explain why this is important to you.


## Pull Request

Please send pull requests to `develop` branch, or I will not accept them.

There is something you should keep in mind:

1. coding style

    Especially indention, I suggest you use an editor which supports vim's
    modeline feature.

2. some sites are using same system

    Such as *adf.ly*, *linkbucks.com*, *bc.vc* ... etc.
    If you can find an existing site which is homogeneous to your new site,
    simply update the url rule instead of add a new file.

3. do not add multiple feature in one commit

    I'll refuse to accept such pull request. Please split them into different
    commits.


## TL; DR

You could just submit whatever issues you like. I'll remind you to read this
guide should your issues don't satisfy the requirments.

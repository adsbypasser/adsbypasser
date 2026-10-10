---
layout: default
---

# Features

This userscript helps you:

* Skip countdown ads and continue pages.
* Prevent ad pop-up windows from opening.

It **CANNOT** solve reCAPTCHAs.

Feature requests and bug reports are welcome!
You can report issues or submit pull requests on [GitHub].

You can also configure some features on [this page][1]. See [here][5] for more
information.

# Nightly Builds

Nightly builds are automatically generated from the latest source code, so they
include the latest site fixes before the next release.
However, they are not reviewed like official releases and **may break things**.
If you encounter any issues, please report them on [GitHub] and include the
nightly build's version number.

* Installing a nightly build replaces the release build in your userscript
  manager, because both builds share the same name.
* Once installed, the nightly build keeps receiving updates from the nightly
  channel, even after a new release becomes available.
* To switch back to release builds, uninstall the nightly build first, then
  install the release build.

# Supported Platforms

Please see [this page][2] for a list of supported browsers and userscript
managers.

# Supported Sites

{% for site in site.data.sites -%}
* {{ site }}
{% endfor %}

# Contributors

Forked from [RedirectionHelper] written by [SuYS], and many thanks to our
[contributors](https://github.com/adsbypasser/adsbypasser/graphs/contributors).


[1]: https://adsbypasser.github.io/configure.html
[2]: https://github.com/adsbypasser/adsbypasser/wiki/Supported-Platforms
[5]: https://github.com/adsbypasser/adsbypasser/wiki/Runtime-Configurations
[RedirectionHelper]: https://userscripts-mirror.org/scripts/show/69797
[SuYS]: https://userscripts-mirror.org/users/SuYS.html
[GitHub]: https://github.com/adsbypasser/adsbypasser

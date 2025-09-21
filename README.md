# AdsBypasser

Install releases and read docs on the project's [Homepage](https://adsbypasser.github.io/).

---
## Build Status
[![Build Status](https://github.com/adsbypasser/adsbypasser/actions/workflows/unit-test.yaml/badge.svg)](https://github.com/adsbypasser/adsbypasser/actions)

---
## Features

- Skip countdowns and “continue” redirect pages where possible.
- Prevent common ad pop-up windows/overlays.
- Site-specific handlers for many domains (see `SITES.md`).
- Lightweight client-side userscript — no analytics or phoning home.
- **Does not** bypass reCAPTCHA or other interactive bot checks.

---
## Supported Sites & Platforms

See the full list of supported sites in [homepage](https://adsbypasser.github.io/) and platform notes in the [Wiki](https://github.com/adsbypasser/adsbypasser/wiki)
- If a site is missing or broken, please open an [Issue](https://github.com/adsbypasser/adsbypasser/issues) with a sample URL and reproduction steps.

---
## Installation

Recommended: install a userscript manager (Tampermonkey / Violentmonkey / Greasemonkey), then install from the homepage.
- Full edition and Lite edition are available on the [homepage](https://adsbypasser.github.io/).

---
## Runtime Configuration

AdsBypasser supports runtime configuration (enable/disable handlers, toggle auto-close).
- See the [configuration page](https://adsbypasser.github.io/configure.html) for details.

---
## Development / How to build

Requires Node.js.

```bash
git clone https://github.com/adsbypasser/adsbypasser.git
cd adsbypasser
npm install
npm run build
```

The combined userscript build (full edition) will be produced under:

```text
dist/adsbypasser.full.user.js
```

Use `npm run watch` if you want a dev watch mode.
- See the [Wiki](https://github.com/adsbypasser/adsbypasser/wiki) for build-chain and release instructions.

---
## Contributing

Contributions welcome: bug reports, issues, PRs, new site handlers.

When opening an issue for a broken/missing site handler, include:

- A reproducible example URL (or local HTML if protected).
- Browser + userscript manager + script version.
- Console errors and expected behaviour.

If you want help implementing a handler, tag the issue or PR and request guidance — maintainers/community can advise.

---
## Troubleshooting / FAQ

**Q:** Why doesn’t AdsBypasser bypass reCAPTCHA?
**A:** reCAPTCHA is an interactive bot check and intentionally not bypassed.

**Q:** AdsBypasser doesn’t work on a page — what now?
**A:** Open an issue with the URL, userscript version, browser and a short description; attach console output if available.

---
## Security & License

- Client-side userscript, no telemetry by default; review `dist/` before installing if concerned.
- Do not use to bypass payment walls or violate site terms of service.
- Licensed under the 'BSD 3-Clause License' — see [`LICENSE`](LICENSE.txt) in the repo.

---
## Acknowledgements

Forked from [RedirectionHelper](https://userscripts-mirror.org/scripts/show/69797) by [SuYS](https://userscripts-mirror.org/users/SuYS.html).

Thanks to contributors and maintainers.

REFACT:
# AdsBypasser

[![Build Status](https://github.com/adsbypasser/adsbypasser/actions/workflows/unit-test.yaml/badge.svg)](https://github.com/adsbypasser/adsbypasser/actions)

A lightweight userscript that automatically skips countdown ads, bypasses continue pages, and prevents ad pop-up windows on many supported sites.

Install releases and read docs on the project's [Homepage](https://adsbypasser.github.io/).

## Features

- ✅ Skip countdowns and "continue" redirect pages where possible
- ✅ Prevent common ad pop-up windows/overlays
- ✅ Site-specific handlers for many domains (see [Supported Sites](https://adsbypasser.github.io/))
- ✅ Lightweight client-side userscript — no analytics or phoning home
- ❌ Does **not** bypass reCAPTCHA or other interactive bot checks

## Supported Sites & Platforms

See the full list of supported sites on the [homepage](https://adsbypasser.github.io/) and platform notes in the [Wiki](https://github.com/adsbypasser/adsbypasser/wiki).

If a site is missing or broken, please open an [Issue](https://github.com/adsbypasser/adsbypasser/issues) with:
- A sample URL
- Browser + userscript manager + script version
- Console errors (if any)
- Steps to reproduce

## Installation

1. Install a userscript manager:
   - [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Firefox, Edge, Safari)
   - [Violentmonkey](https://violentmonkey.github.io/) (Chrome, Firefox, Edge)
   - [Greasemonkey](https://www.greasespot.net/) (Firefox)

2. Install AdsBypasser from the [homepage](https://adsbypasser.github.io/)

**Editions:**
- **Full edition**: Supports file hosting, link shorteners, and image hosting sites
- **Lite edition**: Supports file hosting and link shorteners only (smaller size)

## Runtime Configuration

AdsBypasser supports runtime configuration to enable/disable handlers and toggle auto-close features.

See the [configuration page](https://adsbypasser.github.io/configure.html) for details.

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20.19.0 or higher)
- [npm](https://www.npmjs.com/) (version 10.0.0 or higher)

### Building

```bash
git clone https://github.com/adsbypasser/adsbypasser.git
cd adsbypasser
npm install
npm run build
```

The built userscripts will be available in the `dist/` directory:
- `dist/adsbypasser.full.user.js` (Full edition)
- `dist/adsbypasser.lite.user.js` (Lite edition)

### Development Workflow

```bash
# Build once
npm run build

# Watch mode for development
npm run watch

# Run tests
npm test

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check code formatting
npm run format:check
```

See the [Wiki](https://github.com/adsbypasser/adsbypasser/wiki) for detailed build-chain and release instructions.

## Contributing

Contributions are welcome! We accept:
- Bug reports
- Feature requests
- Pull requests
- New site handlers

### Reporting Issues

When opening an issue for a broken/missing site handler, please include:

1. A reproducible example URL (or local HTML if protected)
2. Browser + userscript manager + script version
3. Console errors and expected behavior

### Adding Site Support

To add support for a new site:

1. Create a new file in `src/sites/{category}/{domain}.js`
2. Follow the pattern in existing site handlers
3. Add JSDoc comments with `@domain` annotations
4. Test your implementation

If you need help implementing a handler, tag the issue or PR and request guidance — maintainers and community members can advise.

## Troubleshooting

**Q: Why doesn't AdsBypasser bypass reCAPTCHA?**

A: reCAPTCHA is an interactive bot check and is intentionally not bypassed.

**Q: AdsBypasser doesn't work on a page — what now?**

A: Open an issue with the URL, userscript version, browser and a short description; attach console output if available.

**Q: How do I update the script?**

A: Userscript managers automatically update scripts. You can also manually check for updates in your manager's dashboard.

## Security & License

- Client-side userscript, no telemetry by default
- Review `dist/` before installing if you have security concerns
- Do not use to bypass payment walls or violate site terms of service
- See our [Security Policy](SECURITY.md) for reporting vulnerabilities
- Licensed under the BSD 3-Clause License — see [LICENSE.txt](LICENSE.txt)

## Acknowledgements

Forked from [RedirectionHelper](https://userscripts-mirror.org/scripts/show/69797) by [SuYS](https://userscripts-mirror.org/users/SuYS.html).

Thanks to all our [contributors](https://github.com/adsbypasser/adsbypasser/graphs/contributors).

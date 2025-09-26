# How to Contribute

Before creating any issue or pull request, please read this guide carefully.

* **Search existing issues first.**
  Avoid creating duplicates. If a similar issue has been closed, consider reopening it.

* **One site, one issue.**
  Report only one site per issue, unless you are certain they are related.

* **Provide an example link whenever possible.**
  A sample link helps speed up testing and development.

* **Use our issue templates.**
  We provide specific templates for bug reports, site requests, and site retirement requests to help you provide the right information.

---

## TL;DR

You are welcome to submit any issue, but it's appreciated if you review the sections below:

* [Bug Report](#bug-report)
* [Site Request](#site-request)
* [Site Retirement Request](#site-retirement-request)
* [Pull Request](#pull-request)

---

## Bug Report

Before submitting, ensure your environment matches [Supported Platforms](https://github.com/adsbypasser/adsbypasser/wiki/Supported-Platforms).

Compatibility with other userscripts or browser extensions cannot be guaranteed. If others cannot reproduce your problem, try creating a new browser profile.

**Note:** Requests for new sites should use the Site Request template, not the Bug Report template.

When creating a bug report, please:

1. **Use the Bug Report issue template** - This helps ensure you provide all necessary information
2. **Fill in the site domain in the title** - Replace "site-domain" in the title with the actual domain
3. **Provide a full link** - Include a complete URL where the issue occurs

### How to Report a Bug

Provide as much detail as possible:

1. **Browser:**
   e.g., Mozilla Firefox 23.0.1

2. **Userscript manager:**
   e.g., GreaseMonkey 1.11

3. **Other similar userscripts:**
   Are you running any other ad-bypass scripts?

4. **Other extensions:**
   Particularly NoScript, Ghostery, etc.

5. **Site being browsed:**
   e.g., https://www.google.com/

6. **Steps to reproduce the bug:**
   e.g., Visit the above site with other userscripts installed.

7. **What went wrong:**
   e.g., The redirect did not happen.

8. **Expected behavior:**
   e.g., The redirect should work properly.

The more information you provide, the easier it is to address the issue.

---

## Site Request

To request support for a new site:

1. **Use the Site Request issue template** - This helps ensure you provide all necessary information
2. **Fill in the site domain in the title** - Replace "site-domain" in the title with the actual domain
3. **Provide a full link** - Include a complete URL from the site

### How to Request a Site

* **New site:**
  Provide a sample link from the site you'd like supported.

---

## Site Retirement Request

If a previously supported site is no longer active:

1. **Use the Site Retirement Request issue template** - This helps ensure you provide all necessary information
2. **Fill in the site domain in the title** - Replace "site-domain" in the title with the actual domain

### How to Request Site Retirement

* **Inactive site:**
  Explain why the site should be removed (e.g., domain expired, site shut down).

---

## Pull Request

Send pull requests (PRs) to the `develop` branch.

Keep in mind:

* **Security considerations:**
  Review our [Security Policy](../SECURITY.md) before submitting code that might have security implications

* **Coding style:**
  We are using prettier to keep coding style consistant. There is a npm script to do this:
  ```sh
  npm run format
  ```

* **Commit Message:**
  Your pull request title will be the commit message.
  Please follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), and include the domain name in the title if possible.
  For example, to fix a site:
  ```
  fix: example.org

  Update selector ... etc.
  ```
  To add or remove a site:
  ```
  feat: example.com

  Remove dead site.
  ```
  We will use the commit messages to do semantic release.

* **Reusing existing rules:**
  Some sites share the same system (e.g., *adf.ly*, *linkbucks.com*, *bc.vc*).
  If your site is similar to an existing one, update the URL rule instead of creating a new file.

* **One feature per commit:**
  PRs adding multiple features in a single commit will be rejected. Split them into separate commits.

* **Test your changes:**
  Ensure your code works as expected and doesn't break existing functionality.

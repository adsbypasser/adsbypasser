# How to Contribute

Before creating any issue or pull request, please read this guide carefully.

* **Search existing issues first.**  
  Avoid creating duplicates. If a similar issue has been closed, consider reopening it.

* **One site, one issue.**  
  Report only one site per issue, unless you are certain they are related.

* **Provide an example link whenever possible.**  
  A sample link helps speed up testing and development.

---

## TL;DR

You are welcome to submit any issue, but it’s appreciated if you review the sections below:

* [Bug Report](#bug-report)  
* [Feature Request](#feature-request)  
* [Pull Request](#pull-request)

---

## Bug Report

Before submitting, ensure your environment matches [Supported Platforms](https://github.com/adsbypasser/adsbypasser/wiki/Supported-Platforms).

Compatibility with other userscripts or browser extensions cannot be guaranteed. If others cannot reproduce your problem, try creating a new browser profile.

**Note:** Requests for new sites are not considered bugs.

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

## Feature Request

All feature requests are welcome but may not always be accepted.

### How to Request a Feature

Typical types of feature requests:

* **New site:**  
  Provide a sample link.

* **New functionality:**  
  Explain why this feature is important.

---

## Pull Request

Send pull requests (PRs) to the `develop` branch.

Keep in mind:

* **Coding style:**  
  Follow consistent indentation. Using an editor with vim modeline support is recommended.

* **Reusing existing rules:**  
  Some sites share the same system (e.g., *adf.ly*, *linkbucks.com*, *bc.vc*).  
  If your site is similar to an existing one, update the URL rule instead of creating a new file.

* **One feature per commit:**  
  PRs adding multiple features in a single commit will be rejected. Split them into separate commits.

import { describe, expect, it } from "vitest";
import { ESLint, Linter } from "eslint";
import sites from "../build/eslint-plugin-sites.js";

const linter = new Linter();
const config = {
  plugins: { sites },
  rules: {
    "sites/sort-domains": "error",
    "sites/sort-hosts": "error",
  },
};
const fix = (source) => linter.verifyAndFix(source, config);

describe("site lint rules", () => {
  it("reports and fixes domain runs while preserving other tags and CRLF", () => {
    const source =
      "/**\r\n * @domain z.com\r\n * @domain a.com\r\n * @note Keep here\r\n * @domain y.com\r\n * @domain b.com\r\n */";
    expect(linter.verify(source, config)[0].ruleId).toBe("sites/sort-domains");
    expect(fix(source).output).toBe(
      source
        .replace("z.com\r\n * @domain a.com", "a.com\r\n * @domain z.com")
        .replace("y.com\r\n * @domain b.com", "b.com\r\n * @domain y.com"),
    );
  });

  it("sorts literal hosts and URL rules without changing layout or flags", () => {
    const source = `_.register({rule: {host: [\n  /^z$/i,\n  /^a$/,\n]}});
_.register({rule: ['https://z.com/*', 'https://a.com/*']});`;
    const result = fix(source);
    expect(result.output).toBe(
      source
        .replace("/^z$/i,\n  /^a$/", "/^a$/,\n  /^z$/i")
        .replace(
          "'https://z.com/*', 'https://a.com/*'",
          "'https://a.com/*', 'https://z.com/*'",
        ),
    );
    expect(result.messages).toEqual([]);
    expect(fix(result.output).fixed).toBe(false);
  });

  it("preserves dynamic entries, commented arrays, unrelated calls and regex contents", () => {
    const source = `const host = [/^z$/, /^a$/];
other.register({rule: {host: [/^z$/, /^a$/]}});
_['register']({rule: {host: [/^z$/, /^a$/]}});
_.register({rule: {host: [/^z$/, variable, /^a$/]}});
_.register({rule: {host: [/^z$/, /* explanation */ /^a$/]}});
_.register({rule: {host: /^(z|a)$/}});`;
    expect(fix(source).fixed).toBe(false);
    expect(linter.verify(source, config)).toEqual([]);
  });

  it("supports standard ESLint disable comments", () => {
    const source = `/* eslint-disable sites/sort-domains, sites/sort-hosts */
/**
 * @domain z.com
 * @domain a.com
 */
_.register({rule: {host: [/^z$/, /^a$/]}});`;
    expect(fix(source).fixed).toBe(false);
    expect(linter.verify(source, config)).toEqual([]);
  });

  it("enables sorting only for site sources", async () => {
    const eslint = new ESLint();
    const site = await eslint.calculateConfigForFile(
      "src/sites/image/example.js",
    );
    const library = await eslint.calculateConfigForFile("src/lib/example.js");
    expect(site.rules["sites/sort-domains"][0]).toBe(2);
    expect(site.rules["sites/sort-hosts"][0]).toBe(2);
    expect(library.rules["sites/sort-domains"]).toBeUndefined();
    expect(library.rules["sites/sort-hosts"]).toBeUndefined();
  });
});

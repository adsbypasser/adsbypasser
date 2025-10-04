/**
 * Unit tests for domain utility functions
 *
 * This file contains comprehensive tests for the domain utility functions
 * used in the AdsBypasser project. These functions handle domain validation,
 * extraction from various sources, and deduplication of root domains.
 */

import { describe, it, expect } from "vitest";
import {
  isValidDomain,
  extractDomainsFromContent,
  extractDomainsFromCommitMessage,
  deduplicateRootDomains,
} from "$build/lib/domain.js";

/**
 * Test suite for domain utility functions
 */
describe("domain", () => {
  /**
   * Test suite for domain validation
   *
   * The isValidDomain function validates domain name formats using
   * the parse-domain package with additional custom validation rules.
   */
  describe("isValidDomain", () => {
    /**
     * Test that valid domain formats are correctly identified
     */
    it("validates correct domain formats", () => {
      const validDomains = [
        "example.com",
        "sub.example.com",
        "test.co.uk",
        "a-b.com",
        "123.example.org",
        "very-long-subdomain.example.com",
      ];

      validDomains.forEach((domain) => {
        expect(isValidDomain(domain)).toBe(true);
      });
    });

    /**
     * Test that invalid domain formats are correctly rejected
     */
    it("rejects invalid domain formats", () => {
      const invalidDomains = [
        "invalid", // no TLD
        "bad..domain", // consecutive dots
        ".example.com", // starts with dot
        "example..com", // consecutive dots
        "example-.com", // hyphen before dot
        "-example.com", // starts with hyphen
        "example.com-", // ends with hyphen
        "", // empty string
        "a", // single character
        "a.", // single character with dot
        ".a", // dot with single character
        "a..b", // consecutive dots
        ".a.b", // starts with dot
        "a.b_c", // underscore not allowed
      ];

      invalidDomains.forEach((domain) => {
        expect(isValidDomain(domain)).toBe(false);
      });
    });

    /**
     * Test edge cases for domain validation
     */
    it("handles edge cases", () => {
      expect(isValidDomain("a.b")).toBe(true); // parse-domain considers this valid
      expect(isValidDomain("a.bc")).toBe(true); // valid 2-char TLD
      expect(isValidDomain("a.b-c")).toBe(true); // parse-domain allows hyphens in TLD
      expect(isValidDomain("a.b_c")).toBe(false); // underscore not allowed
    });
  });

  /**
   * Test suite for domain extraction from file content
   *
   * The extractDomainsFromContent function extracts domains from JSDoc
   * comments using @domain tags in source files.
   */
  describe("extractDomainsFromContent", () => {
    /**
     * Test extraction of domains from standard JSDoc comments
     */
    it("extracts domains from JSDoc comments", () => {
      const content = `
        /**
         * @domain example.com
         * @domain sub.example.org
         * Some other content
         */
        function test() {}

        /**
         * @domain another.com
         */
        function test2() {}
      `;

      const domains = extractDomainsFromContent(content);
      expect(domains).toEqual([
        "example.com",
        "sub.example.org",
        "another.com",
      ]);
    });

    /**
     * Test handling of multiple @domain tags in a single comment
     */
    it("handles multiple @domain tags in single comment", () => {
      const content = `
        /**
         * @domain first.com
         * @domain second.com
         * @domain third.com
         */
        function test() {}
      `;

      const domains = extractDomainsFromContent(content);
      expect(domains).toEqual(["first.com", "second.com", "third.com"]);
    });

    /**
     * Test that invalid domains are filtered out
     */
    it("filters out invalid domains", () => {
      const content = `
        /**
         * @domain valid.com
         * @domain invalid
         * @domain bad..domain
         * @domain another-valid.org
         */
        function test() {}
      `;

      const domains = extractDomainsFromContent(content);
      expect(domains).toEqual(["valid.com", "another-valid.org"]);
    });

    /**
     * Test handling of content without JSDoc comments
     */
    it("handles content without JSDoc comments", () => {
      const content = `
        function test() {
          console.log("no domains here");
        }
      `;

      const domains = extractDomainsFromContent(content);
      expect(domains).toEqual([]);
    });

    /**
     * Test handling of empty content
     */
    it("handles empty content", () => {
      const domains = extractDomainsFromContent("");
      expect(domains).toEqual([]);
    });

    /**
     * Test handling of malformed JSDoc comments
     */
    it("handles malformed JSDoc comments", () => {
      const content = `
        /* @domain valid.com */
        /**
         * @domain another-valid.com
         * @domain invalid
         */
        function test() {}
      `;

      const domains = extractDomainsFromContent(content);
      expect(domains).toEqual(["valid.com", "another-valid.com"]);
    });
  });

  /**
   * Test suite for domain extraction from commit messages
   *
   * The extractDomainsFromCommitMessage function extracts domains from
   * commit messages, specifically those following the "fix: domain" format.
   */
  describe("extractDomainsFromCommitMessage", () => {
    /**
     * Test extraction of domains from standard fix: commit messages
     */
    it("extracts domains from fix: commit messages", () => {
      const commitMessages = [
        "fix: example.com",
        "fix: sub.example.org",
        "fix: test.co.uk",
        "fix: a-b.com",
      ];

      commitMessages.forEach((message) => {
        const domains = extractDomainsFromCommitMessage(message);
        expect(domains).toHaveLength(1);
        expect(domains[0]).toBe(message.split(": ")[1]);
      });
    });

    /**
     * Test that only the first domain is extracted from commit messages
     */
    it("handles multiple domains in single commit message", () => {
      const message = "fix: example.com and sub.example.org";
      const domains = extractDomainsFromCommitMessage(message);
      expect(domains).toEqual(["example.com"]);
    });

    /**
     * Test that invalid domains are filtered out
     */
    it("filters out invalid domains", () => {
      const message = "fix: invalid";
      const domains = extractDomainsFromCommitMessage(message);
      expect(domains).toEqual([]);
    });

    /**
     * Test handling of non-fix commit messages
     */
    it("handles non-fix commit messages", () => {
      const messages = [
        "feat: add new feature",
        "chore: update dependencies",
        "docs: update README",
        "refactor: improve code",
      ];

      messages.forEach((message) => {
        const domains = extractDomainsFromCommitMessage(message);
        expect(domains).toEqual([]);
      });
    });

    /**
     * Test handling of empty or malformed commit messages
     */
    it("handles empty or malformed commit messages", () => {
      const messages = ["", "fix:", "fix: ", "not a commit message"];

      messages.forEach((message) => {
        const domains = extractDomainsFromCommitMessage(message);
        expect(domains).toEqual([]);
      });
    });

    /**
     * Test handling of commit messages with extra whitespace
     */
    it("handles commit messages with extra whitespace", () => {
      const message = "fix:   example.com   ";
      const domains = extractDomainsFromCommitMessage(message);
      expect(domains).toEqual(["example.com"]);
    });
  });

  /**
   * Test suite for domain deduplication
   *
   * The deduplicateRootDomains function removes duplicated root domains
   * from an array, keeping only the root domain when multiple subdomains
   * exist for the same root.
   */
  describe("deduplicateRootDomains", () => {
    /**
     * Test deduplication of subdomains to root domain
     */
    it("deduplicates subdomains to root domain", () => {
      const domains = [
        "www.example.org",
        "xxx.example.org",
        "yyy.example.org",
        "zzz.example.org",
      ];
      const result = deduplicateRootDomains(domains);
      expect(result).toEqual(["example.org"]);
    });

    /**
     * Test that root domain is preferred when it exists
     */
    it("prefers root domain when it exists", () => {
      const domains = ["example.com", "www.example.com", "api.example.com"];
      const result = deduplicateRootDomains(domains);
      expect(result).toEqual(["example.com"]);
    });

    /**
     * Test handling of only subdomains by returning root domain
     */
    it("handles only subdomains by returning root domain", () => {
      const domains = ["www.example.com", "api.example.com", "sub.example.com"];
      const result = deduplicateRootDomains(domains);
      expect(result).toEqual(["example.com"]);
    });

    /**
     * Test handling of mixed domains correctly
     */
    it("handles mixed domains correctly", () => {
      const domains = [
        "www.example.com",
        "example.com",
        "api.example.com",
        "test.org",
        "sub.test.org",
      ];
      const result = deduplicateRootDomains(domains);
      expect(result).toEqual(["example.com", "test.org"]);
    });

    /**
     * Test handling of single domains
     */
    it("handles single domains", () => {
      const domains = ["example.com"];
      const result = deduplicateRootDomains(domains);
      expect(result).toEqual(["example.com"]);
    });

    /**
     * Test handling of multiple unrelated domains
     */
    it("handles multiple unrelated domains", () => {
      const domains = ["example.com", "test.org", "another.net"];
      const result = deduplicateRootDomains(domains);
      expect(result).toEqual(["another.net", "example.com", "test.org"]);
    });

    /**
     * Test that invalid domains are filtered out
     */
    it("filters out invalid domains", () => {
      const domains = [
        "www.example.com",
        "invalid",
        "test.org",
        "bad..domain",
        "api.example.com",
      ];
      const result = deduplicateRootDomains(domains);
      expect(result).toEqual(["example.com", "test.org"]);
    });

    /**
     * Test handling of empty array
     */
    it("handles empty array", () => {
      const result = deduplicateRootDomains([]);
      expect(result).toEqual([]);
    });

    /**
     * Test handling of domains with different TLDs
     */
    it("handles domains with different TLDs", () => {
      const domains = [
        "www.example.com",
        "api.example.org",
        "test.example.net",
        "sub.example.co.uk",
      ];
      const result = deduplicateRootDomains(domains);
      expect(result).toEqual([
        "example.co.uk",
        "example.com",
        "example.net",
        "example.org",
      ]);
    });

    /**
     * Test handling of complex subdomain structures
     */
    it("handles complex subdomain structures", () => {
      const domains = [
        "a.b.example.com",
        "c.d.example.com",
        "example.com",
        "e.f.example.com",
      ];
      const result = deduplicateRootDomains(domains);
      expect(result).toEqual(["example.com"]);
    });
  });

  /**
   * Integration tests for domain functions
   *
   * These tests verify that the domain functions work correctly together
   * in real-world scenarios.
   */
  describe("integration tests", () => {
    /**
     * Test with real-world JSDoc content
     */
    it("works with real-world JSDoc content", () => {
      const content = `
        /**
         * Site handler for example.com
         * @domain example.com
         * @domain www.example.com
         * @domain m.example.com
         */
        function handleExample() {
          // implementation
        }

        /**
         * Another handler
         * @domain test.org
         */
        function handleTest() {
          // implementation
        }
      `;

      const domains = extractDomainsFromContent(content);
      expect(domains).toEqual([
        "example.com",
        "www.example.com",
        "m.example.com",
        "test.org",
      ]);
    });

    /**
     * Test with real-world commit messages
     */
    it("works with real-world commit messages", () => {
      const commits = [
        "fix: example.com - resolve timeout issue",
        "feat: add new site handler",
        "fix: sub.example.org - update selector",
        "chore: update dependencies",
      ];

      const allDomains = commits.flatMap(extractDomainsFromCommitMessage);
      expect(allDomains).toEqual(["example.com", "sub.example.org"]);
    });

    /**
     * Test consistent validation across functions
     */
    it("validates domains consistently across functions", () => {
      const testDomains = ["example.com", "invalid", "bad..domain"];

      testDomains.forEach((domain) => {
        const isValid = isValidDomain(domain);

        // Test with JSDoc content
        const jsdocContent = `/** @domain ${domain} */`;
        const jsdocDomains = extractDomainsFromContent(jsdocContent);
        expect(jsdocDomains.length > 0).toBe(isValid);

        // Test with commit message
        const commitMessage = `fix: ${domain}`;
        const commitDomains = extractDomainsFromCommitMessage(commitMessage);
        expect(commitDomains.length > 0).toBe(isValid);
      });
    });

    /**
     * Test deduplication in real-world scenarios
     */
    it("works with deduplication in real-world scenarios", () => {
      // Simulate extracting domains from multiple site files
      const siteDomains = [
        "www.example.com",
        "api.example.com",
        "example.com",
        "www.test.org",
        "sub.test.org",
        "another.net",
      ];

      const deduplicated = deduplicateRootDomains(siteDomains);
      expect(deduplicated).toEqual(["another.net", "example.com", "test.org"]);
    });
  });
});

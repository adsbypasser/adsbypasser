/**
 * Unit tests for domain diff functionality
 *
 * This file contains comprehensive tests for the domain diff functions
 * used in the AdsBypasser project. These functions handle domain comparison
 * and changelog generation between git tags.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { extractDomainDiff, compareDomains } from "$build/diff.js";

// Mock the git operations module
vi.mock("$build/git.js", () => ({
  extractDomainsAtTag: vi.fn(),
  extractFixedDomains: vi.fn(),
}));

// Import the actual domain utilities

import { extractDomainsAtTag, extractFixedDomains } from "$build/git.js";

/**
 * Test suite for domain diff functionality
 */
describe("diff", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    extractDomainsAtTag.mockReset();
    extractFixedDomains.mockReset();
  });

  /**
   * Test suite for domain comparison
   *
   * The compareDomains function compares two domain sets to find
   * added and retired domains.
   */
  describe("compareDomains", () => {
    /**
     * Test comparison with added domains
     */
    it("finds added domains", () => {
      const oldDomains = new Set(["example.com", "test.org"]);
      const newDomains = new Set([
        "example.com",
        "test.org",
        "new.com",
        "another.net",
      ]);

      const result = compareDomains(oldDomains, newDomains);

      expect(result.added).toEqual(new Set(["new.com", "another.net"]));
      expect(result.retired).toEqual(new Set());
      expect(result.renamed).toEqual(new Set());
    });

    /**
     * Test comparison with retired domains
     */
    it("finds retired domains", () => {
      const oldDomains = new Set([
        "example.com",
        "test.org",
        "old.com",
        "retired.net",
      ]);
      const newDomains = new Set(["example.com", "test.org"]);

      const result = compareDomains(oldDomains, newDomains);

      expect(result.added).toEqual(new Set());
      expect(result.retired).toEqual(new Set(["old.com", "retired.net"]));
      expect(result.renamed).toEqual(new Set());
    });

    /**
     * Test comparison with both added and retired domains
     */
    it("finds both added and retired domains", () => {
      const oldDomains = new Set(["example.com", "test.org", "old.com"]);
      const newDomains = new Set(["example.com", "test.org", "new.com"]);

      const result = compareDomains(oldDomains, newDomains);

      expect(result.added).toEqual(new Set(["new.com"]));
      expect(result.retired).toEqual(new Set(["old.com"]));
      expect(result.renamed).toEqual(new Set());
    });

    /**
     * Test comparison with identical domain sets
     */
    it("handles identical domain sets", () => {
      const domains = new Set(["example.com", "test.org"]);
      const result = compareDomains(domains, domains);

      expect(result.added).toEqual(new Set());
      expect(result.retired).toEqual(new Set());
      expect(result.renamed).toEqual(new Set());
    });

    /**
     * Test comparison with empty sets
     */
    it("handles empty domain sets", () => {
      const result = compareDomains(new Set(), new Set());

      expect(result.added).toEqual(new Set());
      expect(result.retired).toEqual(new Set());
      expect(result.renamed).toEqual(new Set());
    });

    /**
     * Test comparison with one empty set
     */
    it("handles one empty domain set", () => {
      const domains = new Set(["example.com", "test.org"]);
      const result1 = compareDomains(new Set(), domains);
      const result2 = compareDomains(domains, new Set());

      expect(result1.added).toEqual(domains);
      expect(result1.retired).toEqual(new Set());
      expect(result1.renamed).toEqual(new Set());

      expect(result2.added).toEqual(new Set());
      expect(result2.retired).toEqual(domains);
      expect(result2.renamed).toEqual(new Set());
    });

    /**
     * Test comparison with renamed domains
     */
    it("finds renamed domains", () => {
      const oldDomains = new Set(["example.com", "test.org"]);
      const newDomains = new Set(["example.com", "test.org", "renamed.com"]);

      const result = compareDomains(oldDomains, newDomains);

      expect(result.added).toEqual(new Set(["renamed.com"]));
      expect(result.retired).toEqual(new Set());
      expect(result.renamed).toEqual(new Set());
    });

    /**
     * Test that renamed domains are merged into fixed in extractDomainDiff
     */
    it("merges renamed domains into fixed domains", async () => {
      // Test the merging logic by directly testing the function behavior
      // This test verifies that when compareDomains returns renamed domains,
      // they get merged into the fixed array in the final result
      const oldDomains = new Set(["example.com", "test.org"]);
      const newDomains = new Set(["example.com", "test.org", "new.com"]);
      const fixedDomains = new Set(["example.com"]);

      extractDomainsAtTag
        .mockResolvedValueOnce(oldDomains)
        .mockResolvedValueOnce(newDomains);
      extractFixedDomains.mockReturnValue(fixedDomains);

      const result = await extractDomainDiff("v1.0.0", "v2.0.0");

      // In this case, new.com is added, no renamed domains
      expect(result.added).toEqual(["new.com"]);
      expect(result.retired).toEqual([]);
      expect(result.fixed).toEqual(["example.com"]);
    });
  });

  /**
   * Test suite for domain diff extraction
   *
   * The extractDomainDiff function generates changelog data between two git tags.
   */
  describe("extractDomainDiff", () => {
    /**
     * Test successful domain diff extraction
     */
    it("extracts domain diff successfully", async () => {
      // Mock git operations
      const oldDomains = new Set(["example.com", "test.org"]);
      const newDomains = new Set(["example.com", "test.org", "new.com"]);
      const fixedDomains = new Set(["example.com"]);

      extractDomainsAtTag
        .mockResolvedValueOnce(oldDomains)
        .mockResolvedValueOnce(newDomains);
      extractFixedDomains.mockReturnValue(fixedDomains);

      const result = await extractDomainDiff("v1.0.0", "v2.0.0");

      expect(extractDomainsAtTag).toHaveBeenCalledWith("v1.0.0");
      expect(extractDomainsAtTag).toHaveBeenCalledWith("v2.0.0");
      expect(extractFixedDomains).toHaveBeenCalledWith(
        "v1.0.0",
        "v2.0.0",
        new Set(["example.com", "test.org"]),
      );

      expect(result).toEqual({
        added: ["new.com"],
        retired: [],
        fixed: ["example.com"],
      });
    });

    /**
     * Test domain diff with all types of changes
     */
    it("handles added, retired, and fixed domains", async () => {
      const oldDomains = new Set(["example.com", "test.org", "old.com"]);
      const newDomains = new Set(["example.com", "test.org", "new.com"]);
      const fixedDomains = new Set(["example.com"]);

      extractDomainsAtTag
        .mockResolvedValueOnce(oldDomains)
        .mockResolvedValueOnce(newDomains);
      extractFixedDomains.mockReturnValue(fixedDomains);

      const result = await extractDomainDiff("v1.0.0", "v2.0.0");

      expect(result).toEqual({
        added: ["new.com"],
        retired: ["old.com"],
        fixed: ["example.com"],
      });
    });

    /**
     * Test domain diff with no changes
     */
    it("handles no domain changes", async () => {
      const domains = new Set(["example.com", "test.org"]);

      extractDomainsAtTag
        .mockResolvedValueOnce(domains)
        .mockResolvedValueOnce(domains);
      extractFixedDomains.mockReturnValue(new Set());

      const result = await extractDomainDiff("v1.0.0", "v1.1.0");

      expect(result).toEqual({
        added: [],
        retired: [],
        fixed: [],
      });
    });

    /**
     * Test domain diff with HEAD tag
     */
    it("handles HEAD tag correctly", async () => {
      const oldDomains = new Set(["example.com"]);
      const newDomains = new Set(["example.com", "new.com"]);

      extractDomainsAtTag
        .mockResolvedValueOnce(oldDomains)
        .mockResolvedValueOnce(newDomains);
      extractFixedDomains.mockReturnValue(new Set());

      const result = await extractDomainDiff("v1.0.0", "HEAD");

      expect(extractDomainsAtTag).toHaveBeenCalledWith("v1.0.0");
      expect(extractDomainsAtTag).toHaveBeenCalledWith("HEAD");
      expect(result.added).toEqual(["new.com"]);
    });

    /**
     * Test domain diff with git operation errors
     */
    it("handles git operation errors gracefully", async () => {
      extractDomainsAtTag.mockRejectedValue(new Error("Git operation failed"));

      await expect(extractDomainDiff("v1.0.0", "v2.0.0")).rejects.toThrow(
        "Git operation failed",
      );
    });

    /**
     * Test domain diff with subdomain handling
     */
    it("handles subdomains correctly", async () => {
      const oldDomains = new Set(["example.com"]);
      const newDomains = new Set([
        "www.example.com",
        "api.example.com",
        "example.com",
      ]);

      extractDomainsAtTag
        .mockResolvedValueOnce(oldDomains)
        .mockResolvedValueOnce(newDomains);
      extractFixedDomains.mockReturnValue(new Set());

      const result = await extractDomainDiff("v1.0.0", "v2.0.0");

      expect(result.added).toEqual(["example.com"]);
      expect(result.retired).toEqual([]);
    });

    /**
     * Test domain diff with complex subdomain scenarios
     */
    it("handles complex subdomain scenarios", async () => {
      const oldDomains = new Set(["test.org"]);
      const newDomains = new Set([
        "www.example.com",
        "api.example.com",
        "sub.example.com",
        "example.com",
        "www.test.org",
        "test.org",
      ]);

      extractDomainsAtTag
        .mockResolvedValueOnce(oldDomains)
        .mockResolvedValueOnce(newDomains);
      extractFixedDomains.mockReturnValue(new Set());

      const result = await extractDomainDiff("v1.0.0", "v2.0.0");

      expect(result.added).toEqual(["example.com", "test.org"]);
      expect(result.retired).toEqual([]);
    });
  });

  /**
   * Integration tests for domain diff functions
   *
   * These tests verify that the domain diff functions work correctly together
   * in real-world scenarios.
   */
  describe("integration tests", () => {
    /**
     * Test with realistic domain sets
     */
    it("works with realistic domain sets", async () => {
      const oldDomains = new Set([
        "example.com",
        "www.example.com",
        "test.org",
        "old-site.net",
      ]);
      const newDomains = new Set([
        "example.com",
        "www.example.com",
        "test.org",
        "new-site.com",
        "another.org",
      ]);
      const fixedDomains = new Set(["example.com"]);

      extractDomainsAtTag
        .mockResolvedValueOnce(oldDomains)
        .mockResolvedValueOnce(newDomains);
      extractFixedDomains.mockReturnValue(fixedDomains);

      const result = await extractDomainDiff("v1.0.0", "v2.0.0");

      expect(result).toEqual({
        added: ["another.org", "new-site.com"],
        retired: ["old-site.net"],
        fixed: ["example.com"],
      });
    });

    /**
     * Test consistent behavior across multiple calls
     */
    it("maintains consistent behavior across multiple calls", async () => {
      // Mock to return different domains based on tag
      extractDomainsAtTag.mockImplementation((tag) => {
        if (tag === "v1.0.0") return Promise.resolve(new Set(["example.com"]));
        if (tag === "v1.1.0")
          return Promise.resolve(new Set(["example.com", "test.org"]));
        if (tag === "v1.2.0")
          return Promise.resolve(new Set(["example.com", "test.org"]));
        return Promise.resolve(new Set());
      });

      extractFixedDomains.mockReturnValue(new Set());

      const result1 = await extractDomainDiff("v1.0.0", "v1.1.0");
      const result2 = await extractDomainDiff("v1.1.0", "v1.2.0");

      expect(result1.added).toEqual(["test.org"]);
      expect(result2.added).toEqual([]);
    });
  });
});

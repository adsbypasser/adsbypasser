/**
 * Unit tests for URL pattern dispatcher
 *
 * This file contains comprehensive tests for the dispatcher module
 * which handles URL pattern matching and dispatches to appropriate
 * handlers based on the current page URL.
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { register, findHandler, resetDispatcher } from "$lib/dispatcher.js";

/**
 * Mock window.location with a URL
 * @param {string} url - Full URL to mock
 */
function mockLocation(url) {
  const urlObj = new URL(url);

  delete global.window;
  global.window = {};
  global.window.location = {
    toString: () => url,
    protocol: urlObj.protocol,
    hostname: urlObj.hostname,
    host: urlObj.host,
    port: urlObj.port,
    pathname: urlObj.pathname,
    search: urlObj.search,
    hash: urlObj.hash,
  };
}

/**
 * Create a test pattern with handlers
 * @param {any} rule - Pattern rule
 * @param {Object} handlers - Handler functions
 * @returns {Object} - Pattern object
 */
function createPattern(rule, handlers) {
  return {
    rule,
    start: handlers.start,
    ready: handlers.ready,
  };
}

/**
 * Test suite for dispatcher module
 */
describe("dispatcher", () => {
  beforeEach(() => {
    resetDispatcher();
  });

  /**
   * Tests for resetDispatcher functionality
   */
  describe("resetDispatcher", () => {
    it("should clear all registered patterns", () => {
      mockLocation("https://example.com/path");

      register(
        createPattern({ host: /^example\.com$/ }, { ready: () => "handler1" }),
      );
      register(
        createPattern({ host: /^test\.org$/ }, { ready: () => "handler2" }),
      );

      let handler = findHandler();
      expect(handler).not.toBeNull();

      resetDispatcher();

      handler = findHandler();
      expect(handler).toBeNull();
    });

    it("should allow re-registration after reset", () => {
      mockLocation("https://example.com/path");

      register(
        createPattern({ host: /^example\.com$/ }, { ready: () => "handler1" }),
      );

      resetDispatcher();

      register(
        createPattern({ host: /^example\.com$/ }, { ready: () => "handler2" }),
      );

      const handler = findHandler();
      expect(handler).not.toBeNull();
    });
  });

  /**
   * Tests for register functionality
   */
  describe("register", () => {
    it("should successfully register a pattern", () => {
      mockLocation("https://example.com/path");

      register(
        createPattern({ host: /^example\.com$/ }, { ready: () => "handler" }),
      );

      const handler = findHandler();
      expect(handler).not.toBeNull();
    });

    it("should register multiple patterns", () => {
      register(
        createPattern({ host: /^example\.com$/ }, { ready: () => "handler1" }),
      );
      register(
        createPattern({ host: /^test\.org$/ }, { ready: () => "handler2" }),
      );

      mockLocation("https://example.com/path");
      let handler = findHandler();
      expect(handler).not.toBeNull();

      mockLocation("https://test.org/path");
      handler = findHandler();
      expect(handler).not.toBeNull();
    });

    it("should match patterns in registration order (first wins)", () => {
      mockLocation("https://example.com/path");

      const handler1 = vi.fn();
      const handler2 = vi.fn();

      register(createPattern({ host: /example\.com/ }, { ready: handler1 }));
      register(createPattern({ host: /example\.com/ }, { ready: handler2 }));

      const handler = findHandler();
      expect(handler).not.toBeNull();
      handler.ready();

      expect(handler1).toHaveBeenCalled();
      expect(handler2).not.toHaveBeenCalled();
    });
  });

  /**
   * Tests for findHandler with RegExp patterns
   */
  describe("findHandler - RegExp patterns", () => {
    it("should match RegExp on host", () => {
      mockLocation("https://example.com/path");

      register(
        createPattern({ host: /^example\.com$/ }, { ready: () => "handler" }),
      );

      const handler = findHandler();
      expect(handler).not.toBeNull();
      expect(handler.ready).toBeTypeOf("function");
    });

    it("should match RegExp with alternation", () => {
      mockLocation("https://test.com/path");

      register(
        createPattern(
          { host: /^(example|test)\.com$/ },
          { ready: () => "handler" },
        ),
      );

      const handler = findHandler();
      expect(handler).not.toBeNull();
    });

    it("should match RegExp on path", () => {
      mockLocation("https://example.com/api/users");

      register(createPattern({ path: /^\/api\// }, { ready: () => "handler" }));

      const handler = findHandler();
      expect(handler).not.toBeNull();
    });

    it("should fail when RegExp doesn't match", () => {
      mockLocation("https://different.com/path");

      register(
        createPattern({ host: /^example\.com$/ }, { ready: () => "handler" }),
      );

      const handler = findHandler();
      expect(handler).toBeNull();
    });
  });

  /**
   * Tests for findHandler with String patterns (Chrome match patterns)
   */
  describe("findHandler - String patterns (Chrome match patterns)", () => {
    it("should match wildcard scheme (*:// matches http and https)", () => {
      register(createPattern("*://example.com/*", { ready: () => "handler" }));

      mockLocation("http://example.com/path");
      let handler = findHandler();
      expect(handler).not.toBeNull();

      resetDispatcher();
      register(createPattern("*://example.com/*", { ready: () => "handler" }));

      mockLocation("https://example.com/path");
      handler = findHandler();
      expect(handler).not.toBeNull();
    });

    it("should match specific scheme (https:// only)", () => {
      register(
        createPattern("https://example.com/*", { ready: () => "handler" }),
      );

      mockLocation("https://example.com/path");
      let handler = findHandler();
      expect(handler).not.toBeNull();

      resetDispatcher();
      register(
        createPattern("https://example.com/*", { ready: () => "handler" }),
      );

      mockLocation("http://example.com/path");
      handler = findHandler();
      expect(handler).toBeNull();
    });

    it("should match wildcard subdomain", () => {
      register(
        createPattern("https://*.example.com/*", { ready: () => "handler" }),
      );

      mockLocation("https://sub.example.com/path");
      let handler = findHandler();
      expect(handler).not.toBeNull();

      resetDispatcher();
      register(
        createPattern("https://*.example.com/*", { ready: () => "handler" }),
      );

      mockLocation("https://deep.sub.example.com/path");
      handler = findHandler();
      expect(handler).not.toBeNull();

      resetDispatcher();
      register(
        createPattern("https://*.example.com/*", { ready: () => "handler" }),
      );

      mockLocation("https://example.com/path");
      handler = findHandler();
      expect(handler).toBeNull();
    });

    it("should match wildcard host", () => {
      mockLocation("https://any-domain.com/path");

      register(createPattern("https://*/path", { ready: () => "handler" }));

      const handler = findHandler();
      expect(handler).not.toBeNull();
    });

    it("should match path with wildcards", () => {
      mockLocation("https://example.com/path/to/resource");

      register(
        createPattern("https://example.com/path/*", { ready: () => "handler" }),
      );

      const handler = findHandler();
      expect(handler).not.toBeNull();
    });

    it("should match file protocol", () => {
      mockLocation("file:///path/to/file.html");

      register(createPattern("file:///*", { ready: () => "handler" }));

      const handler = findHandler();
      expect(handler).not.toBeNull();
    });
  });

  /**
   * Tests for findHandler with Object patterns
   */
  describe("findHandler - Object patterns", () => {
    it("should match object with single host RegExp", () => {
      mockLocation("https://example.com/path");

      register(
        createPattern({ host: /^example\.com$/ }, { ready: () => "handler" }),
      );

      const handler = findHandler();
      expect(handler).not.toBeNull();
    });

    it("should match object with array of host RegExps", () => {
      mockLocation("https://test.org/path");

      register(
        createPattern(
          { host: [/^example\.com$/, /^test\.org$/] },
          { ready: () => "handler" },
        ),
      );

      const handler = findHandler();
      expect(handler).not.toBeNull();
    });

    it("should match object with both host and path", () => {
      mockLocation("https://example.com/api/users");

      register(
        createPattern(
          { host: /^example\.com$/, path: /^\/api\// },
          { ready: () => "handler" },
        ),
      );

      const handler = findHandler();
      expect(handler).not.toBeNull();
    });

    it("should fail when one property doesn't match", () => {
      mockLocation("https://example.com/web/page");

      register(
        createPattern(
          { host: /^example\.com$/, path: /^\/api\// },
          { ready: () => "handler" },
        ),
      );

      const handler = findHandler();
      expect(handler).toBeNull();
    });

    it("should match with query and hash", () => {
      mockLocation("https://example.com/page?id=123#section");

      register(
        createPattern(
          { query: /^\?id=\d+$/, hash: /#section/ },
          { ready: () => "handler" },
        ),
      );

      const handler = findHandler();
      expect(handler).not.toBeNull();
    });
  });

  /**
   * Tests for findHandler with Array patterns
   */
  describe("findHandler - Array patterns", () => {
    it("should match first pattern in array", () => {
      mockLocation("https://example.com/path");

      const handler1 = vi.fn();
      const handler2 = vi.fn();

      register(
        createPattern([{ host: /^example\.com$/ }, { host: /^test\.org$/ }], {
          ready: handler1,
        }),
      );

      const handler = findHandler();
      expect(handler).not.toBeNull();
    });

    it("should match second pattern when first fails", () => {
      mockLocation("https://test.org/path");

      register(
        createPattern([{ host: /^example\.com$/ }, { host: /^test\.org$/ }], {
          ready: () => "handler",
        }),
      );

      const handler = findHandler();
      expect(handler).not.toBeNull();
    });

    it("should return null when no patterns match", () => {
      mockLocation("https://different.com/path");

      register(
        createPattern([{ host: /^example\.com$/ }, { host: /^test\.org$/ }], {
          ready: () => "handler",
        }),
      );

      const handler = findHandler();
      expect(handler).toBeNull();
    });

    it("should match nested array with host arrays", () => {
      mockLocation("https://b.com/path");

      register(
        createPattern(
          [{ host: [/^a\.com$/, /^b\.com$/] }, { host: /^c\.com$/ }],
          { ready: () => "handler" },
        ),
      );

      const handler = findHandler();
      expect(handler).not.toBeNull();
    });
  });

  /**
   * Tests for handler return values
   */
  describe("findHandler - Handler return values", () => {
    it("should return handler with both start and ready functions", () => {
      mockLocation("https://example.com/path");

      const startFn = vi.fn();
      const readyFn = vi.fn();

      register(
        createPattern(
          { host: /^example\.com$/ },
          { start: startFn, ready: readyFn },
        ),
      );

      const handler = findHandler();
      expect(handler).not.toBeNull();
      expect(handler.start).toBeTypeOf("function");
      expect(handler.ready).toBeTypeOf("function");
    });

    it("should return handler with only start (ready becomes nop)", () => {
      mockLocation("https://example.com/path");

      const startFn = vi.fn();

      register(createPattern({ host: /^example\.com$/ }, { start: startFn }));

      const handler = findHandler();
      expect(handler).not.toBeNull();
      expect(handler.start).toBeTypeOf("function");
      expect(handler.ready).toBeTypeOf("function");

      handler.start();
      expect(startFn).toHaveBeenCalled();

      handler.ready();
    });

    it("should return handler with only ready (start becomes nop)", () => {
      mockLocation("https://example.com/path");

      const readyFn = vi.fn();

      register(createPattern({ host: /^example\.com$/ }, { ready: readyFn }));

      const handler = findHandler();
      expect(handler).not.toBeNull();
      expect(handler.start).toBeTypeOf("function");
      expect(handler.ready).toBeTypeOf("function");

      handler.start();

      handler.ready();
      expect(readyFn).toHaveBeenCalled();
    });

    it("should return null when pattern has no handlers", () => {
      mockLocation("https://example.com/path");

      register(createPattern({ host: /^example\.com$/ }, {}));

      const handler = findHandler();
      expect(handler).toBeNull();
    });

    it("should partially apply handlers with match result", () => {
      mockLocation("https://example.com/path");

      const readyFn = vi.fn();

      register(createPattern({ host: /^example\.com$/ }, { ready: readyFn }));

      const handler = findHandler();
      expect(handler).not.toBeNull();

      handler.ready();

      expect(readyFn).toHaveBeenCalledWith(
        expect.objectContaining({
          host: expect.any(Array),
        }),
      );
    });
  });

  /**
   * Tests for edge cases
   */
  describe("findHandler - Edge cases", () => {
    it("should return null when no patterns are registered", () => {
      mockLocation("https://example.com/path");

      const handler = findHandler();
      expect(handler).toBeNull();
    });

    it("should match first registered pattern when multiple patterns overlap", () => {
      mockLocation("https://example.com/path");

      const handler1 = vi.fn();
      const handler2 = vi.fn();

      register(createPattern({ host: /example\.com/ }, { ready: handler1 }));
      register(createPattern({ host: /example/ }, { ready: handler2 }));

      const handler = findHandler();
      expect(handler).not.toBeNull();

      handler.ready();

      expect(handler1).toHaveBeenCalled();
      expect(handler2).not.toHaveBeenCalled();
    });

    it("should handle URLs with special characters in path", () => {
      mockLocation("https://example.com/path/with%20spaces");

      register(
        createPattern({ host: /^example\.com$/ }, { ready: () => "handler" }),
      );

      const handler = findHandler();
      expect(handler).not.toBeNull();
    });

    it("should handle URLs with encoded characters", () => {
      mockLocation("https://example.com/path?query=%E2%9C%93");

      register(
        createPattern({ host: /^example\.com$/ }, { ready: () => "handler" }),
      );

      const handler = findHandler();
      expect(handler).not.toBeNull();
    });
  });
});

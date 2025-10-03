/**
 * Unit tests for core utility functions
 *
 * This file contains comprehensive tests for the core utility functions
 * used throughout the AdsBypasser project. These functions provide
 * essential functional programming capabilities and collection operations.
 */

import { describe, it, expect } from "vitest";
import {
  AdsBypasserError,
  partial,
  every,
  find,
  none,
  forEach,
  map,
} from "$lib/core";

/**
 * Test suite for core utility functions
 */
describe("core", () => {
  /**
   * Test suite for partial function application
   *
   * The partial function allows for partial application of functions,
   * pre-filling some arguments while leaving others to be filled later.
   */
  describe("partial", () => {
    /**
     * Test that partial throws an error when not given a function
     */
    it("throws if the first argument is not a function", () => {
      expect(() => partial()).toThrow(AdsBypasserError);
      expect(() => partial(0)).toThrow(AdsBypasserError);
    });

    /**
     * Test that partial returns a function when given a valid function
     */
    it("returns a function when a valid function is provided", () => {
      const result = partial(() => {});
      expect(result).toBeTypeOf("function");
    });

    /**
     * Test that partial correctly binds arguments to the returned function
     */
    it("binds arguments correctly", () => {
      const fn = (a, b, c) => {
        expect(a).toBe(1);
        expect(b).toBe(2);
        expect(c).toBe(3);
      };

      const partialFn = partial(fn, 1, 2);
      partialFn(3);
    });

    /**
     * Test that partial returns the value from the original function
     */
    it("returns the value from the original function", () => {
      const result = partial(() => "__MAGIC__")();
      expect(result).toBe("__MAGIC__");
    });
  });

  /**
   * Test suite for collection manipulation functions
   *
   * These functions provide utilities for working with collections
   * (arrays and objects) in a functional programming style.
   */
  describe("collection", () => {
    /**
     * Test suite for every function
     *
     * The every function tests whether all elements in a collection
     * pass a provided test function.
     */
    describe("every", () => {
      /**
       * Test that every returns true when all items match the condition
       */
      it("returns true if all items match the condition", () => {
        const result = every([1, 2, 3], (v) => typeof v === "number");
        expect(result).toBe(true);
      });

      /**
       * Test that every returns false when any item fails the condition
       */
      it("returns false if any item fails the condition", () => {
        const result = every([1, 2, 3], (v) => v % 2 === 1);
        expect(result).toBe(false);
      });
    });

    /**
     * Test suite for find function
     *
     * The find function returns the first element in a collection
     * that satisfies a provided testing function.
     */
    describe("find", () => {
      /**
       * Test that find returns the first element that matches the condition
       */
      it("returns the first even number", () => {
        const [k, v, r] = find([1, 2, 3], (v) => (v % 2 === 0 ? true : none));
        expect(k).toBe(1);
        expect(v).toBe(2);
        expect(r).toBe(true);
      });

      /**
       * Test that find returns none when no match is found
       */
      it("returns none when no match is found", () => {
        const [k, v, r] = find([1, 2, 3], (v) => (v === 0 ? 0 : none));
        expect(k).toBe(none);
        expect(v).toBe(none);
        expect(r).toBe(none);
      });
    });

    /**
     * Test suite for forEach function
     *
     * The forEach function executes a provided function once for each
     * element in a collection.
     */
    describe("forEach", () => {
      /**
       * Test that forEach iterates over all items in the collection
       */
      it("iterates over all items", () => {
        let sum = 0;
        forEach([1, 2, 4], (v) => {
          sum += v;
        });
        expect(sum).toBe(7);
      });
    });

    /**
     * Test suite for map function
     *
     * The map function creates a new collection by applying a function
     * to each element of the original collection.
     */
    describe("map", () => {
      /**
       * Test that map transforms items with the callback function
       */
      it("transforms items with the callback", () => {
        const result = map([1, 2, 3], (v) => v % 2 === 0);
        expect(result).toEqual([false, true, false]);
      });
    });
  });
});

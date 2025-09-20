import { describe, it, expect } from "vitest";
import {
  AdsBypasserError,
  partial,
  every,
  find,
  none,
  forEach,
  map,
} from "util/core";

describe("core", () => {
  describe("partial", () => {
    it("throws if the first argument is not a function", () => {
      expect(() => partial()).toThrow(AdsBypasserError);
      expect(() => partial(0)).toThrow(AdsBypasserError);
    });

    it("returns a function when a valid function is provided", () => {
      const result = partial(() => {});
      expect(result).toBeTypeOf("function");
    });

    it("binds arguments correctly", () => {
      const fn = (a, b, c) => {
        expect(a).toBe(1);
        expect(b).toBe(2);
        expect(c).toBe(3);
      };

      const partialFn = partial(fn, 1, 2);
      partialFn(3);
    });

    it("returns the value from the original function", () => {
      const result = partial(() => "__MAGIC__")();
      expect(result).toBe("__MAGIC__");
    });
  });

  describe("collection", () => {
    describe("every", () => {
      it("returns true if all items match the condition", () => {
        const result = every([1, 2, 3], (v) => typeof v === "number");
        expect(result).toBe(true);
      });

      it("returns false if any item fails the condition", () => {
        const result = every([1, 2, 3], (v) => v % 2 === 1);
        expect(result).toBe(false);
      });
    });

    describe("find", () => {
      it("returns the first even number", () => {
        const [k, v, r] = find([1, 2, 3], (v) =>
          v % 2 === 0 ? true : none
        );
        expect(k).toBe(1);
        expect(v).toBe(2);
        expect(r).toBe(true);
      });

      it("returns none when no match is found", () => {
        const [k, v, r] = find([1, 2, 3], (v) =>
          v === 0 ? 0 : none
        );
        expect(k).toBe(none);
        expect(v).toBe(none);
        expect(r).toBe(none);
      });
    });

    describe("forEach", () => {
      it("iterates over all items", () => {
        let sum = 0;
        forEach([1, 2, 4], (v) => {
          sum += v;
        });
        expect(sum).toBe(7);
      });
    });

    describe("map", () => {
      it("transforms items with the callback", () => {
        const result = map([1, 2, 3], (v) => v % 2 === 0);
        expect(result).toEqual([false, true, false]);
      });
    });
  });
});

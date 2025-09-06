import { describe, it, expect } from 'vitest';

import {
  AdsBypasserError,
  partial,
  every,
  find,
  none,
  forEach,
  map,
} from 'util/core';


describe('core', () => {

  describe('partial', () => {

    it('should takes function as first parameter', () => {
      expect(() => partial()).toThrow(AdsBypasserError);
      expect(() => {
        partial(0);
      }).toThrow(AdsBypasserError);
    });

    it('should returns a function', () => {
      expect(partial(function () {
      })).toBeTypeOf('function');
    });

    it('should receives arguments', () => {
      let p = partial(function (a, b, c) {
        expect(a).toBe(1);
        expect(b).toBe(2);
        expect(c).toBe(3);
      }, 1, 2);
      p(3);
    });

    it('should returns correct value', () => {
      let p = partial(function () {
        return '__MAGIC__';
      });
      expect(p()).toBe('__MAGIC__');
    });

  });

  describe('collection', () => {

    it('every [1, 2, 3] are numbers should be true', () => {
      expect(every([1, 2, 3], function (v) {
        return typeof v === 'number';
      })).toBe(true);
    });

    it('every [1, 2, 3] are odd numbers should be false', () => {
      expect(every([1, 2, 3], function (v) {
        return v % 2 === 1;
      })).toBe(false);
    });

    it('the first even number in [1, 2, 3] should be 2', () => {
      const [k, v, r] = find([1, 2, 3], (v) => {
        return v % 2 === 0 ? true : none;
      });
      expect(k).toBe(1);
      expect(v).toBe(2);
      expect(r).toBe(true);
    });

    it('0 should not be found in [1, 2, 3]', () => {
      const [k, v, r] = find([1, 2, 3], function (v) {
        return v === 0 ? 0 : none;
      });
      expect(k).toBe(none);
      expect(v).toBe(none);
      expect(r).toBe(none);
    });

    it('should iterate all items', () => {
      let sum = 0;
      forEach([1, 2, 4], function (v) {
        sum += v;
      });
      expect(sum).toBe(7);
    });

    it('should change all items', () => {
      expect(map([1, 2, 3], function (v) {
        return v % 2 === 0;
      })).toEqual([false, true, false]);
    });

  });

});

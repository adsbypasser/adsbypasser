import chai from 'chai';

import {
  AdsBypasserError,
  partial,
  every,
  find,
  none,
  forEach,
  map,
} from 'util/core';


chai.should();


describe('core', function () {

  describe('partial', function () {

    it('should takes function as first parameter', function () {
      partial.should.throw(AdsBypasserError);
      (function () {
        partial(0);
      }).should.throw(AdsBypasserError);
    });

    it('should returns a function', function () {
      partial(function () {
      }).should.be.a('function');
    });

    it('should receives arguments', function () {
      let p = partial(function (a, b, c) {
        a.should.equals(1);
        b.should.equals(2);
        c.should.equals(3);
      }, 1, 2);
      p(3);
    });

    it('should returns correct value', function () {
      let p = partial(function () {
        return '__MAGIC__';
      });
      p().should.equals('__MAGIC__');
    });

  });

  describe('collection', function () {

    it('every [1, 2, 3] are numbers should be true', function () {
      every([1, 2, 3], function (v) {
        return typeof v === 'number';
      }).should.be.true;
    });

    it('every [1, 2, 3] are odd numbers should be false', function () {
      every([1, 2, 3], function (v) {
        return v % 2 === 1;
      }).should.be.false;
    });

    it('the first even number in [1, 2, 3] should be 2', () => {
      const [k, v, r] = find([1, 2, 3], (v) => {
        return v % 2 === 0 ? true : none;
      });
      k.should.equals(1);
      v.should.equals(2);
      r.should.equals(true);
    });

    it('0 should not be found in [1, 2, 3]', function () {
      const [k, v, r] = find([1, 2, 3], function (v) {
        return v === 0 ? 0 : none;
      });
      k.should.equals(none);
      v.should.equals(none);
      r.should.equals(none);
    });

    it('should iterate all items', function () {
      let sum = 0;
      forEach([1, 2, 4], function (v) {
        sum += v;
      });
      sum.should.equals(7);
    });

    it('should change all items', function () {
      map([1, 2, 3], function (v) {
        return v % 2 === 0;
      }).should.be.deep.equals([false, true, false]);
    });

  });

});

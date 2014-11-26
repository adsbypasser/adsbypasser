var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var _ = require('../src/util/core.js');


describe('core', function () {

  describe('exception', function () {

    it('should be inheritable', function () {
      var TestError = _.AdsBypasserError.extend({
        name: 'TestError',
        constructor: function (msg) {
          TestError.super.constructor.apply(this, arguments);
        },
      });
      var e = new TestError('test');
      e.name.should.equals('TestError');
      e.message.should.equals('test');
      Object.getPrototypeOf(e).should.equals(TestError.prototype);
      e.constructor.should.equals(TestError);
      TestError.super.should.equals(_.AdsBypasserError.prototype);
      TestError.super.constructor.should.equals(_.AdsBypasserError);
    });

  });

  describe('partial', function () {

    it('should takes function as first parameter', function () {
      _.P.should.throw(_.AdsBypasserError);
      (function () {
        _.P(0);
      }).should.throw(_.AdsBypasserError);
    });

    it('should returns a function', function () {
      _.P(function () {
      }).should.be.a('function');
    });

    it('should receives arguments', function () {
      var p = _.P(function (a, b, c) {
        a.should.equals(1);
        b.should.equals(2);
        c.should.equals(3);
      }, 1, 2);
      p(3);
    });

    it('should returns correct value', function () {
      var p = _.P(function () {
        return '__MAGIC__';
      });
      p().should.equals('__MAGIC__');
    });

  });

  describe('template', function () {

    it('should be a function', function () {
      var tpl = _.T('');
      tpl.should.be.a('function');
    });

    it('should takes exactly one string', function () {
      _.T.should.throw(_.NoPicAdsError);

      (function (){
        _.T(0);
      }).should.throw(_.NoPicAdsError);

      (function (){
        _.T('');
      }).should.not.throw(_.NoPicAdsError);

      (function (){
        var s = new String();
        _.T(s);
      }).should.not.throw(_.NoPicAdsError);
    });

    it('should return original string if no keyword', function () {
      var s = 'input';
      _.T(s)('dummy', 'parameter').should.equals(s);
    });

    it('should escape double brackets', function () {
      var s = '{{}}';
      _.T(s)().should.equals('{}');
    });

    it('should works with index', function () {
      var tpl = _.T('a {0} c {1} e');
      tpl('b', 'd').should.equals('a b c d e');
    });

    it('should works with key', function () {
      var tpl = _.T('a {b} c {d} e');
      tpl({
        b: 'b',
        d: 'd',
      }).should.equals('a b c d e');
    });

    it('should be reusable', function () {
      var tpl = _.T('{0} is {1}');
      tpl('nothing', 'true').should.equals('nothing is true');
      tpl('everything', 'premitted').should.equals('everything is premitted');
    });

  });

  describe('collection', function () {

    it('all [1, 2, 3] are numbers should be true', function () {
      _.C([1, 2, 3]).all(function (v) {
        return typeof v === 'number';
      }).should.be.true;
    });

    it('all [1, 2, 3] are odd numbers should be false', function () {
      _.C([1, 2, 3]).all(function (v) {
        return v % 2 === 1;
      }).should.be.false;
    });

    it('the first even number in [1, 2, 3] should be 2', function () {
      var tmp = _.C([1, 2, 3]).find(function (v) {
        if (v % 2 !== 0) {
          return _.nop;
        }
      })
      tmp.key.should.equals(1);
      tmp.value.should.equals(2);
    });

    it('0 should not be found in [1, 2, 3]', function () {
      expect(_.C([1, 2, 3]).find(function (v) {
        if (v !== 0) {
          return _.nop;
        }
      })).to.be.undefined;
    });

    it('should iterate all items', function () {
      var sum = 0;
      _.C([1, 2, 4]).each(function (v) {
        sum += v;
      });
      sum.should.equals(7);
    });

    it('should change all items', function () {
      _.C([1, 2, 3]).map(function (v) {
        return v % 2 === 0;
      }).should.be.deep.equals([false, true, false]);
    });

  });

});


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;

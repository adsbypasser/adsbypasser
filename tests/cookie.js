var chai = require('chai');
var expect = chai.expect;
var Browser = require('zombie');

var toolkit = require('./misc/toolkit.js');

var cookie = require('../src/util/cookie.js');

var factory = toolkit.createFactory(cookie);


describe('cookie', function () {
  'use strict';

  before(function (done) {
    this.browser = new Browser();
    this.server = toolkit.createServer(done);
  });

  after(function () {
    this.server.close();
  });

  afterEach(function () {
    this.browser.tabs.closeAll();
  });


  describe('getCookie', function () {

    it('should get the right value', function (done) {
      var self = this;

      this.browser.setCookie({
        name: 'normal_key',
        value: 'normal_value',
      });
      this.browser.setCookie({
        name: 'DASH-KEY',
        value: 'DASH-VALUE-1234',
      });

      this.browser.visit(toolkit.page1).then(function () {
        var $ = factory(self.browser);

        var c = $.getCookie('normal_key');
        c.should.equals('normal_value');

        c = $.getCookie('DASH-KEY');
        c.should.equals('DASH-VALUE-1234');

        done();
      }).catch(function (error) {
        done(error);
      });
    });

  });


  describe('setCookie', function () {

    it('should be able to set cookies', function (done) {
      var self = this;
      this.browser.visit(toolkit.page1).then(function () {
        var $ = factory(self.browser);

        $.setCookie('DASH-KEY', 'DASH-VALUE');
        var c = self.browser.getCookie('DASH-KEY');
        c.should.equals('DASH-VALUE');

        done();
      }).catch(function (error) {
        done(error);
      });
    });

  });


  describe('resetCookies', function () {

    it('should reset all cookies', function (done) {
      var self = this;

      this.browser.setCookie({
        name: 'normal_key',
        value: 'normal_value',
      });

      this.browser.visit(toolkit.page1).then(function () {
        var $ = factory(self.browser);

        var c = self.browser.getCookie('normal_key');
        c.should.equals('normal_value');
        $.resetCookies();
        c = self.browser.getCookie('normal_key')
        expect(c).to.be.null;

        done();
      }).catch(function (error) {
        done(error);
      });
    });

  });

});


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;

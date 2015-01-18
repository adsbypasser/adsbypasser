var chai = require('chai');
var expect = chai.expect;
var Browser = require('zombie');

var toolkit = require('./misc/toolkit.js');

var link = require('../src/util/link.js');

var factory = toolkit.createFactory(link);


describe('link', function () {
  'use strict';

  before(function (done) {
    this.browser = Browser.create();
    this.server = toolkit.createServer(done);
  });

  after(function () {
    this.server.close();
  });

  afterEach(function () {
    this.browser.close();
  });


  describe('$.openLink', function () {

    it('should not accept invalid URL', function (done) {
      var self = this;
      this.browser.visit(toolkit.page1).catch(function (error) {
        done(error);
      }).then(function () {
        var $ = factory(self.browser);

        $.openLink(null);

        return self.browser.wait();
      }).then(function () {
        self.browser.window.location.toString().should.equals(toolkit.page1);

        done();
      });
    });

    it('should redirect to a valid URL', function (done) {
      var self = this;
      this.browser.visit(toolkit.page1).catch(function (error) {
        done(error);
      }).then(function () {
        var $ = factory(self.browser);

        $.openLink(toolkit.page2);

        return self.browser.wait();
      }).then(function () {
        self.browser.window.location.toString().should.equals(toolkit.page2);
        done();
      });
    });

  });

});


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;

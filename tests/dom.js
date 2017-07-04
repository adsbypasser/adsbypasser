var chai = require('chai');
var expect = chai.expect;
var Browser = require('zombie');

var toolkit = require('./misc/toolkit.js');

var dom = require('../src/util/dom.js');

var factory = toolkit.createFactory(dom);


describe('dom', function () {
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


  describe('$', function () {

    it('should find right element', function (done) {
      var self = this;
      this.browser.visit(toolkit.page1).then(function () {
        var $ = factory(self.browser);

        var d = $('#div_1');
        expect(d).to.be.exist;

        var s = $('.label', d);
        expect(s).to.be.exist;
        s.textContent.should.equal('text 2');

        done();
      }).catch(function (error) {
        done(error);
      });
    });

    it('should throw exception if not found', function (done) {
      var self = this;
      this.browser.visit(toolkit.page1).then(function () {
        var $ = factory(self.browser);
        var _ = require('../src/util/core.js');

        // $('does_not_exist');
        (function () {
          $('does_not_exist');
        }).should.throw(_.AdsBypasserError);

        done();
      }).catch(function (error) {
        done(error);
      });
    });

  });


  describe('$.$', function () {

    it('should find right element', function (done) {
      var self = this;
      this.browser.visit(toolkit.page1).then(function () {
        var $ = factory(self.browser);

        var d = $.$('#div_1');
        expect(d).to.be.exist;

        var s = $.$('.label', d);
        expect(s).to.be.exist;
        s.textContent.should.equal('text 2');

        done();
      }).catch(function (error) {
        done(error);
      });
    });

    it('should return null if not found', function (done) {
      var self = this;
      this.browser.visit(toolkit.page1).then(function () {
        var $ = factory(self.browser);

        var d = $.$('does_not_exist');
        expect(d).to.be.null;

        done();
      }).catch(function (error) {
        done(error);
      });
    });

  });


  describe('$.$$', function () {

    it('should return collection', function (done) {
      var self = this;
      this.browser.visit(toolkit.page1).then(function () {
        var $ = factory(self.browser);

        $.$$('.label').each(function (v) {
          // jsdom does not support classList yet
          v.getAttribute('class').should.equal('label');
        });

        done();
      }).catch(function (error) {
        done(error);
      });
    });

  });


  describe('$.removeNodes', function () {

    it('should return collection', function (done) {
      var self = this;
      this.browser.visit(toolkit.page1).then(function () {
        var $ = factory(self.browser);

        $.removeNodes('.label');
        expect($.$('.label')).to.be.null;

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

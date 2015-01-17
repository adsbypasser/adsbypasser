var chai = require('chai');
var expect = chai.expect;
var connect = require('connect');
var serveStatic = require('serve-static');
var Browser = require('zombie');
var bluebird = require('bluebird');
var Proxy = require('harmony-proxy');

var _ = require('../src/util/core.js');
_ = _(this, bluebird.Promise);
var dom = require('../src/util/dom.js');

_.info = _.nop;
_.warn = _.nop;


function wrap (browser) {
  // FIXME need a sandbox
  // browser.window.unsafeWindow = browser.window;
  var o = {};
  var tmp = dom({
    window: new Proxy(browser.window, {
      set: function (target, key, value) {
        if (key === '$' || key === '_') {
          return o[key] = value;
        } else {
          return target[key] = value;
        }
      },
      get: function (target, key) {
        if (key === '$' || key === '_') {
          return o[key];
        } else {
          return target[key];
        }
      },
    }),
    unsafeWindow: browser.window,
  }, _);

  return tmp;
}

var SERVER_PORT = 1234;
var SERVER_HREF = _.T('http://localhost:{0}')(SERVER_PORT);
var SERVER_PAGE_1 = SERVER_HREF + '/misc/one.html';
var SERVER_PAGE_2 = SERVER_HREF + '/misc/two.html';


describe('dom', function () {
  'use strict';

  var browser;

  before(function (done) {
    this.server = connect().use(serveStatic('./tests')).listen(SERVER_PORT, done);
    browser = Browser.create();
  });

  after(function () {
    this.server.close();
  });

  afterEach(function () {
    browser.close();
  });


  describe('$', function () {

    it('should find right element', function (done) {
      browser.visit(SERVER_PAGE_1).then(function () {
        var $ = wrap(browser);

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
      browser.visit(SERVER_PAGE_1).then(function () {
        var $ = wrap(browser);

        (function () {
          $('does_not_exist');
        }).should.throw(_.NoPicAdsError);

        done();
      }).catch(function (error) {
        done(error);
      });
    });

  });


  describe('$.$', function () {

    it('should find right element', function (done) {
      browser.visit(SERVER_PAGE_1).then(function () {
        var $ = wrap(browser);

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
      browser.visit(SERVER_PAGE_1).then(function () {
        var $ = wrap(browser);

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
      browser.visit(SERVER_PAGE_1).then(function () {
        var $ = wrap(browser);

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
      browser.visit(SERVER_PAGE_1).then(function () {
        var $ = wrap(browser);

        $.removeNodes('.label');
        expect($.$('.label')).to.be.not.found;

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

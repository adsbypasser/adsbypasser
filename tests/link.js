var chai = require('chai');
var expect = chai.expect;
var connect = require('connect');
var serveStatic = require('serve-static');
var Browser = require('zombie');
var bluebird = require('bluebird');

var _ = require('../src/util/core.js');
_ = _(this, bluebird.Promise);
var dom = require('../src/util/dom.js');
var link = require('../src/util/link.js');

_.info = _.nop;
_.warn = _.nop;


function wrap (browser) {

  // FIXME need a sandbox
  browser.window.unsafeWindow = browser.window;
  var tmp = dom(browser.window, _);
  tmp = link(browser.window, _, tmp);

  return tmp;
}

var SERVER_PORT = 1234;
var SERVER_HREF = _.T('http://localhost:{0}')(SERVER_PORT);
var SERVER_PAGE_1 = SERVER_HREF + '/misc/one.html';
var SERVER_PAGE_2 = SERVER_HREF + '/misc/two.html';


describe('link', function () {
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


  describe('$.openLink', function () {

    it('should not accept invalid URL', function (done) {
      browser.visit(SERVER_PAGE_1).catch(function (error) {
        done(error);
      }).then(function () {
        var $ = wrap(browser);

        $.openLink(null);

        return browser.wait();
      }).then(function () {
        browser.window.location.toString().should.equals(SERVER_PAGE_1);

        done();
      });
    });

    it('should redirect to a valid URL', function (done) {
      var self = this;
      browser.visit(SERVER_PAGE_1).catch(function (error) {
        done(error);
      }).then(function () {
        var $ = wrap(browser);

        $.openLink(SERVER_PAGE_2);

        return browser.wait();
      }).then(function () {
        browser.window.location.toString().should.equals(SERVER_PAGE_2);
        done();
      });
    });

  });

});


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;

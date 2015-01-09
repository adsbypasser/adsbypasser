var chai = require('chai');
var expect = chai.expect;
var connect = require('connect');
var serveStatic = require('serve-static');
var Browser = require('zombie');
var bluebird = require('bluebird');

var _ = require('../src/util/core.js');
_ = _(this, bluebird.Promise);
var dom = require('../src/util/dom.js');
var handler = require('../src/util/handler.js');
var config = require('../src/util/config.js');
var link = require('../src/util/link.js');
var image = require('../src/util/image.js');

_.info = _.nop;
_.warn = _.nop;


var defaultConfig = {
  version: 1,
  redirect_image: true,
  align_image: true,
};

function wrap (browser, config_) {
  config_ = config_ || {};
  _.C(defaultConfig).each(function (v, k) {
    if (!config_.hasOwnProperty(k)) {
      config_[k] = v;
    }
  });

  // FIXME need a sandbox
  browser.window.unsafeWindow = browser.window;
  var tmp = dom(browser.window, _);
  tmp = handler(browser.window, _, tmp);
  tmp = link(browser.window, _, tmp);
  tmp = config(browser.window, {
    getValue: function (key, default_) {
      if (config_.hasOwnProperty(key)) {
        return config_[key];
      }
      return default_;
    },
    setValue: function (key, value) {
      config_[key] = value;
    },
    registerMenuCommand: _.nop,
  }, _, tmp);
  tmp = image(browser.window, {}, _, tmp);
  tmp._load();

  return tmp;
}

var SERVER_PORT = 1234;
var SERVER_HREF = _.T('http://localhost:{0}')(SERVER_PORT);
var SERVER_PAGE_1 = SERVER_HREF + '/misc/one.html';
var SERVER_PAGE_2 = SERVER_HREF + '/misc/two.html';


describe('image', function () {
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


  describe('$.openImage', function () {

    it('should not accept invalid URL', function (done) {
      browser.visit(SERVER_PAGE_1).catch(function (error) {
        done(error);
      }).then(function () {
        var $ = wrap(browser);

        $.openImage(null);

        return browser.wait();
      }).then(function () {
        browser.window.location.toString().should.equals(SERVER_PAGE_1);
        done();
      });
    });

    it('should not open image if redirect_image is disabled', function (done) {
      browser.visit(SERVER_PAGE_1).catch(function (error) {
        done(error);
      }).then(function () {
        var $ = wrap(browser, {
          redirect_image: false,
        });

        $.openImage('does_not_exist');

        return browser.wait();
      }).then(function () {
        browser.window.location.toString().should.equals(SERVER_PAGE_1);
        done();
      });
    });

    it('should open image by default', function (done) {
      var path = '/does_not_exist';

      browser.visit(SERVER_PAGE_1).catch(function (error) {
        done(error);
      }).then(function () {
        var $ = wrap(browser);

        $.openImage(path);

        return browser.wait();
      }).catch(function () {
        // excepted 404
        browser.window.location.pathname.should.equals(path);
        done();
      });
    });

  });


  describe('$.replace', function () {

    it('should not accept invalid URL', function (done) {
      browser.visit(SERVER_PAGE_1).then(function () {
        var $ = wrap(browser);

        var b = browser.window.document.body;
        $.replace(null);
        browser.window.document.body.should.be.equals(b);

        done();
      }).done(null, function (error) {
        done(error);
      });
    });

    it('should not replace body if redirect_image is disabled', function (done) {
      browser.visit(SERVER_PAGE_1).then(function () {
        var $ = wrap(browser, {
          redirect_image: false,
        });

        var b = browser.window.document.body;
        $.replace('does_not_exist');
        browser.window.document.body.should.be.equals(b);

        done();
      }).done(null, function (error) {
        done(error);
      });
    });

    it('should replace document.body');

  });

});


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;

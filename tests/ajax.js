var fs = require('fs');
var chai = require('chai');
var expect = chai.expect;
var connect = require('connect');
var serveStatic = require('serve-static');
var Browser = require('zombie');
var bluebird = require('bluebird');

var _ = require('../src/util/core.js');
_ = _(this, bluebird.Promise);
var ajax = require('../src/util/ajax.js');

_.info = _.nop;
_.warn = _.nop;


function wrap (browser) {
  // FIXME need a sandbox
  browser.window.unsafeWindow = browser.window;
  var tmp = ajax(browser.window, {
    xmlhttpRequest: function (options) {
      var xhr = new browser.window.XMLHttpRequest();
      xhr.open(options.method, options.url);
      xhr.onload = options.onload;
      xhr.onerror = options.onerror;
      _.C(options.headers).each(function (v, k) {
        xhr.setRequestHeader(k, v);
      });
      if (options.method === 'GET') {
        xhr.send();
      } else {
        xhr.send(options.data);
      }
      return xhr;
    },
  }, _, {});

  return tmp;
}

var SERVER_PORT = 1234;
var SERVER_HREF = _.T('http://localhost:{0}')(SERVER_PORT);
var SERVER_PAGE_1 = SERVER_HREF + '/misc/one.html';
var SERVER_PAGE_2 = SERVER_HREF + '/misc/two.html';


describe('ajax', function () {
  'use strict';

  var browser;

  before(function (done) {
    this.server = connect().use(serveStatic('./tests')).use(function (req, res) {
      if (req.method !== 'POST') {
        return;
      }
      res.end(fs.readFileSync('./tests' + req.url));
    }).listen(SERVER_PORT, done);
    browser = Browser.create();
  });

  after(function () {
    this.server.close();
  });

  afterEach(function () {
    browser.close();
  });


  describe('$.get', function () {

    it('should get right content', function (done) {
      browser.visit(SERVER_PAGE_1).then(function () {
        var $ = wrap(browser);

        var tmp = $.get(SERVER_PAGE_2);
        browser.wait().then();
        return tmp;
      }).catch(function (error) {
        done(error);
      }).then(function (html) {
        html.length.should.equals(183);
        done();
      });
    });

  });


  describe('$.post', function () {

    it('should get right content', function (done) {
      browser.visit(SERVER_PAGE_1).then(function () {
        var $ = wrap(browser);

        var tmp = $.post(SERVER_PAGE_2);
        browser.wait().then();
        return tmp;
      }).catch(function (error) {
        done(error);
      }).then(function (html) {
        html.length.should.equals(183);
        done();
      });
    });

  });

});


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;

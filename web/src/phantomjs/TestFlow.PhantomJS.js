/// <reference path="../AtomEnumerator.js" />
/// <reference path="../AtomPrototype.js" />
/// <reference path="../EventDispatcher.js" />
/// <reference path="../TestFlowEngine.js" />

var TestFlowPhantomJS = window.TestFlowPhantomJS = (function (window, base) {


    var system = require('system');
    var fs = require('fs');

    return createClass({
        name: "TestFlowPhantomJS",
        base: base,
        start: function () {

            this._page = require('webpage').create();


        },
        methods: {

            get_page: function () {
                return this._page;
            },
            init: function () {

                var self = this;

                base.init.apply(this, arguments);
                
                this._page.onResourceRequested = function (e) {
                    self.fire('request', e);
                };

                this._page.onResourceTimeout = function (e) {
                    self.fire('requestTimeout', e);
                };
                this._page.onResourceReceived = function (e) {
                    self.fire('response', e);
                };
                this._page.onResourceError = function (e) {
                    self.fire('responseError', e);
                };


                this.on('request', function (e) {
                    self.pushWait();
                    self.updateRequest(e.url, e.id, 'load');
                });
                this.on('requestTimeout', function (e) {
                    self.popWait();
                    self.updateRequest(e.url, e.id, 'timeout');
                });
                this.on('responseError', function (e) {
                    self.popWait();
                    self.updateRequest(e.url, e.id, 'error');
                });
                this.on('response', function (e) {
                    self.updateRequest(e.url, e.id, e.stage);
                    // ignore redirect url
                    if (e.redirectURL) {
                        return;
                    }
                    // ignore chunks
                    if (e.stage === 'end') {
                        self.popWait();
                    }
                });
                this.on('error', function () {
                    setTimeout(function () {
                        phantom.exit(1);
                    }, 1000);
                });
                this.on('done', function () {
                    phantom.exit();
                });
            },
            navigate: function (action, url) {
                this.pushWait();
                var self = this;
                this._page.open(url, function (status) {
                    self.popWait();
                    if (status === 'fail') {
                        self.set_status('fail');
                        return;
                    }
                });
            },
            evalJS: function (exp) {
                return this._page.evaluate(function (e) {
                    return eval(e);
                }, exp);
            },
            type: function (action, selector, text) {

            },
            keyPress: function (action, selector, keys) {
            },
            click: function (action, selector) {

            },
            setElementValue: function (action, selector, value) {
                this._page.evaluate(function (s, v) {
                    var e = document.querySelector(s);
                    e.value = v;
                }, selector, value);
            },
            load: function () {


                var inputTest = system.args[1];

                this.set_test(JSON.parse(fs.read(inputTest)));


            }
        }
    });
})(window,TestFlowEngine.prototype);
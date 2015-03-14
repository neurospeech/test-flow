/// <reference path="../AtomEnumerator.js" />
/// <reference path="../AtomPrototype.js" />
/// <reference path="../EventDispatcher.js" />
/// <reference path="../TestFlowEngine.js" />

var TestFlowPhantomJS = window.TestFlowPhantomJS = (function (window, base) {
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

            configure: function () {
                base.configure.apply(this, arguments);
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
                return this._page.evaluateJavaScript(exp);
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
            }
        }
    });
})(window,TestFlowEngine.prototype);
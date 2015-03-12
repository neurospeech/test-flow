/// <reference path="../AtomPrototype.js" />
/// <reference path="../TestFlowEngine.js" />

var TestFlowPhantomJS = (function (window, base) {
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
            }
        }
    });
})(window,TestFlowEngine.prototype);
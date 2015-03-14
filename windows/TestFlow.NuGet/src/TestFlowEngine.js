/// <reference path="AtomPrototype.js" />
/// <reference path="EventDispatcher.js" />

var TestFlowEngine = window.TestFlowEngine = (function (base) {
    return createClass({
        name: "TestFlowEngine",
        base: base,
        start: function () {
            this._wait = 0;
            this.actionMap = {
                "configure": "configure",
                "navigate": "navigate",
                "wait-till": "waitTill",
                "type": "type",
                "key-press": "keyPress",
                "click": "click",
                "assert": "assert",
                "set-value": "setElementValue"
            };
        },
        properties: {
            steps: null,
            config: null,
            status: 'ready',
            error: ''
        },
        methods: {
            set_status: function (v) {
                this._status = v;
                if (/fail|error/i.test(v)) {
                    v = "error";
                }
                this.fire(v);
            },
            pushWait: function () {
                this._wait++;
            },
            popWait: function () {
                this._wait--;
            },
            configure: function (action, c) {
                var conf = this._config = this._config || {};
                for (var i in c) {
                    conf[i] = c[i];
                }
                this.fire('config', c);
            },
            navigate: function (action, url) {
            },
            evalJS: function (exp) {

            },
            waitTill: function (action, exp, maxTimeout, interval) {
                this.pushWait();
                var self = this;
                var ms = ((maxTimeout || 60) * 1000);
                var int = ((interval || 0.1) * 1000);
                this._interval = setInterval(function () {
                    var r = self.evalJS(exp);
                    ms -= int;
                    if (ms < 0) {
                        // timeout...
                        self.set_error('timeout');
                        self.set_status('failed');
                        clearInterval(self._interval);
                        self.popWait();
                    }
                    if (r) {
                        clearInterval(self._interval);
                        self.popWait();
                    }
                }, int);
            },
            type: function (action, selector, text) {

            },
            keyPress: function (action, selector, keys) {
            },
            assert: function (action, exp, msg) {
                if (!this.evalJS(exp)) {
                    this.set_error(msg);
                    this.set_status('assert-failed');
                }
            },
            setElementValue: function (action, element, value) {

            },
            run: function () {

            }
        }
    });
})(EventDispatcher.prototype);
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
            network: [],
            config: {
                debug: 1
            },
            status: 'ready',
            test: null,
            step: null,
            stepIndex:-1,
            error: ''
        },
        methods: {
            debugLog: function (v, level) {
                var d = this._config.debug;
                if (d) {
                    if (level) {
                        if (level == d) {
                            console.log(v);
                        }
                    } else {
                        console.log(v);
                    }
                }
            },
            set_test: function (v) {
                this._test = v;
                if (v.config) {
                    this.configure(v.config);
                }
                this.set_network([]);
                this._testEnumerator = new AtomEnumerator(v.steps);
            },
            updateRequest: function (url, id, stage) {
                this.debugLog(this._wait + " :" + stage + ':' + url, 2);
                var a = this._network;
                var r = a.firstOrDefault(function (i) { return i.url == url; });
                if (!r) {
                    r = { url: url, id: id };
                    a.push(r);
                }
                r.stage = stage;
                r.time = (new Date()).getTime();
            },
            get_step: function () {
                return this._testEnumerator.current();
            },
            get_stepIndex: function () {
                return this._testEnumerator.currentIndex();
            },
            triggerTest: function () {
                if (!this._runNextHandler) {
                    var self = this;
                    this._runNextHandler = function () {
                        self.runNext();
                    };
                }
                setTimeout(this._runNextHandler, 100);
            },
            runNext: function () {
                if (this._wait) {
                    this.triggerTest();
                    return;
                }
                if (this._testEnumerator.next()) {
                    var s = this.get_step();
                    var action = s[0];
                    this.debugLog('executing step ' + JSON.stringify(s));
                    var f = this.actionMap[action];
                    if (!f) {
                        this.set_status('error', 'step ' + action + ' not found');
                        return;
                    }
                    this[f].apply(this, s);
                    this.triggerTest();

                } else {
                    // steps finished...
                    this.set_status('done');
                }

            },

            set_status: function (v,msg) {
                this._status = v;
                if (/fail|error/i.test(v)) {
                    this._wait = -1;
                    v = "error";
                    if (msg) {
                        this.set_error(msg);
                    }
                }
                this.fire(v, msg);
            },
            init: function () {
                this.on('error', function () {
                    console.error(this.get_error())
                });
            },
            load: function () {
            },
            pushWait: function () {
                this._wait++;
            },
            popWait: function () {
                this._wait--;
            },
            configure: function (c) {
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
                    this.set_status('fail', 'failed step: ' + msg);
                } else {
                    this.debugLog('assert success');
                }
            },
            setElementValue: function (action, element, value) {

            },
            run: function () {
                this.init();
                this.load();
                this.triggerTest();
            }
        }
    });
})(EventDispatcher.prototype);
/// <reference path="AtomPrototype.js" />
/// <reference path="EventDispatcher.js" />

var mimeTypes = {
    html: "text/html",
    htm: "text/html",
    css: "text/css",
    js: "text/javascript",
    jpg: "image/jpeg",
    gif: "image/gif",
    png: "image/png"
};


var FileInfo = function (p) {
    var s = FileInfo.separator;
    if (p.indexOf(s) == -1) {
        s = s == '\\' ? '/' : '\\';
    }
    this.pathList = p.split(s);
}

FileInfo.separator = "/";

FileInfo.prototype = {
    parent: function () {
        var r = [];
        var ae = new AtomEnumerator(this.pathList);
        var oneLess = this.pathList.length - 1;
        while (ae.next()) {
            if (ae.currentIndex() < oneLess) {
                r.push(ae.current());
            }
        }
        return new FileInfo(r.join(FileInfo.separator));
    },
    append: function (v) {
        return new FileInfo(this.toString() + FileInfo.separator + v);
    },
    extension: function () {
        var last = this.pathList[this.pathList.length - 1];
        if (!last)
            return "html";
        last = (last.split('.')).pop();
        return last;
    },
    toString: function () {
        return this.pathList.join(FileInfo.separator);
    },
};

var UrlInfo = function (p) {
    var i = p.indexOf('?');
    if (i !== -1) {
        this.queryString = p.substr(i + 1);
        this.pathQuery = p.substr(0, i);
    } else {
        this.pathQuery = p;
    }

    this.pathQuery = (new FileInfo(this.pathQuery)).toString();
}

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
                "set-value": "setElementValue",
                "test":"importTest"
            };
            this.stack = [];
            this.results = [];
        },
        properties: {
            steps: null,
            network: [],
            config: {
                debug: 1,
                port: 3245
            },
            status: 'ready',
            test: null,
            errorDetail: ''
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
                if (v.index === undefined) {
                    v.network = [];
                    var i = 0;
                    v.steps = v.steps.map(function (item) {
                        return { id: i++, action: item[0], step: item };
                    });
                    v.index = -1;

                    if (!v.isChild) {
                        this.results.push(v);
                    }
                }
            },
            updateRequest: function (url, id, stage, rurl) {
                this.debugLog(this._wait + " :" + stage + ':' + url, 2);
                var a = this._test.network;
                var r = a.firstOrDefault(function (i) { return i.url == url; });
                if (!r) {
                    r = { url: url, id: id, states:[] };
                    a.push(r);
                }
                r.stage = stage;
                r.time = (new Date()).getTime();
                var state = {
                    stage: stage,
                    time: r.time
                };
                if (rurl) {
                    state.redirectUrl = rurl;
                }
                r.states.push(state);
                this.saveResults();
            },
            get_step: function () {
                return this._test.steps[this._test.index];
            },
            get_nextStep: function () {
                var test = this._test;
                test.index++;
                return test.index < test.steps.length;
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

                this.updateStep();

                if (this.get_nextStep()) {
                    var s = this.get_step();
                    var action = s.action;
                    this.debugLog('executing step ' + JSON.stringify(s.step),2);
                    var f = this.actionMap[action];
                    if (!f) {
                        this.set_status('error', 'step ' + action + ' not found');
                        return;
                    }
                    this[f].apply(this, s.step);
                    this.saveResults();
                    this.triggerTest();

                } else {
                    this.debugLog('tests finished');
                    // steps finished...

                    // pop tests...
                    if (this.stack.length) {
                        var t = this.stack.pop();
                        this.set_test(t);
                        this.triggerTest();
                    } else {
                        this.set_status('done');
                    }
                }

            },
            updateStep: function () {
                var prevStep = this.get_step();
                if (!prevStep)
                    return;
                this.debugLog('success :) ' + JSON.stringify(prevStep.step));
                prevStep.status = "success";
                prevStep.time = (new Date()).getTime();

                this.saveResults();
            },
            importTest: function (action, name) {
            },
            set_status: function (v,msg) {
                this._status = v;
                if (/fail|error/i.test(v)) {
                    this._wait = -1;
                    v = "error";
                    if (msg) {
                        this.set_errorDetail(msg);
                    }

                    var step = this.get_step();
                    if (step) {
                        step.status = "failed";
                        step.details = this.get_errorDetail();
                    }
                } else {
                    this.set_errorDetail("");
                }
                this.fire(v, msg);
            },
            init: function () {
                var self = this;
                this.on('error', function () {
                    console.error(self.get_errorDetail())
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
                        self.set_status('failed','timeout');
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
                    this.set_status('fail', 'failed :( '  + JSON.stringify(this.get_step().step));
                } 
            },
            setElementValue: function (action, element, value) {

            },
            run: function () {
                this.init();
                this.load();
                this.triggerTest();
            },
            saveResults: function () {
            }
        }
    });
})(EventDispatcher.prototype);
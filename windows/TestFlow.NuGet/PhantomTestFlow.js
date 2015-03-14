












/*

The MIT License (MIT)

Copyright (c) 2014 Akash Kava

Permission is hereby granted, free of charge, to any person obtaining a copy of this 
software and associated documentation files (the "Software"), to deal in the Software 
without restriction, including without limitation the rights to use, copy, modify, merge, 
publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons 
to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies 
or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING 
BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function(window){

/*Line 1 - AtomPrototype.js */function mapLibrary(n, p, v) {
/*Line 2 - AtomPrototype.js */    var index = n.indexOf('.');
/*Line 3 - AtomPrototype.js */    if (index == -1) {
/*Line 4 - AtomPrototype.js */        var r = p[n];
/*Line 5 - AtomPrototype.js */        if (!r) {
/*Line 6 - AtomPrototype.js */            r = v;
/*Line 7 - AtomPrototype.js */            p[n] = r;
/*Line 8 - AtomPrototype.js */        }
/*Line 9 - AtomPrototype.js */        return r;
/*Line 10 - AtomPrototype.js */    }
/*Line 11 - AtomPrototype.js */    var r = mapLibrary(n.substr(0, index), p, {});
/*Line 12 - AtomPrototype.js */    return mapLibrary(n.substr(index + 1), r, v);
/*Line 13 - AtomPrototype.js */};

/*Line 15 - AtomPrototype.js */function createProperty(name, g) {
/*Line 16 - AtomPrototype.js */    if (g) {
/*Line 17 - AtomPrototype.js */        return function () {
/*Line 18 - AtomPrototype.js */            return this[name];
/*Line 19 - AtomPrototype.js */        };
/*Line 20 - AtomPrototype.js */    }
/*Line 21 - AtomPrototype.js */    return function (v) {
/*Line 22 - AtomPrototype.js */        this[name] = v;
/*Line 23 - AtomPrototype.js */    };
/*Line 24 - AtomPrototype.js */}

/*Line 26 - AtomPrototype.js */function classCreator(name, basePrototype, classConstructor, classPrototype, classProperties, thisPrototype, thisProperties) {
/*Line 27 - AtomPrototype.js */    var baseClass = basePrototype ? basePrototype.constructor : null;
/*Line 28 - AtomPrototype.js */    var old = classConstructor || (function () { });
/*Line 29 - AtomPrototype.js */    var cp = classProperties;
/*Line 30 - AtomPrototype.js */    var f = null;
/*Line 31 - AtomPrototype.js */    if (baseClass) {
/*Line 32 - AtomPrototype.js */        if (classProperties) {
/*Line 33 - AtomPrototype.js */            f = function () {
/*Line 34 - AtomPrototype.js */                for (var k in cp) {
/*Line 35 - AtomPrototype.js */                    this["_" + k] = cp[k];
/*Line 36 - AtomPrototype.js */                }
/*Line 37 - AtomPrototype.js */                baseClass.apply(this, arguments);
/*Line 38 - AtomPrototype.js */                this.__typeName = name;
/*Line 39 - AtomPrototype.js */                //var cp = Atom.clone(classProperties);
/*Line 40 - AtomPrototype.js */                old.apply(this, arguments);
/*Line 41 - AtomPrototype.js */            };
/*Line 42 - AtomPrototype.js */        } else {
/*Line 43 - AtomPrototype.js */            f = function () {
/*Line 44 - AtomPrototype.js */                baseClass.apply(this, arguments);
/*Line 45 - AtomPrototype.js */                this.__typeName = name;
/*Line 46 - AtomPrototype.js */                old.apply(this, arguments);
/*Line 47 - AtomPrototype.js */            };
/*Line 48 - AtomPrototype.js */        }

/*Line 50 - AtomPrototype.js */        var bpt = baseClass.prototype;

/*Line 52 - AtomPrototype.js */        // extend
/*Line 53 - AtomPrototype.js */        for (var k in bpt) {
/*Line 54 - AtomPrototype.js */            if (classPrototype[k])
/*Line 55 - AtomPrototype.js */                continue;
/*Line 56 - AtomPrototype.js */            if (bpt.hasOwnProperty(k)) {
/*Line 57 - AtomPrototype.js */                classPrototype[k] = bpt[k];
/*Line 58 - AtomPrototype.js */            }
/*Line 59 - AtomPrototype.js */        }

/*Line 61 - AtomPrototype.js */    } else {
/*Line 62 - AtomPrototype.js */        if (classProperties) {
/*Line 63 - AtomPrototype.js */            f = function () {
/*Line 64 - AtomPrototype.js */                this.__typeName = name;
/*Line 65 - AtomPrototype.js */                //var cp = Atom.clone(classProperties);
/*Line 66 - AtomPrototype.js */                for (var k in cp) {
/*Line 67 - AtomPrototype.js */                    this["_" + k] = cp[k];
/*Line 68 - AtomPrototype.js */                }
/*Line 69 - AtomPrototype.js */                old.apply(this, arguments);
/*Line 70 - AtomPrototype.js */            };
/*Line 71 - AtomPrototype.js */        } else {
/*Line 72 - AtomPrototype.js */            f = function () {
/*Line 73 - AtomPrototype.js */                this.__typeName = name;
/*Line 74 - AtomPrototype.js */                old.apply(this, arguments);
/*Line 75 - AtomPrototype.js */            };
/*Line 76 - AtomPrototype.js */        }
/*Line 77 - AtomPrototype.js */    }

/*Line 79 - AtomPrototype.js */    if (classProperties) {
/*Line 80 - AtomPrototype.js */        for (var k in classProperties) {
/*Line 81 - AtomPrototype.js */            if (!classPrototype["get_" + k]) {
/*Line 82 - AtomPrototype.js */                classPrototype["get_" + k] = createProperty("_"+ k,true);
/*Line 83 - AtomPrototype.js */            }
/*Line 84 - AtomPrototype.js */            if (!classPrototype["set_" + k]) {
/*Line 85 - AtomPrototype.js */                classPrototype["set_" + k] = createProperty("_" + k);
/*Line 86 - AtomPrototype.js */            }
/*Line 87 - AtomPrototype.js */        }
/*Line 88 - AtomPrototype.js */    }

/*Line 90 - AtomPrototype.js */    f.__typeName = name;

/*Line 92 - AtomPrototype.js */    if (baseClass) {
/*Line 93 - AtomPrototype.js */        f.__baseType = baseClass;
/*Line 94 - AtomPrototype.js */    }

/*Line 96 - AtomPrototype.js */    f.prototype = classPrototype;
/*Line 97 - AtomPrototype.js */    f.prototype.constructor = f;
/*Line 98 - AtomPrototype.js */    if (!classPrototype.hasOwnProperty("toString")) {
/*Line 99 - AtomPrototype.js */        f.prototype.toString = function () {
/*Line 100 - AtomPrototype.js */            return name;
/*Line 101 - AtomPrototype.js */        };
/*Line 102 - AtomPrototype.js */    }

/*Line 104 - AtomPrototype.js */    mapLibrary( /\./.test(name) ? name : 'WebAtoms.' + name, window, f);

/*Line 106 - AtomPrototype.js */    return f;
/*Line 107 - AtomPrototype.js */};

/*Line 109 - AtomPrototype.js */function classCreatorEx(objDef) {
/*Line 110 - AtomPrototype.js */    return classCreator(objDef.name, objDef.base, objDef.start, objDef.methods, objDef.properties);
/*Line 111 - AtomPrototype.js */}

/*Line 113 - AtomPrototype.js */window.createClass = classCreatorEx;
/*Line 114 - AtomPrototype.js */window.classCreatorEx = classCreatorEx;
/*Line 1 - AtomEnumerator.js */

/*Line 3 - AtomEnumerator.js */var Atom = {};

/*Line 5 - AtomEnumerator.js */var AtomConfig = {};



/*Line 9 - AtomEnumerator.js */var AtomEnumerator = window.AtomEnumerator = (function () {
/*Line 10 - AtomEnumerator.js */    return createClass({
/*Line 11 - AtomEnumerator.js */        name: 'AtomEnumerator',
/*Line 12 - AtomEnumerator.js */        start: function (items) {
/*Line 13 - AtomEnumerator.js */            this.items = items;
/*Line 14 - AtomEnumerator.js */            this.i = -1;
/*Line 15 - AtomEnumerator.js */        },
/*Line 16 - AtomEnumerator.js */        methods: {
/*Line 17 - AtomEnumerator.js */            next: function () {
/*Line 18 - AtomEnumerator.js */                return (this.i++) < this.items.length;
/*Line 19 - AtomEnumerator.js */            },
/*Line 20 - AtomEnumerator.js */            current: function () {
/*Line 21 - AtomEnumerator.js */                return this.items[this.i];
/*Line 22 - AtomEnumerator.js */            },
/*Line 23 - AtomEnumerator.js */            currentIndex: function () {
/*Line 24 - AtomEnumerator.js */                return this.i;
/*Line 25 - AtomEnumerator.js */            },
/*Line 26 - AtomEnumerator.js */            isFirst: function () {
/*Line 27 - AtomEnumerator.js */                return this.i == 0;
/*Line 28 - AtomEnumerator.js */            },
/*Line 29 - AtomEnumerator.js */            isLast: function () {
/*Line 30 - AtomEnumerator.js */                return this.i == this.items.length - 1;
/*Line 31 - AtomEnumerator.js */            },
/*Line 32 - AtomEnumerator.js */            reset: function () {
/*Line 33 - AtomEnumerator.js */                this.i = -1;
/*Line 34 - AtomEnumerator.js */            }
/*Line 35 - AtomEnumerator.js */        }
/*Line 36 - AtomEnumerator.js */    });
/*Line 37 - AtomEnumerator.js */})();


/*Line 40 - AtomEnumerator.js */Array.prototype.enumerator = function () {
/*Line 41 - AtomEnumerator.js */    return new AtomEnumerator(this);
/*Line 42 - AtomEnumerator.js */};

/*Line 44 - AtomEnumerator.js */Array.prototype.remove = function (item) {
/*Line 45 - AtomEnumerator.js */    var array = this;
/*Line 46 - AtomEnumerator.js */    var ae = new AtomEnumerator(array);
/*Line 47 - AtomEnumerator.js */    while (ae.next()) {
/*Line 48 - AtomEnumerator.js */        var arrayItem = ae.current();
/*Line 49 - AtomEnumerator.js */        if (arrayItem == item) {
/*Line 50 - AtomEnumerator.js */            array.splice(ae.currentIndex(), 1);
/*Line 51 - AtomEnumerator.js */            return;
/*Line 52 - AtomEnumerator.js */        }
/*Line 53 - AtomEnumerator.js */    }
/*Line 54 - AtomEnumerator.js */}

/*Line 56 - AtomEnumerator.js */Array.prototype.firstOrDefault = function (f) {
/*Line 57 - AtomEnumerator.js */    var ae = new AtomEnumerator(this);
/*Line 58 - AtomEnumerator.js */    while (ae.next()) {
/*Line 59 - AtomEnumerator.js */        var item = ae.current();
/*Line 60 - AtomEnumerator.js */        if (f(item)) {
/*Line 61 - AtomEnumerator.js */            return item;
/*Line 62 - AtomEnumerator.js */        }
/*Line 63 - AtomEnumerator.js */    }
/*Line 64 - AtomEnumerator.js */    return null;
/*Line 65 - AtomEnumerator.js */};

/*Line 67 - AtomEnumerator.js */if (!Array.prototype.filter) {
/*Line 68 - AtomEnumerator.js */    Array.prototype.filter = function (f) {
/*Line 69 - AtomEnumerator.js */        var r = [];
/*Line 70 - AtomEnumerator.js */        var ae = new AtomEnumerator(this);
/*Line 71 - AtomEnumerator.js */        while (ae.next()) {
/*Line 72 - AtomEnumerator.js */            var item = ae.current();
/*Line 73 - AtomEnumerator.js */            if (f(item)) {
/*Line 74 - AtomEnumerator.js */                r.push(item);
/*Line 75 - AtomEnumerator.js */            }
/*Line 76 - AtomEnumerator.js */        }
/*Line 77 - AtomEnumerator.js */        return r;
/*Line 78 - AtomEnumerator.js */    }
/*Line 79 - AtomEnumerator.js */}

/*Line 81 - AtomEnumerator.js */if (!Array.prototype.indexOf) {

/*Line 83 - AtomEnumerator.js */    Array.prototype.indexOf = function (item) {
/*Line 84 - AtomEnumerator.js */        var i = 0;
/*Line 85 - AtomEnumerator.js */        for (i = 0; i < this.length; i++) {
/*Line 86 - AtomEnumerator.js */            if (item == this[i])
/*Line 87 - AtomEnumerator.js */                return i;
/*Line 88 - AtomEnumerator.js */        }
/*Line 89 - AtomEnumerator.js */        return -1;
/*Line 90 - AtomEnumerator.js */    };

/*Line 92 - AtomEnumerator.js */}
/*Line 1 - EventDispatcher.js */
/*Line 2 - EventDispatcher.js */
/*Line 3 - EventDispatcher.js */

/*Line 5 - EventDispatcher.js */var EventDispatcher = (function () {
/*Line 6 - EventDispatcher.js */    return createClass({
/*Line 7 - EventDispatcher.js */        name: "EventDispatcher",
/*Line 8 - EventDispatcher.js */        start: function () {
/*Line 9 - EventDispatcher.js */            this.eventHandlers = {};
/*Line 10 - EventDispatcher.js */        },
/*Line 11 - EventDispatcher.js */        methods: {
/*Line 12 - EventDispatcher.js */            on: function (name, f) {
/*Line 13 - EventDispatcher.js */                var e = this.eventHandlers[name] = this.eventHandlers[name] || [];
/*Line 14 - EventDispatcher.js */                e.push({name:name, method: f});
/*Line 15 - EventDispatcher.js */            },
/*Line 16 - EventDispatcher.js */            off: function (name, f) {
/*Line 17 - EventDispatcher.js */                var hlist = this.eventHandlers[name];
/*Line 18 - EventDispatcher.js */                if (hlist) {
/*Line 19 - EventDispatcher.js */                    var r = [];
/*Line 20 - EventDispatcher.js */                    var e = hlist.filter(function (i) { return i.name == name; });
/*Line 21 - EventDispatcher.js */                    if (f) {
/*Line 22 - EventDispatcher.js */                        e = e.filter(function (i) { return i.method == f; });
/*Line 23 - EventDispatcher.js */                    }
/*Line 24 - EventDispatcher.js */                    e = e.enumerator();
/*Line 25 - EventDispatcher.js */                    while (e.next()) {
/*Line 26 - EventDispatcher.js */                        r.push(e.current());
/*Line 27 - EventDispatcher.js */                    }
/*Line 28 - EventDispatcher.js */                    e = r.enumerator();
/*Line 29 - EventDispatcher.js */                    while (e.next()) {
/*Line 30 - EventDispatcher.js */                        hlist.remove(e.current());
/*Line 31 - EventDispatcher.js */                    }
/*Line 32 - EventDispatcher.js */                }
/*Line 33 - EventDispatcher.js */            },
/*Line 34 - EventDispatcher.js */            fire: function (name, e) {
/*Line 35 - EventDispatcher.js */                var hlist = this.eventHandlers[name];
/*Line 36 - EventDispatcher.js */                if (hlist) {
/*Line 37 - EventDispatcher.js */                    var e = hlist.enumerator();
/*Line 38 - EventDispatcher.js */                    while (e.next()) {
/*Line 39 - EventDispatcher.js */                        var h = e.current();
/*Line 40 - EventDispatcher.js */                        h.call(this, e);
/*Line 41 - EventDispatcher.js */                    }
/*Line 42 - EventDispatcher.js */                }
/*Line 43 - EventDispatcher.js */            }
/*Line 44 - EventDispatcher.js */        }
/*Line 45 - EventDispatcher.js */    });
/*Line 46 - EventDispatcher.js */})();
/*Line 1 - TestFlowEngine.js */
/*Line 2 - TestFlowEngine.js */

/*Line 4 - TestFlowEngine.js */var TestFlowEngine = (function (base) {
/*Line 5 - TestFlowEngine.js */    return createClass({
/*Line 6 - TestFlowEngine.js */        name: "TestFlowEngine",
/*Line 7 - TestFlowEngine.js */        base: base,
/*Line 8 - TestFlowEngine.js */        start: function () {
/*Line 9 - TestFlowEngine.js */            this._wait = 0;
/*Line 10 - TestFlowEngine.js */            this.actionMap = {
/*Line 11 - TestFlowEngine.js */                "configure": "configure",
/*Line 12 - TestFlowEngine.js */                "navigate": "navigate",
/*Line 13 - TestFlowEngine.js */                "wait-till": "waitTill",
/*Line 14 - TestFlowEngine.js */                "type": "type",
/*Line 15 - TestFlowEngine.js */                "key-press": "keyPress",
/*Line 16 - TestFlowEngine.js */                "click": "click",
/*Line 17 - TestFlowEngine.js */                "assert": "assert",
/*Line 18 - TestFlowEngine.js */                "set-value": "setElementValue"
/*Line 19 - TestFlowEngine.js */            };
/*Line 20 - TestFlowEngine.js */        },
/*Line 21 - TestFlowEngine.js */        properties: {
/*Line 22 - TestFlowEngine.js */            steps: null,
/*Line 23 - TestFlowEngine.js */            config: null,
/*Line 24 - TestFlowEngine.js */            status: 'ready',
/*Line 25 - TestFlowEngine.js */            error: ''
/*Line 26 - TestFlowEngine.js */        },
/*Line 27 - TestFlowEngine.js */        methods: {
/*Line 28 - TestFlowEngine.js */            set_status: function (v) {
/*Line 29 - TestFlowEngine.js */                this._status = v;
/*Line 30 - TestFlowEngine.js */                if (/fail|error/i.test(v)) {
/*Line 31 - TestFlowEngine.js */                    v = "error";
/*Line 32 - TestFlowEngine.js */                }
/*Line 33 - TestFlowEngine.js */                this.fire(v);
/*Line 34 - TestFlowEngine.js */            },
/*Line 35 - TestFlowEngine.js */            pushWait: function () {
/*Line 36 - TestFlowEngine.js */                this._wait++;
/*Line 37 - TestFlowEngine.js */            },
/*Line 38 - TestFlowEngine.js */            popWait: function () {
/*Line 39 - TestFlowEngine.js */                this._wait--;
/*Line 40 - TestFlowEngine.js */            },
/*Line 41 - TestFlowEngine.js */            configure: function (action, c) {
/*Line 42 - TestFlowEngine.js */                var conf = this._config = this._config || {};
/*Line 43 - TestFlowEngine.js */                for (var i in c) {
/*Line 44 - TestFlowEngine.js */                    conf[i] = c[i];
/*Line 45 - TestFlowEngine.js */                }
/*Line 46 - TestFlowEngine.js */                this.fire('config', c);
/*Line 47 - TestFlowEngine.js */            },
/*Line 48 - TestFlowEngine.js */            navigate: function (action, url) {
/*Line 49 - TestFlowEngine.js */            },
/*Line 50 - TestFlowEngine.js */            evalJS: function (exp) {

/*Line 52 - TestFlowEngine.js */            },
/*Line 53 - TestFlowEngine.js */            waitTill: function (action, exp, maxTimeout, interval) {
/*Line 54 - TestFlowEngine.js */                this.pushWait();
/*Line 55 - TestFlowEngine.js */                var self = this;
/*Line 56 - TestFlowEngine.js */                var ms = ((maxTimeout || 60) * 1000);
/*Line 57 - TestFlowEngine.js */                var int = ((interval || 0.1) * 1000);
/*Line 58 - TestFlowEngine.js */                this._interval = setInterval(function () {
/*Line 59 - TestFlowEngine.js */                    var r = self.evalJS(exp);
/*Line 60 - TestFlowEngine.js */                    ms -= int;
/*Line 61 - TestFlowEngine.js */                    if (ms < 0) {
/*Line 62 - TestFlowEngine.js */                        // timeout...
/*Line 63 - TestFlowEngine.js */                        self.set_error('timeout');
/*Line 64 - TestFlowEngine.js */                        self.set_status('failed');
/*Line 65 - TestFlowEngine.js */                        clearInterval(self._interval);
/*Line 66 - TestFlowEngine.js */                        self.popWait();
/*Line 67 - TestFlowEngine.js */                    }
/*Line 68 - TestFlowEngine.js */                    if (r) {
/*Line 69 - TestFlowEngine.js */                        clearInterval(self._interval);
/*Line 70 - TestFlowEngine.js */                        self.popWait();
/*Line 71 - TestFlowEngine.js */                    }
/*Line 72 - TestFlowEngine.js */                }, int);
/*Line 73 - TestFlowEngine.js */            },
/*Line 74 - TestFlowEngine.js */            type: function (action, selector, text) {

/*Line 76 - TestFlowEngine.js */            },
/*Line 77 - TestFlowEngine.js */            keyPress: function (action, selector, keys) {
/*Line 78 - TestFlowEngine.js */            },
/*Line 79 - TestFlowEngine.js */            assert: function (action, exp, msg) {
/*Line 80 - TestFlowEngine.js */                if (!this.evalJS(exp)) {
/*Line 81 - TestFlowEngine.js */                    this.set_error(msg);
/*Line 82 - TestFlowEngine.js */                    this.set_status('assert-failed');
/*Line 83 - TestFlowEngine.js */                }
/*Line 84 - TestFlowEngine.js */            },
/*Line 85 - TestFlowEngine.js */            setElementValue: function (action, element, value) {

/*Line 87 - TestFlowEngine.js */            },
/*Line 88 - TestFlowEngine.js */            run: function () {

/*Line 90 - TestFlowEngine.js */            }
/*Line 91 - TestFlowEngine.js */        }
/*Line 92 - TestFlowEngine.js */    });
/*Line 93 - TestFlowEngine.js */})(EventDispatcher.prototype);
/*Line 1 - TestFlow.PhantomJS.js */
/*Line 2 - TestFlow.PhantomJS.js */
/*Line 3 - TestFlow.PhantomJS.js */
/*Line 4 - TestFlow.PhantomJS.js */

/*Line 6 - TestFlow.PhantomJS.js */var TestFlowPhantomJS = (function (window, base) {
/*Line 7 - TestFlow.PhantomJS.js */    return createClass({
/*Line 8 - TestFlow.PhantomJS.js */        name: "TestFlowPhantomJS",
/*Line 9 - TestFlow.PhantomJS.js */        base: base,
/*Line 10 - TestFlow.PhantomJS.js */        start: function () {

/*Line 12 - TestFlow.PhantomJS.js */            this._page = require('webpage').create();

            

/*Line 16 - TestFlow.PhantomJS.js */        },
/*Line 17 - TestFlow.PhantomJS.js */        methods: {

/*Line 19 - TestFlow.PhantomJS.js */            get_page: function () {
/*Line 20 - TestFlow.PhantomJS.js */                return this._page;
/*Line 21 - TestFlow.PhantomJS.js */            },

/*Line 23 - TestFlow.PhantomJS.js */            configure: function () {
/*Line 24 - TestFlow.PhantomJS.js */                base.configure.apply(this, arguments);
/*Line 25 - TestFlow.PhantomJS.js */            },
/*Line 26 - TestFlow.PhantomJS.js */            navigate: function (action, url) {
/*Line 27 - TestFlow.PhantomJS.js */                this.pushWait();
/*Line 28 - TestFlow.PhantomJS.js */                var self = this;
/*Line 29 - TestFlow.PhantomJS.js */                this._page.open(url, function (status) {
/*Line 30 - TestFlow.PhantomJS.js */                    self.popWait();
/*Line 31 - TestFlow.PhantomJS.js */                    if (status === 'fail') {
/*Line 32 - TestFlow.PhantomJS.js */                        self.set_status('fail');
/*Line 33 - TestFlow.PhantomJS.js */                        return;
/*Line 34 - TestFlow.PhantomJS.js */                    }
/*Line 35 - TestFlow.PhantomJS.js */                });
/*Line 36 - TestFlow.PhantomJS.js */            },
/*Line 37 - TestFlow.PhantomJS.js */            evalJS: function (exp) {
/*Line 38 - TestFlow.PhantomJS.js */                return this._page.evaluateJavaScript(exp);
/*Line 39 - TestFlow.PhantomJS.js */            },
/*Line 40 - TestFlow.PhantomJS.js */            type: function (action, selector, text) {

/*Line 42 - TestFlow.PhantomJS.js */            },
/*Line 43 - TestFlow.PhantomJS.js */            keyPress: function (action, selector, keys) {
/*Line 44 - TestFlow.PhantomJS.js */            },
/*Line 45 - TestFlow.PhantomJS.js */            click: function (action, selector) {

/*Line 47 - TestFlow.PhantomJS.js */            },
/*Line 48 - TestFlow.PhantomJS.js */            setElementValue: function (action, selector, value) {
/*Line 49 - TestFlow.PhantomJS.js */                this._page.evaluate(function (s, v) {
/*Line 50 - TestFlow.PhantomJS.js */                    var e = document.querySelector(s);
/*Line 51 - TestFlow.PhantomJS.js */                    e.value = v;
/*Line 52 - TestFlow.PhantomJS.js */                }, selector, value);
/*Line 53 - TestFlow.PhantomJS.js */            }
/*Line 54 - TestFlow.PhantomJS.js */        }
/*Line 55 - TestFlow.PhantomJS.js */    });
/*Line 56 - TestFlow.PhantomJS.js */})(window,TestFlowEngine.prototype);

})(window);

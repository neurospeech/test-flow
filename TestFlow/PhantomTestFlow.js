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
/*Line 18 - AtomEnumerator.js */                this.i = this.i + 1;
/*Line 19 - AtomEnumerator.js */                return this.i < this.items.length;
/*Line 20 - AtomEnumerator.js */            },
/*Line 21 - AtomEnumerator.js */            current: function () {
/*Line 22 - AtomEnumerator.js */                if(this.i>=0)
/*Line 23 - AtomEnumerator.js */                    return this.items[this.i];
/*Line 24 - AtomEnumerator.js */            },
/*Line 25 - AtomEnumerator.js */            currentIndex: function () {
/*Line 26 - AtomEnumerator.js */                return this.i;
/*Line 27 - AtomEnumerator.js */            },
/*Line 28 - AtomEnumerator.js */            isFirst: function () {
/*Line 29 - AtomEnumerator.js */                return this.i == 0;
/*Line 30 - AtomEnumerator.js */            },
/*Line 31 - AtomEnumerator.js */            isLast: function () {
/*Line 32 - AtomEnumerator.js */                return this.i == this.items.length - 1;
/*Line 33 - AtomEnumerator.js */            },
/*Line 34 - AtomEnumerator.js */            reset: function () {
/*Line 35 - AtomEnumerator.js */                this.i = -1;
/*Line 36 - AtomEnumerator.js */            }
/*Line 37 - AtomEnumerator.js */        }
/*Line 38 - AtomEnumerator.js */    });
/*Line 39 - AtomEnumerator.js */})();


/*Line 42 - AtomEnumerator.js */Array.prototype.enumerator = function () {
/*Line 43 - AtomEnumerator.js */    return new AtomEnumerator(this);
/*Line 44 - AtomEnumerator.js */};

/*Line 46 - AtomEnumerator.js */Array.prototype.remove = function (item) {
/*Line 47 - AtomEnumerator.js */    var array = this;
/*Line 48 - AtomEnumerator.js */    var ae = new AtomEnumerator(array);
/*Line 49 - AtomEnumerator.js */    while (ae.next()) {
/*Line 50 - AtomEnumerator.js */        var arrayItem = ae.current();
/*Line 51 - AtomEnumerator.js */        if (arrayItem == item) {
/*Line 52 - AtomEnumerator.js */            array.splice(ae.currentIndex(), 1);
/*Line 53 - AtomEnumerator.js */            return;
/*Line 54 - AtomEnumerator.js */        }
/*Line 55 - AtomEnumerator.js */    }
/*Line 56 - AtomEnumerator.js */}

/*Line 58 - AtomEnumerator.js */Array.prototype.firstOrDefault = function (f) {
/*Line 59 - AtomEnumerator.js */    var ae = new AtomEnumerator(this);
/*Line 60 - AtomEnumerator.js */    while (ae.next()) {
/*Line 61 - AtomEnumerator.js */        var item = ae.current();
/*Line 62 - AtomEnumerator.js */        if (f(item)) {
/*Line 63 - AtomEnumerator.js */            return item;
/*Line 64 - AtomEnumerator.js */        }
/*Line 65 - AtomEnumerator.js */    }
/*Line 66 - AtomEnumerator.js */    return null;
/*Line 67 - AtomEnumerator.js */};

/*Line 69 - AtomEnumerator.js */if (!Array.prototype.filter) {
/*Line 70 - AtomEnumerator.js */    Array.prototype.filter = function (f) {
/*Line 71 - AtomEnumerator.js */        var r = [];
/*Line 72 - AtomEnumerator.js */        var ae = new AtomEnumerator(this);
/*Line 73 - AtomEnumerator.js */        while (ae.next()) {
/*Line 74 - AtomEnumerator.js */            var item = ae.current();
/*Line 75 - AtomEnumerator.js */            if (f(item)) {
/*Line 76 - AtomEnumerator.js */                r.push(item);
/*Line 77 - AtomEnumerator.js */            }
/*Line 78 - AtomEnumerator.js */        }
/*Line 79 - AtomEnumerator.js */        return r;
/*Line 80 - AtomEnumerator.js */    }
/*Line 81 - AtomEnumerator.js */}

/*Line 83 - AtomEnumerator.js */if (!Array.prototype.indexOf) {

/*Line 85 - AtomEnumerator.js */    Array.prototype.indexOf = function (item) {
/*Line 86 - AtomEnumerator.js */        var i = 0;
/*Line 87 - AtomEnumerator.js */        for (i = 0; i < this.length; i++) {
/*Line 88 - AtomEnumerator.js */            if (item == this[i])
/*Line 89 - AtomEnumerator.js */                return i;
/*Line 90 - AtomEnumerator.js */        }
/*Line 91 - AtomEnumerator.js */        return -1;
/*Line 92 - AtomEnumerator.js */    };

/*Line 94 - AtomEnumerator.js */}
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
/*Line 13 - EventDispatcher.js */                var e = this.eventHandlers[name];
/*Line 14 - EventDispatcher.js */                if (!e) {
/*Line 15 - EventDispatcher.js */                    e = [];
/*Line 16 - EventDispatcher.js */                    this.eventHandlers[name] = e;
/*Line 17 - EventDispatcher.js */                }
/*Line 18 - EventDispatcher.js */                e.push({name:name, method: f});
/*Line 19 - EventDispatcher.js */            },
/*Line 20 - EventDispatcher.js */            off: function (name, f) {
/*Line 21 - EventDispatcher.js */                var hlist = this.eventHandlers[name];
/*Line 22 - EventDispatcher.js */                if (hlist) {
/*Line 23 - EventDispatcher.js */                    var r = [];
/*Line 24 - EventDispatcher.js */                    var e = hlist.filter(function (i) { return i.name == name; });
/*Line 25 - EventDispatcher.js */                    if (f) {
/*Line 26 - EventDispatcher.js */                        e = e.filter(function (i) { return i.method == f; });
/*Line 27 - EventDispatcher.js */                    }
/*Line 28 - EventDispatcher.js */                    e = e.enumerator();
/*Line 29 - EventDispatcher.js */                    while (e.next()) {
/*Line 30 - EventDispatcher.js */                        r.push(e.current());
/*Line 31 - EventDispatcher.js */                    }
/*Line 32 - EventDispatcher.js */                    e = r.enumerator();
/*Line 33 - EventDispatcher.js */                    while (e.next()) {
/*Line 34 - EventDispatcher.js */                        hlist.remove(e.current());
/*Line 35 - EventDispatcher.js */                    }
/*Line 36 - EventDispatcher.js */                }
/*Line 37 - EventDispatcher.js */            },
/*Line 38 - EventDispatcher.js */            fire: function (name, arg) {
/*Line 39 - EventDispatcher.js */                //console.log('fire(' + name + ',' + e + ')');
/*Line 40 - EventDispatcher.js */                var hlist = this.eventHandlers[name];
/*Line 41 - EventDispatcher.js */                if (hlist) {
/*Line 42 - EventDispatcher.js */                    var e = hlist.enumerator();
/*Line 43 - EventDispatcher.js */                    while (e.next()) {
/*Line 44 - EventDispatcher.js */                        var h = e.current();
/*Line 45 - EventDispatcher.js */                        h.method.call(this, arg);
/*Line 46 - EventDispatcher.js */                    }
/*Line 47 - EventDispatcher.js */                }
/*Line 48 - EventDispatcher.js */            }
/*Line 49 - EventDispatcher.js */        }
/*Line 50 - EventDispatcher.js */    });
/*Line 51 - EventDispatcher.js */})();
/*Line 1 - TestFlowEngine.js */
/*Line 2 - TestFlowEngine.js */

/*Line 4 - TestFlowEngine.js */var TestFlowEngine = window.TestFlowEngine = (function (base) {
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
/*Line 23 - TestFlowEngine.js */            network: [],
/*Line 24 - TestFlowEngine.js */            config: {
/*Line 25 - TestFlowEngine.js */                debug: 1
/*Line 26 - TestFlowEngine.js */            },
/*Line 27 - TestFlowEngine.js */            status: 'ready',
/*Line 28 - TestFlowEngine.js */            test: null,
/*Line 29 - TestFlowEngine.js */            step: null,
/*Line 30 - TestFlowEngine.js */            stepIndex: -1,
/*Line 31 - TestFlowEngine.js */            successSteps:[],
/*Line 32 - TestFlowEngine.js */            errorDetail: ''
/*Line 33 - TestFlowEngine.js */        },
/*Line 34 - TestFlowEngine.js */        methods: {
/*Line 35 - TestFlowEngine.js */            debugLog: function (v, level) {
/*Line 36 - TestFlowEngine.js */                var d = this._config.debug;
/*Line 37 - TestFlowEngine.js */                if (d) {
/*Line 38 - TestFlowEngine.js */                    if (level) {
/*Line 39 - TestFlowEngine.js */                        if (level == d) {
/*Line 40 - TestFlowEngine.js */                            console.log(v);
/*Line 41 - TestFlowEngine.js */                        }
/*Line 42 - TestFlowEngine.js */                    } else {
/*Line 43 - TestFlowEngine.js */                        console.log(v);
/*Line 44 - TestFlowEngine.js */                    }
/*Line 45 - TestFlowEngine.js */                }
/*Line 46 - TestFlowEngine.js */            },
/*Line 47 - TestFlowEngine.js */            set_test: function (v) {
/*Line 48 - TestFlowEngine.js */                this._test = v;
/*Line 49 - TestFlowEngine.js */                if (v.config) {
/*Line 50 - TestFlowEngine.js */                    this.configure(v.config);
/*Line 51 - TestFlowEngine.js */                }
/*Line 52 - TestFlowEngine.js */                this.set_network([]);
/*Line 53 - TestFlowEngine.js */                this.set_successSteps([]);
/*Line 54 - TestFlowEngine.js */                this._testEnumerator = new AtomEnumerator(v.steps);
/*Line 55 - TestFlowEngine.js */            },
/*Line 56 - TestFlowEngine.js */            updateRequest: function (url, id, stage) {
/*Line 57 - TestFlowEngine.js */                this.debugLog(this._wait + " :" + stage + ':' + url, 2);
/*Line 58 - TestFlowEngine.js */                var a = this._network;
/*Line 59 - TestFlowEngine.js */                var r = a.firstOrDefault(function (i) { return i.url == url; });
/*Line 60 - TestFlowEngine.js */                if (!r) {
/*Line 61 - TestFlowEngine.js */                    r = { url: url, id: id };
/*Line 62 - TestFlowEngine.js */                    a.push(r);
/*Line 63 - TestFlowEngine.js */                }
/*Line 64 - TestFlowEngine.js */                r.stage = stage;
/*Line 65 - TestFlowEngine.js */                r.time = (new Date()).getTime();
/*Line 66 - TestFlowEngine.js */            },
/*Line 67 - TestFlowEngine.js */            get_step: function () {
/*Line 68 - TestFlowEngine.js */                return this._testEnumerator.current();
/*Line 69 - TestFlowEngine.js */            },
/*Line 70 - TestFlowEngine.js */            get_stepIndex: function () {
/*Line 71 - TestFlowEngine.js */                return this._testEnumerator.currentIndex();
/*Line 72 - TestFlowEngine.js */            },
/*Line 73 - TestFlowEngine.js */            triggerTest: function () {
/*Line 74 - TestFlowEngine.js */                if (!this._runNextHandler) {
/*Line 75 - TestFlowEngine.js */                    var self = this;
/*Line 76 - TestFlowEngine.js */                    this._runNextHandler = function () {
/*Line 77 - TestFlowEngine.js */                        self.runNext();
/*Line 78 - TestFlowEngine.js */                    };
/*Line 79 - TestFlowEngine.js */                }
/*Line 80 - TestFlowEngine.js */                setTimeout(this._runNextHandler, 100);
/*Line 81 - TestFlowEngine.js */            },
/*Line 82 - TestFlowEngine.js */            runNext: function () {
/*Line 83 - TestFlowEngine.js */                if (this._wait) {
/*Line 84 - TestFlowEngine.js */                    this.triggerTest();
/*Line 85 - TestFlowEngine.js */                    return;
/*Line 86 - TestFlowEngine.js */                }

/*Line 88 - TestFlowEngine.js */                this.updateStep();

/*Line 90 - TestFlowEngine.js */                if (this._testEnumerator.next()) {
/*Line 91 - TestFlowEngine.js */                    var s = this.get_step();
/*Line 92 - TestFlowEngine.js */                    var action = s[0];
/*Line 93 - TestFlowEngine.js */                    this.debugLog('executing step ' + JSON.stringify(s),2);
/*Line 94 - TestFlowEngine.js */                    var f = this.actionMap[action];
/*Line 95 - TestFlowEngine.js */                    if (!f) {
/*Line 96 - TestFlowEngine.js */                        this.set_status('error', 'step ' + action + ' not found');
/*Line 97 - TestFlowEngine.js */                        return;
/*Line 98 - TestFlowEngine.js */                    }
/*Line 99 - TestFlowEngine.js */                    this[f].apply(this, s);
/*Line 100 - TestFlowEngine.js */                    this.triggerTest();

/*Line 102 - TestFlowEngine.js */                } else {
/*Line 103 - TestFlowEngine.js */                    // steps finished...
/*Line 104 - TestFlowEngine.js */                    this.set_status('done');
/*Line 105 - TestFlowEngine.js */                }

/*Line 107 - TestFlowEngine.js */            },
/*Line 108 - TestFlowEngine.js */            updateStep: function () {
/*Line 109 - TestFlowEngine.js */                var prevStep = this.get_step();
/*Line 110 - TestFlowEngine.js */                if (!prevStep)
/*Line 111 - TestFlowEngine.js */                    return;
/*Line 112 - TestFlowEngine.js */                this.debugLog('success :) ' + JSON.stringify(prevStep));
/*Line 113 - TestFlowEngine.js */                var s = this.get_successSteps();
/*Line 114 - TestFlowEngine.js */                s.push({
/*Line 115 - TestFlowEngine.js */                    step: prevStep,
/*Line 116 - TestFlowEngine.js */                    time: (new Date()).getTime()            
/*Line 117 - TestFlowEngine.js */                });
/*Line 118 - TestFlowEngine.js */            },
/*Line 119 - TestFlowEngine.js */            set_status: function (v,msg) {
/*Line 120 - TestFlowEngine.js */                this._status = v;
/*Line 121 - TestFlowEngine.js */                if (/fail|error/i.test(v)) {
/*Line 122 - TestFlowEngine.js */                    this._wait = -1;
/*Line 123 - TestFlowEngine.js */                    v = "error";
/*Line 124 - TestFlowEngine.js */                    if (msg) {
/*Line 125 - TestFlowEngine.js */                        this.set_errorDetail(msg);
/*Line 126 - TestFlowEngine.js */                    }
/*Line 127 - TestFlowEngine.js */                }
/*Line 128 - TestFlowEngine.js */                this.fire(v, msg);
/*Line 129 - TestFlowEngine.js */            },
/*Line 130 - TestFlowEngine.js */            init: function () {
/*Line 131 - TestFlowEngine.js */                var self = this;
/*Line 132 - TestFlowEngine.js */                this.on('error', function () {
/*Line 133 - TestFlowEngine.js */                    console.error(self.get_errorDetail())
/*Line 134 - TestFlowEngine.js */                });
/*Line 135 - TestFlowEngine.js */            },
/*Line 136 - TestFlowEngine.js */            load: function () {
/*Line 137 - TestFlowEngine.js */            },
/*Line 138 - TestFlowEngine.js */            pushWait: function () {
/*Line 139 - TestFlowEngine.js */                this._wait++;
/*Line 140 - TestFlowEngine.js */            },
/*Line 141 - TestFlowEngine.js */            popWait: function () {
/*Line 142 - TestFlowEngine.js */                this._wait--;
/*Line 143 - TestFlowEngine.js */            },
/*Line 144 - TestFlowEngine.js */            configure: function (c) {
/*Line 145 - TestFlowEngine.js */                var conf = this._config = this._config || {};
/*Line 146 - TestFlowEngine.js */                for (var i in c) {
/*Line 147 - TestFlowEngine.js */                    conf[i] = c[i];
/*Line 148 - TestFlowEngine.js */                }
/*Line 149 - TestFlowEngine.js */                this.fire('config', c);
/*Line 150 - TestFlowEngine.js */            },
/*Line 151 - TestFlowEngine.js */            navigate: function (action, url) {
/*Line 152 - TestFlowEngine.js */            },
/*Line 153 - TestFlowEngine.js */            evalJS: function (exp) {

/*Line 155 - TestFlowEngine.js */            },
/*Line 156 - TestFlowEngine.js */            waitTill: function (action, exp, maxTimeout, interval) {
/*Line 157 - TestFlowEngine.js */                this.pushWait();
/*Line 158 - TestFlowEngine.js */                var self = this;
/*Line 159 - TestFlowEngine.js */                var ms = ((maxTimeout || 60) * 1000);
/*Line 160 - TestFlowEngine.js */                var int = ((interval || 0.1) * 1000);
/*Line 161 - TestFlowEngine.js */                this._interval = setInterval(function () {
/*Line 162 - TestFlowEngine.js */                    var r = self.evalJS(exp);
/*Line 163 - TestFlowEngine.js */                    ms -= int;
/*Line 164 - TestFlowEngine.js */                    if (ms < 0) {
/*Line 165 - TestFlowEngine.js */                        // timeout...
/*Line 166 - TestFlowEngine.js */                        self.set_status('failed','timeout');
/*Line 167 - TestFlowEngine.js */                        clearInterval(self._interval);
/*Line 168 - TestFlowEngine.js */                        self.popWait();
/*Line 169 - TestFlowEngine.js */                    }
/*Line 170 - TestFlowEngine.js */                    if (r) {
/*Line 171 - TestFlowEngine.js */                        clearInterval(self._interval);
/*Line 172 - TestFlowEngine.js */                        self.popWait();
/*Line 173 - TestFlowEngine.js */                    }
/*Line 174 - TestFlowEngine.js */                }, int);
/*Line 175 - TestFlowEngine.js */            },
/*Line 176 - TestFlowEngine.js */            type: function (action, selector, text) {

/*Line 178 - TestFlowEngine.js */            },
/*Line 179 - TestFlowEngine.js */            keyPress: function (action, selector, keys) {
/*Line 180 - TestFlowEngine.js */            },
/*Line 181 - TestFlowEngine.js */            assert: function (action, exp, msg) {
/*Line 182 - TestFlowEngine.js */                if (!this.evalJS(exp)) {
/*Line 183 - TestFlowEngine.js */                    this.set_status('fail', 'failed :( '  + JSON.stringify(this.get_step()));
/*Line 184 - TestFlowEngine.js */                } 
/*Line 185 - TestFlowEngine.js */            },
/*Line 186 - TestFlowEngine.js */            setElementValue: function (action, element, value) {

/*Line 188 - TestFlowEngine.js */            },
/*Line 189 - TestFlowEngine.js */            run: function () {
/*Line 190 - TestFlowEngine.js */                this.init();
/*Line 191 - TestFlowEngine.js */                this.load();
/*Line 192 - TestFlowEngine.js */                this.triggerTest();
/*Line 193 - TestFlowEngine.js */            }
/*Line 194 - TestFlowEngine.js */        }
/*Line 195 - TestFlowEngine.js */    });
/*Line 196 - TestFlowEngine.js */})(EventDispatcher.prototype);
/*Line 1 - TestFlow.PhantomJS.js */
/*Line 2 - TestFlow.PhantomJS.js */
/*Line 3 - TestFlow.PhantomJS.js */
/*Line 4 - TestFlow.PhantomJS.js */

/*Line 6 - TestFlow.PhantomJS.js */var TestFlowPhantomJS = window.TestFlowPhantomJS = (function (window, base) {


/*Line 9 - TestFlow.PhantomJS.js */    var system = require('system');
/*Line 10 - TestFlow.PhantomJS.js */    var fs = require('fs');

/*Line 12 - TestFlow.PhantomJS.js */    return createClass({
/*Line 13 - TestFlow.PhantomJS.js */        name: "TestFlowPhantomJS",
/*Line 14 - TestFlow.PhantomJS.js */        base: base,
/*Line 15 - TestFlow.PhantomJS.js */        start: function () {

/*Line 17 - TestFlow.PhantomJS.js */            this._page = require('webpage').create();


/*Line 20 - TestFlow.PhantomJS.js */        },
/*Line 21 - TestFlow.PhantomJS.js */        methods: {

/*Line 23 - TestFlow.PhantomJS.js */            get_page: function () {
/*Line 24 - TestFlow.PhantomJS.js */                return this._page;
/*Line 25 - TestFlow.PhantomJS.js */            },
/*Line 26 - TestFlow.PhantomJS.js */            init: function () {

/*Line 28 - TestFlow.PhantomJS.js */                var self = this;

/*Line 30 - TestFlow.PhantomJS.js */                base.init.apply(this, arguments);
                
/*Line 32 - TestFlow.PhantomJS.js */                this._page.onResourceRequested = function (e) {
/*Line 33 - TestFlow.PhantomJS.js */                    self.fire('request', e);
/*Line 34 - TestFlow.PhantomJS.js */                };

/*Line 36 - TestFlow.PhantomJS.js */                this._page.onResourceTimeout = function (e) {
/*Line 37 - TestFlow.PhantomJS.js */                    self.fire('requestTimeout', e);
/*Line 38 - TestFlow.PhantomJS.js */                };
/*Line 39 - TestFlow.PhantomJS.js */                this._page.onResourceReceived = function (e) {
/*Line 40 - TestFlow.PhantomJS.js */                    self.fire('response', e);
/*Line 41 - TestFlow.PhantomJS.js */                };
/*Line 42 - TestFlow.PhantomJS.js */                this._page.onResourceError = function (e) {
/*Line 43 - TestFlow.PhantomJS.js */                    self.fire('responseError', e);
/*Line 44 - TestFlow.PhantomJS.js */                };


/*Line 47 - TestFlow.PhantomJS.js */                this.on('request', function (e) {
/*Line 48 - TestFlow.PhantomJS.js */                    self.pushWait();
/*Line 49 - TestFlow.PhantomJS.js */                    self.updateRequest(e.url, e.id, 'load');
/*Line 50 - TestFlow.PhantomJS.js */                });
/*Line 51 - TestFlow.PhantomJS.js */                this.on('requestTimeout', function (e) {
/*Line 52 - TestFlow.PhantomJS.js */                    self.popWait();
/*Line 53 - TestFlow.PhantomJS.js */                    self.updateRequest(e.url, e.id, 'timeout');
/*Line 54 - TestFlow.PhantomJS.js */                });
/*Line 55 - TestFlow.PhantomJS.js */                this.on('responseError', function (e) {
/*Line 56 - TestFlow.PhantomJS.js */                    self.popWait();
/*Line 57 - TestFlow.PhantomJS.js */                    self.updateRequest(e.url, e.id, 'error');
/*Line 58 - TestFlow.PhantomJS.js */                });
/*Line 59 - TestFlow.PhantomJS.js */                this.on('response', function (e) {
/*Line 60 - TestFlow.PhantomJS.js */                    self.updateRequest(e.url, e.id, e.stage);
/*Line 61 - TestFlow.PhantomJS.js */                    // ignore redirect url
/*Line 62 - TestFlow.PhantomJS.js */                    if (e.redirectURL) {
/*Line 63 - TestFlow.PhantomJS.js */                        return;
/*Line 64 - TestFlow.PhantomJS.js */                    }
/*Line 65 - TestFlow.PhantomJS.js */                    // ignore chunks
/*Line 66 - TestFlow.PhantomJS.js */                    if (e.stage === 'end') {
/*Line 67 - TestFlow.PhantomJS.js */                        self.popWait();
/*Line 68 - TestFlow.PhantomJS.js */                    }
/*Line 69 - TestFlow.PhantomJS.js */                });
/*Line 70 - TestFlow.PhantomJS.js */                this.on('error', function () {
/*Line 71 - TestFlow.PhantomJS.js */                    setTimeout(function () {
/*Line 72 - TestFlow.PhantomJS.js */                        phantom.exit(1);
/*Line 73 - TestFlow.PhantomJS.js */                    }, 1000);
/*Line 74 - TestFlow.PhantomJS.js */                });
/*Line 75 - TestFlow.PhantomJS.js */                this.on('done', function () {
/*Line 76 - TestFlow.PhantomJS.js */                    phantom.exit();
/*Line 77 - TestFlow.PhantomJS.js */                });
/*Line 78 - TestFlow.PhantomJS.js */            },
/*Line 79 - TestFlow.PhantomJS.js */            navigate: function (action, url) {
/*Line 80 - TestFlow.PhantomJS.js */                this.pushWait();
/*Line 81 - TestFlow.PhantomJS.js */                var self = this;
/*Line 82 - TestFlow.PhantomJS.js */                this._page.open(url, function (status) {
/*Line 83 - TestFlow.PhantomJS.js */                    self.popWait();
/*Line 84 - TestFlow.PhantomJS.js */                    if (status === 'fail') {
/*Line 85 - TestFlow.PhantomJS.js */                        self.set_status('fail');
/*Line 86 - TestFlow.PhantomJS.js */                        return;
/*Line 87 - TestFlow.PhantomJS.js */                    }
/*Line 88 - TestFlow.PhantomJS.js */                });
/*Line 89 - TestFlow.PhantomJS.js */            },
/*Line 90 - TestFlow.PhantomJS.js */            evalJS: function (exp) {
/*Line 91 - TestFlow.PhantomJS.js */                return this._page.evaluate(function (e) {
/*Line 92 - TestFlow.PhantomJS.js */                    return eval(e);
/*Line 93 - TestFlow.PhantomJS.js */                }, exp);
/*Line 94 - TestFlow.PhantomJS.js */            },
/*Line 95 - TestFlow.PhantomJS.js */            type: function (action, selector, text) {

/*Line 97 - TestFlow.PhantomJS.js */            },
/*Line 98 - TestFlow.PhantomJS.js */            keyPress: function (action, selector, keys) {
/*Line 99 - TestFlow.PhantomJS.js */            },
/*Line 100 - TestFlow.PhantomJS.js */            click: function (action, selector) {

/*Line 102 - TestFlow.PhantomJS.js */            },
/*Line 103 - TestFlow.PhantomJS.js */            setElementValue: function (action, selector, value) {
/*Line 104 - TestFlow.PhantomJS.js */                this._page.evaluate(function (s, v) {
/*Line 105 - TestFlow.PhantomJS.js */                    var e = document.querySelector(s);
/*Line 106 - TestFlow.PhantomJS.js */                    e.value = v;
/*Line 107 - TestFlow.PhantomJS.js */                }, selector, value);
/*Line 108 - TestFlow.PhantomJS.js */            },
/*Line 109 - TestFlow.PhantomJS.js */            load: function () {


/*Line 112 - TestFlow.PhantomJS.js */                var inputTest = system.args[1];

/*Line 114 - TestFlow.PhantomJS.js */                this.set_test(JSON.parse(fs.read(inputTest)));


/*Line 117 - TestFlow.PhantomJS.js */            }
/*Line 118 - TestFlow.PhantomJS.js */        }
/*Line 119 - TestFlow.PhantomJS.js */    });
/*Line 120 - TestFlow.PhantomJS.js */})(window,TestFlowEngine.prototype);


    window.currentTestEngine = new TestFlowPhantomJS();
    window.currentTestEngine.run();

})(window);



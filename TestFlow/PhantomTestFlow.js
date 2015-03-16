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

/*Line 4 - TestFlowEngine.js */var mimeTypes = {
/*Line 5 - TestFlowEngine.js */    html: "text/html",
/*Line 6 - TestFlowEngine.js */    htm: "text/html",
/*Line 7 - TestFlowEngine.js */    css: "text/css",
/*Line 8 - TestFlowEngine.js */    js: "text/javascript",
/*Line 9 - TestFlowEngine.js */    jpg: "image/jpeg",
/*Line 10 - TestFlowEngine.js */    gif: "image/gif",
/*Line 11 - TestFlowEngine.js */    png: "image/png"
/*Line 12 - TestFlowEngine.js */};


/*Line 15 - TestFlowEngine.js */var FileInfo = function (p) {
/*Line 16 - TestFlowEngine.js */    var s = FileInfo.separator;
/*Line 17 - TestFlowEngine.js */    if (p.indexOf(s) == -1) {
/*Line 18 - TestFlowEngine.js */        s = s == '\\' ? '/' : '\\';
/*Line 19 - TestFlowEngine.js */    }
/*Line 20 - TestFlowEngine.js */    this.pathList = p.split(s);
/*Line 21 - TestFlowEngine.js */}

/*Line 23 - TestFlowEngine.js */FileInfo.separator = "/";

/*Line 25 - TestFlowEngine.js */FileInfo.prototype = {
/*Line 26 - TestFlowEngine.js */    parent: function () {
/*Line 27 - TestFlowEngine.js */        var r = [];
/*Line 28 - TestFlowEngine.js */        var ae = new AtomEnumerator(this.pathList);
/*Line 29 - TestFlowEngine.js */        var oneLess = this.pathList.length - 1;
/*Line 30 - TestFlowEngine.js */        while (ae.next()) {
/*Line 31 - TestFlowEngine.js */            if (ae.currentIndex() < oneLess) {
/*Line 32 - TestFlowEngine.js */                r.push(ae.current());
/*Line 33 - TestFlowEngine.js */            }
/*Line 34 - TestFlowEngine.js */        }
/*Line 35 - TestFlowEngine.js */        return new FileInfo(r.join(FileInfo.separator));
/*Line 36 - TestFlowEngine.js */    },
/*Line 37 - TestFlowEngine.js */    append: function (v) {
/*Line 38 - TestFlowEngine.js */        return new FileInfo(this.toString() + FileInfo.separator + v);
/*Line 39 - TestFlowEngine.js */    },
/*Line 40 - TestFlowEngine.js */    extension: function () {
/*Line 41 - TestFlowEngine.js */        var last = this.pathList[this.pathList.length - 1];
/*Line 42 - TestFlowEngine.js */        if (!last)
/*Line 43 - TestFlowEngine.js */            return "html";
/*Line 44 - TestFlowEngine.js */        last = (last.split('.')).pop();
/*Line 45 - TestFlowEngine.js */        return last;
/*Line 46 - TestFlowEngine.js */    },
/*Line 47 - TestFlowEngine.js */    toString: function () {
/*Line 48 - TestFlowEngine.js */        return this.pathList.join(FileInfo.separator);
/*Line 49 - TestFlowEngine.js */    },
/*Line 50 - TestFlowEngine.js */};

/*Line 52 - TestFlowEngine.js */var UrlInfo = function (p) {
/*Line 53 - TestFlowEngine.js */    var i = p.indexOf('?');
/*Line 54 - TestFlowEngine.js */    if (i !== -1) {
/*Line 55 - TestFlowEngine.js */        this.queryString = p.substr(i + 1);
/*Line 56 - TestFlowEngine.js */        this.pathQuery = p.substr(0, i);
/*Line 57 - TestFlowEngine.js */    } else {
/*Line 58 - TestFlowEngine.js */        this.pathQuery = p;
/*Line 59 - TestFlowEngine.js */    }

/*Line 61 - TestFlowEngine.js */    this.pathQuery = (new FileInfo(this.pathQuery)).toString();
/*Line 62 - TestFlowEngine.js */}

/*Line 64 - TestFlowEngine.js */var TestFlowEngine = window.TestFlowEngine = (function (base) {
/*Line 65 - TestFlowEngine.js */    return createClass({
/*Line 66 - TestFlowEngine.js */        name: "TestFlowEngine",
/*Line 67 - TestFlowEngine.js */        base: base,
/*Line 68 - TestFlowEngine.js */        start: function () {
/*Line 69 - TestFlowEngine.js */            this._wait = 0;
/*Line 70 - TestFlowEngine.js */            this.actionMap = {
/*Line 71 - TestFlowEngine.js */                "configure": "configure",
/*Line 72 - TestFlowEngine.js */                "navigate": "navigate",
/*Line 73 - TestFlowEngine.js */                "wait-till": "waitTill",
/*Line 74 - TestFlowEngine.js */                "type": "type",
/*Line 75 - TestFlowEngine.js */                "key-press": "keyPress",
/*Line 76 - TestFlowEngine.js */                "click": "click",
/*Line 77 - TestFlowEngine.js */                "assert": "assert",
/*Line 78 - TestFlowEngine.js */                "set-value": "setElementValue",
/*Line 79 - TestFlowEngine.js */                "test":"importTest"
/*Line 80 - TestFlowEngine.js */            };
/*Line 81 - TestFlowEngine.js */            this.stack = [];
/*Line 82 - TestFlowEngine.js */            this.results = [];
/*Line 83 - TestFlowEngine.js */        },
/*Line 84 - TestFlowEngine.js */        properties: {
/*Line 85 - TestFlowEngine.js */            steps: null,
/*Line 86 - TestFlowEngine.js */            network: [],
/*Line 87 - TestFlowEngine.js */            config: {
/*Line 88 - TestFlowEngine.js */                debug: 1,
/*Line 89 - TestFlowEngine.js */                port: 3245
/*Line 90 - TestFlowEngine.js */            },
/*Line 91 - TestFlowEngine.js */            status: 'ready',
/*Line 92 - TestFlowEngine.js */            test: null,
/*Line 93 - TestFlowEngine.js */            errorDetail: ''
/*Line 94 - TestFlowEngine.js */        },
/*Line 95 - TestFlowEngine.js */        methods: {
/*Line 96 - TestFlowEngine.js */            debugLog: function (v, level) {
/*Line 97 - TestFlowEngine.js */                var d = this._config.debug;
/*Line 98 - TestFlowEngine.js */                if (d) {
/*Line 99 - TestFlowEngine.js */                    if (level) {
/*Line 100 - TestFlowEngine.js */                        if (level == d) {
/*Line 101 - TestFlowEngine.js */                            console.log(v);
/*Line 102 - TestFlowEngine.js */                        }
/*Line 103 - TestFlowEngine.js */                    } else {
/*Line 104 - TestFlowEngine.js */                        console.log(v);
/*Line 105 - TestFlowEngine.js */                    }
/*Line 106 - TestFlowEngine.js */                }
/*Line 107 - TestFlowEngine.js */            },
/*Line 108 - TestFlowEngine.js */            set_test: function (v) {
/*Line 109 - TestFlowEngine.js */                this._test = v;
/*Line 110 - TestFlowEngine.js */                if (v.config) {
/*Line 111 - TestFlowEngine.js */                    this.configure(v.config);
/*Line 112 - TestFlowEngine.js */                }
/*Line 113 - TestFlowEngine.js */                if (v.index === undefined) {
/*Line 114 - TestFlowEngine.js */                    v.network = [];
/*Line 115 - TestFlowEngine.js */                    var i = 0;
/*Line 116 - TestFlowEngine.js */                    v.steps = v.steps.map(function (item) {
/*Line 117 - TestFlowEngine.js */                        return { id: i++, action: item[0], step: item };
/*Line 118 - TestFlowEngine.js */                    });
/*Line 119 - TestFlowEngine.js */                    v.index = -1;

/*Line 121 - TestFlowEngine.js */                    if (!v.isChild) {
/*Line 122 - TestFlowEngine.js */                        this.results.push(v);
/*Line 123 - TestFlowEngine.js */                    }
/*Line 124 - TestFlowEngine.js */                }
/*Line 125 - TestFlowEngine.js */            },
/*Line 126 - TestFlowEngine.js */            updateRequest: function (url, id, stage, rurl) {
/*Line 127 - TestFlowEngine.js */                this.debugLog(this._wait + " :" + stage + ':' + url, 2);
/*Line 128 - TestFlowEngine.js */                var a = this._test.network;
/*Line 129 - TestFlowEngine.js */                var r = a.firstOrDefault(function (i) { return i.url == url; });
/*Line 130 - TestFlowEngine.js */                if (!r) {
/*Line 131 - TestFlowEngine.js */                    r = { url: url, id: id, states:[] };
/*Line 132 - TestFlowEngine.js */                    a.push(r);
/*Line 133 - TestFlowEngine.js */                }
/*Line 134 - TestFlowEngine.js */                r.stage = stage;
/*Line 135 - TestFlowEngine.js */                r.time = (new Date()).getTime();
/*Line 136 - TestFlowEngine.js */                var state = {
/*Line 137 - TestFlowEngine.js */                    stage: stage,
/*Line 138 - TestFlowEngine.js */                    time: r.time
/*Line 139 - TestFlowEngine.js */                };
/*Line 140 - TestFlowEngine.js */                if (rurl) {
/*Line 141 - TestFlowEngine.js */                    state.redirectUrl = rurl;
/*Line 142 - TestFlowEngine.js */                }
/*Line 143 - TestFlowEngine.js */                r.states.push(state);
/*Line 144 - TestFlowEngine.js */                this.saveResults();
/*Line 145 - TestFlowEngine.js */            },
/*Line 146 - TestFlowEngine.js */            get_step: function () {
/*Line 147 - TestFlowEngine.js */                return this._test.steps[this._test.index];
/*Line 148 - TestFlowEngine.js */            },
/*Line 149 - TestFlowEngine.js */            get_nextStep: function () {
/*Line 150 - TestFlowEngine.js */                var test = this._test;
/*Line 151 - TestFlowEngine.js */                test.index++;
/*Line 152 - TestFlowEngine.js */                return test.index < test.steps.length;
/*Line 153 - TestFlowEngine.js */            },
/*Line 154 - TestFlowEngine.js */            triggerTest: function () {
/*Line 155 - TestFlowEngine.js */                if (!this._runNextHandler) {
/*Line 156 - TestFlowEngine.js */                    var self = this;
/*Line 157 - TestFlowEngine.js */                    this._runNextHandler = function () {
/*Line 158 - TestFlowEngine.js */                        self.runNext();
/*Line 159 - TestFlowEngine.js */                    };
/*Line 160 - TestFlowEngine.js */                }
/*Line 161 - TestFlowEngine.js */                setTimeout(this._runNextHandler, 100);
/*Line 162 - TestFlowEngine.js */            },
/*Line 163 - TestFlowEngine.js */            runNext: function () {
/*Line 164 - TestFlowEngine.js */                if (this._wait) {
/*Line 165 - TestFlowEngine.js */                    this.triggerTest();
/*Line 166 - TestFlowEngine.js */                    return;
/*Line 167 - TestFlowEngine.js */                }

/*Line 169 - TestFlowEngine.js */                this.updateStep();

/*Line 171 - TestFlowEngine.js */                if (this.get_nextStep()) {
/*Line 172 - TestFlowEngine.js */                    var s = this.get_step();
/*Line 173 - TestFlowEngine.js */                    var action = s.action;
/*Line 174 - TestFlowEngine.js */                    this.debugLog('executing step ' + JSON.stringify(s.step),2);
/*Line 175 - TestFlowEngine.js */                    var f = this.actionMap[action];
/*Line 176 - TestFlowEngine.js */                    if (!f) {
/*Line 177 - TestFlowEngine.js */                        this.set_status('error', 'step ' + action + ' not found');
/*Line 178 - TestFlowEngine.js */                        return;
/*Line 179 - TestFlowEngine.js */                    }
/*Line 180 - TestFlowEngine.js */                    this[f].apply(this, s.step);
/*Line 181 - TestFlowEngine.js */                    this.saveResults();
/*Line 182 - TestFlowEngine.js */                    this.triggerTest();

/*Line 184 - TestFlowEngine.js */                } else {
/*Line 185 - TestFlowEngine.js */                    this.debugLog('tests finished');
/*Line 186 - TestFlowEngine.js */                    // steps finished...

/*Line 188 - TestFlowEngine.js */                    // pop tests...
/*Line 189 - TestFlowEngine.js */                    if (this.stack.length) {
/*Line 190 - TestFlowEngine.js */                        var t = this.stack.pop();
/*Line 191 - TestFlowEngine.js */                        this.set_test(t);
/*Line 192 - TestFlowEngine.js */                        this.triggerTest();
/*Line 193 - TestFlowEngine.js */                    } else {
/*Line 194 - TestFlowEngine.js */                        this.set_status('done');
/*Line 195 - TestFlowEngine.js */                    }
/*Line 196 - TestFlowEngine.js */                }

/*Line 198 - TestFlowEngine.js */            },
/*Line 199 - TestFlowEngine.js */            updateStep: function () {
/*Line 200 - TestFlowEngine.js */                var prevStep = this.get_step();
/*Line 201 - TestFlowEngine.js */                if (!prevStep)
/*Line 202 - TestFlowEngine.js */                    return;
/*Line 203 - TestFlowEngine.js */                this.debugLog('success :) ' + JSON.stringify(prevStep.step));
/*Line 204 - TestFlowEngine.js */                prevStep.status = "success";
/*Line 205 - TestFlowEngine.js */                prevStep.time = (new Date()).getTime();

/*Line 207 - TestFlowEngine.js */                this.saveResults();
/*Line 208 - TestFlowEngine.js */            },
/*Line 209 - TestFlowEngine.js */            importTest: function (action, name) {
/*Line 210 - TestFlowEngine.js */            },
/*Line 211 - TestFlowEngine.js */            set_status: function (v,msg) {
/*Line 212 - TestFlowEngine.js */                this._status = v;
/*Line 213 - TestFlowEngine.js */                if (/fail|error/i.test(v)) {
/*Line 214 - TestFlowEngine.js */                    this._wait = -1;
/*Line 215 - TestFlowEngine.js */                    v = "error";
/*Line 216 - TestFlowEngine.js */                    if (msg) {
/*Line 217 - TestFlowEngine.js */                        this.set_errorDetail(msg);
/*Line 218 - TestFlowEngine.js */                    }

/*Line 220 - TestFlowEngine.js */                    var step = this.get_step();
/*Line 221 - TestFlowEngine.js */                    if (step) {
/*Line 222 - TestFlowEngine.js */                        step.status = "failed";
/*Line 223 - TestFlowEngine.js */                        step.details = this.get_errorDetail();
/*Line 224 - TestFlowEngine.js */                    }
/*Line 225 - TestFlowEngine.js */                } else {
/*Line 226 - TestFlowEngine.js */                    this.set_errorDetail("");
/*Line 227 - TestFlowEngine.js */                }
/*Line 228 - TestFlowEngine.js */                this.fire(v, msg);
/*Line 229 - TestFlowEngine.js */            },
/*Line 230 - TestFlowEngine.js */            init: function () {
/*Line 231 - TestFlowEngine.js */                var self = this;
/*Line 232 - TestFlowEngine.js */                this.on('error', function () {
/*Line 233 - TestFlowEngine.js */                    console.error(self.get_errorDetail())
/*Line 234 - TestFlowEngine.js */                });
/*Line 235 - TestFlowEngine.js */            },
/*Line 236 - TestFlowEngine.js */            load: function () {
/*Line 237 - TestFlowEngine.js */            },
/*Line 238 - TestFlowEngine.js */            pushWait: function () {
/*Line 239 - TestFlowEngine.js */                this._wait++;
/*Line 240 - TestFlowEngine.js */            },
/*Line 241 - TestFlowEngine.js */            popWait: function () {
/*Line 242 - TestFlowEngine.js */                this._wait--;
/*Line 243 - TestFlowEngine.js */            },
/*Line 244 - TestFlowEngine.js */            configure: function (c) {
/*Line 245 - TestFlowEngine.js */                var conf = this._config = this._config || {};
/*Line 246 - TestFlowEngine.js */                for (var i in c) {
/*Line 247 - TestFlowEngine.js */                    conf[i] = c[i];
/*Line 248 - TestFlowEngine.js */                }
/*Line 249 - TestFlowEngine.js */                this.fire('config', c);
/*Line 250 - TestFlowEngine.js */            },
/*Line 251 - TestFlowEngine.js */            navigate: function (action, url) {
/*Line 252 - TestFlowEngine.js */            },
/*Line 253 - TestFlowEngine.js */            evalJS: function (exp) {

/*Line 255 - TestFlowEngine.js */            },
/*Line 256 - TestFlowEngine.js */            waitTill: function (action, exp, maxTimeout, interval) {
/*Line 257 - TestFlowEngine.js */                this.pushWait();
/*Line 258 - TestFlowEngine.js */                var self = this;
/*Line 259 - TestFlowEngine.js */                var ms = ((maxTimeout || 60) * 1000);
/*Line 260 - TestFlowEngine.js */                var int = ((interval || 0.1) * 1000);
/*Line 261 - TestFlowEngine.js */                this._interval = setInterval(function () {
/*Line 262 - TestFlowEngine.js */                    var r = self.evalJS(exp);
/*Line 263 - TestFlowEngine.js */                    ms -= int;
/*Line 264 - TestFlowEngine.js */                    if (ms < 0) {
/*Line 265 - TestFlowEngine.js */                        // timeout...
/*Line 266 - TestFlowEngine.js */                        self.set_status('failed','timeout');
/*Line 267 - TestFlowEngine.js */                        clearInterval(self._interval);
/*Line 268 - TestFlowEngine.js */                        self.popWait();
/*Line 269 - TestFlowEngine.js */                    }
/*Line 270 - TestFlowEngine.js */                    if (r) {
/*Line 271 - TestFlowEngine.js */                        clearInterval(self._interval);
/*Line 272 - TestFlowEngine.js */                        self.popWait();
/*Line 273 - TestFlowEngine.js */                    }
/*Line 274 - TestFlowEngine.js */                }, int);
/*Line 275 - TestFlowEngine.js */            },
/*Line 276 - TestFlowEngine.js */            type: function (action, selector, text) {

/*Line 278 - TestFlowEngine.js */            },
/*Line 279 - TestFlowEngine.js */            keyPress: function (action, selector, keys) {
/*Line 280 - TestFlowEngine.js */            },
/*Line 281 - TestFlowEngine.js */            assert: function (action, exp, msg) {
/*Line 282 - TestFlowEngine.js */                if (!this.evalJS(exp)) {
/*Line 283 - TestFlowEngine.js */                    this.set_status('fail', 'failed :( '  + JSON.stringify(this.get_step().step));
/*Line 284 - TestFlowEngine.js */                } 
/*Line 285 - TestFlowEngine.js */            },
/*Line 286 - TestFlowEngine.js */            setElementValue: function (action, element, value) {

/*Line 288 - TestFlowEngine.js */            },
/*Line 289 - TestFlowEngine.js */            run: function () {
/*Line 290 - TestFlowEngine.js */                this.init();
/*Line 291 - TestFlowEngine.js */                this.load();
/*Line 292 - TestFlowEngine.js */                this.triggerTest();
/*Line 293 - TestFlowEngine.js */            },
/*Line 294 - TestFlowEngine.js */            saveResults: function () {
/*Line 295 - TestFlowEngine.js */            }
/*Line 296 - TestFlowEngine.js */        }
/*Line 297 - TestFlowEngine.js */    });
/*Line 298 - TestFlowEngine.js */})(EventDispatcher.prototype);
/*Line 1 - TestFlow.PhantomJS.js */
/*Line 2 - TestFlow.PhantomJS.js */
/*Line 3 - TestFlow.PhantomJS.js */
/*Line 4 - TestFlow.PhantomJS.js */

/*Line 6 - TestFlow.PhantomJS.js */var TestFlowPhantomJS = window.TestFlowPhantomJS = (function (window, base) {



/*Line 10 - TestFlow.PhantomJS.js */    var system = require('system');
/*Line 11 - TestFlow.PhantomJS.js */    var fs = require('fs');


/*Line 14 - TestFlow.PhantomJS.js */    FileInfo.separator = fs.separator;

/*Line 16 - TestFlow.PhantomJS.js */    //console.log(fs.workingDirectory);


/*Line 19 - TestFlow.PhantomJS.js */    var resultFilePath = (function () {
/*Line 20 - TestFlow.PhantomJS.js */        var d = (new Date());
/*Line 21 - TestFlow.PhantomJS.js */        var fileName = d.toJSON().replace("T", "-").replace(".", "-").replace(":", "-").replace(":", "-").replace("Z", "");

/*Line 23 - TestFlow.PhantomJS.js */        return (new FileInfo(fs.workingDirectory)).parent().append("result-" + fileName + ".json");
/*Line 24 - TestFlow.PhantomJS.js */    })();


/*Line 27 - TestFlow.PhantomJS.js */    return createClass({
/*Line 28 - TestFlow.PhantomJS.js */        name: "TestFlowPhantomJS",
/*Line 29 - TestFlow.PhantomJS.js */        base: base,
/*Line 30 - TestFlow.PhantomJS.js */        start: function () {

/*Line 32 - TestFlow.PhantomJS.js */            this._page = require('webpage').create();


/*Line 35 - TestFlow.PhantomJS.js */        },
/*Line 36 - TestFlow.PhantomJS.js */        methods: {

/*Line 38 - TestFlow.PhantomJS.js */            get_page: function () {
/*Line 39 - TestFlow.PhantomJS.js */                return this._page;
/*Line 40 - TestFlow.PhantomJS.js */            },
/*Line 41 - TestFlow.PhantomJS.js */            init: function () {

/*Line 43 - TestFlow.PhantomJS.js */                var self = this;

/*Line 45 - TestFlow.PhantomJS.js */                base.init.apply(this, arguments);
                
/*Line 47 - TestFlow.PhantomJS.js */                this._page.onResourceRequested = function (e) {
/*Line 48 - TestFlow.PhantomJS.js */                    self.fire('request', e);
/*Line 49 - TestFlow.PhantomJS.js */                };

/*Line 51 - TestFlow.PhantomJS.js */                this._page.onResourceTimeout = function (e) {
/*Line 52 - TestFlow.PhantomJS.js */                    self.fire('requestTimeout', e);
/*Line 53 - TestFlow.PhantomJS.js */                };
/*Line 54 - TestFlow.PhantomJS.js */                this._page.onResourceReceived = function (e) {
/*Line 55 - TestFlow.PhantomJS.js */                    self.fire('response', e);
/*Line 56 - TestFlow.PhantomJS.js */                };
/*Line 57 - TestFlow.PhantomJS.js */                this._page.onResourceError = function (e) {
/*Line 58 - TestFlow.PhantomJS.js */                    self.fire('responseError', e);
/*Line 59 - TestFlow.PhantomJS.js */                };


/*Line 62 - TestFlow.PhantomJS.js */                this.on('request', function (e) {
/*Line 63 - TestFlow.PhantomJS.js */                    self.pushWait();
/*Line 64 - TestFlow.PhantomJS.js */                    self.updateRequest(e.url, e.id, 'load');
/*Line 65 - TestFlow.PhantomJS.js */                });
/*Line 66 - TestFlow.PhantomJS.js */                this.on('requestTimeout', function (e) {
/*Line 67 - TestFlow.PhantomJS.js */                    self.popWait();
/*Line 68 - TestFlow.PhantomJS.js */                    self.updateRequest(e.url, e.id, 'timeout');
/*Line 69 - TestFlow.PhantomJS.js */                });
/*Line 70 - TestFlow.PhantomJS.js */                this.on('responseError', function (e) {
/*Line 71 - TestFlow.PhantomJS.js */                    self.popWait();
/*Line 72 - TestFlow.PhantomJS.js */                    self.updateRequest(e.url, e.id, 'error');
/*Line 73 - TestFlow.PhantomJS.js */                });
/*Line 74 - TestFlow.PhantomJS.js */                this.on('response', function (e) {
/*Line 75 - TestFlow.PhantomJS.js */                    self.updateRequest(e.url, e.id, e.stage, e.redirectURL);
/*Line 76 - TestFlow.PhantomJS.js */                    // ignore redirect url
/*Line 77 - TestFlow.PhantomJS.js */                    if (e.redirectURL) {
/*Line 78 - TestFlow.PhantomJS.js */                        //self.popWait();
/*Line 79 - TestFlow.PhantomJS.js */                        //return;
/*Line 80 - TestFlow.PhantomJS.js */                    }
/*Line 81 - TestFlow.PhantomJS.js */                    // ignore chunks
/*Line 82 - TestFlow.PhantomJS.js */                    if (e.status == 204 || e.stage === 'end') {
/*Line 83 - TestFlow.PhantomJS.js */                        self.popWait();
/*Line 84 - TestFlow.PhantomJS.js */                    } else {
/*Line 85 - TestFlow.PhantomJS.js */                        if (!/start|load/i.test(e.stage)) {
/*Line 86 - TestFlow.PhantomJS.js */                            self.debugLog(JSON.stringify(e, undefined, 2));
/*Line 87 - TestFlow.PhantomJS.js */                        }
/*Line 88 - TestFlow.PhantomJS.js */                    }
/*Line 89 - TestFlow.PhantomJS.js */                });
/*Line 90 - TestFlow.PhantomJS.js */                this.on('error', function () {
/*Line 91 - TestFlow.PhantomJS.js */                    self.saveResults();
/*Line 92 - TestFlow.PhantomJS.js */                    setTimeout(function () {
/*Line 93 - TestFlow.PhantomJS.js */                        phantom.exit(1);
/*Line 94 - TestFlow.PhantomJS.js */                    }, 1000);
/*Line 95 - TestFlow.PhantomJS.js */                });
/*Line 96 - TestFlow.PhantomJS.js */                this.on('done', function () {
/*Line 97 - TestFlow.PhantomJS.js */                    self.saveResults();
/*Line 98 - TestFlow.PhantomJS.js */                    phantom.exit();
/*Line 99 - TestFlow.PhantomJS.js */                });
/*Line 100 - TestFlow.PhantomJS.js */            },
/*Line 101 - TestFlow.PhantomJS.js */            navigate: function (action, url) {
/*Line 102 - TestFlow.PhantomJS.js */                this.pushWait();
/*Line 103 - TestFlow.PhantomJS.js */                var self = this;
/*Line 104 - TestFlow.PhantomJS.js */                this._page.open(url, function (status) {
/*Line 105 - TestFlow.PhantomJS.js */                    self.popWait();
/*Line 106 - TestFlow.PhantomJS.js */                    if (status === 'fail') {
/*Line 107 - TestFlow.PhantomJS.js */                        self.set_status('fail');
/*Line 108 - TestFlow.PhantomJS.js */                        return;
/*Line 109 - TestFlow.PhantomJS.js */                    }
/*Line 110 - TestFlow.PhantomJS.js */                });
/*Line 111 - TestFlow.PhantomJS.js */            },
/*Line 112 - TestFlow.PhantomJS.js */            evalJS: function (exp) {
/*Line 113 - TestFlow.PhantomJS.js */                return this._page.evaluate(function (e) {
/*Line 114 - TestFlow.PhantomJS.js */                    return eval(e);
/*Line 115 - TestFlow.PhantomJS.js */                }, exp);
/*Line 116 - TestFlow.PhantomJS.js */            },
/*Line 117 - TestFlow.PhantomJS.js */            type: function (action, selector, text) {

/*Line 119 - TestFlow.PhantomJS.js */            },
/*Line 120 - TestFlow.PhantomJS.js */            keyPress: function (action, selector, keys) {
/*Line 121 - TestFlow.PhantomJS.js */            },
/*Line 122 - TestFlow.PhantomJS.js */            click: function (action, selector) {

/*Line 124 - TestFlow.PhantomJS.js */            },
/*Line 125 - TestFlow.PhantomJS.js */            setElementValue: function (action, selector, value) {
/*Line 126 - TestFlow.PhantomJS.js */                this._page.evaluate(function (s, v) {
/*Line 127 - TestFlow.PhantomJS.js */                    var e = document.querySelector(s);
/*Line 128 - TestFlow.PhantomJS.js */                    e.value = v;
/*Line 129 - TestFlow.PhantomJS.js */                }, selector, value);
/*Line 130 - TestFlow.PhantomJS.js */            },
/*Line 131 - TestFlow.PhantomJS.js */            load: function () {


/*Line 134 - TestFlow.PhantomJS.js */                var inputTest = system.args[1];
/*Line 135 - TestFlow.PhantomJS.js */                //this._config.port = system.args[2] || this._config.port;
/*Line 136 - TestFlow.PhantomJS.js */                //var self = this;

/*Line 138 - TestFlow.PhantomJS.js */                //var webserver = require('webserver');

/*Line 140 - TestFlow.PhantomJS.js */                //var s = webserver.create().listen(this._config.port, {}, function (rin, rout) {
/*Line 141 - TestFlow.PhantomJS.js */                //    try {
/*Line 142 - TestFlow.PhantomJS.js */                //        self.serverGet(rin, rout);
/*Line 143 - TestFlow.PhantomJS.js */                //    } catch (error) {
/*Line 144 - TestFlow.PhantomJS.js */                //        self.debugLog(error);
/*Line 145 - TestFlow.PhantomJS.js */                //    }
/*Line 146 - TestFlow.PhantomJS.js */                //    })
/*Line 147 - TestFlow.PhantomJS.js */                //if (s) {
/*Line 148 - TestFlow.PhantomJS.js */                //    this.debugLog('web server started running on ' + this._config.port);
/*Line 149 - TestFlow.PhantomJS.js */                //}

/*Line 151 - TestFlow.PhantomJS.js */                var isTF = /\.testflow\.json$/i;

/*Line 153 - TestFlow.PhantomJS.js */                if (isTF.test(inputTest)) {
/*Line 154 - TestFlow.PhantomJS.js */                    this.set_test(JSON.parse(fs.read(inputTest)));
/*Line 155 - TestFlow.PhantomJS.js */                }
/*Line 156 - TestFlow.PhantomJS.js */                else {
/*Line 157 - TestFlow.PhantomJS.js */                    // it is folder...
/*Line 158 - TestFlow.PhantomJS.js */                    var files = [];
/*Line 159 - TestFlow.PhantomJS.js */                    function populateList(f) {
/*Line 160 - TestFlow.PhantomJS.js */                        var list = new AtomEnumerator(fs.list(f));
/*Line 161 - TestFlow.PhantomJS.js */                        while (list.next()) {
/*Line 162 - TestFlow.PhantomJS.js */                            var item = list.current();
/*Line 163 - TestFlow.PhantomJS.js */                            if (item == "." || item == "..")
/*Line 164 - TestFlow.PhantomJS.js */                                continue;
/*Line 165 - TestFlow.PhantomJS.js */                            var path = f + fs.separator + item;
/*Line 166 - TestFlow.PhantomJS.js */                            if (fs.isDirectory(path)) {
/*Line 167 - TestFlow.PhantomJS.js */                                populateList(path);
/*Line 168 - TestFlow.PhantomJS.js */                            } else {
/*Line 169 - TestFlow.PhantomJS.js */                                if (isTF.test(path)) {
/*Line 170 - TestFlow.PhantomJS.js */                                    var t = JSON.parse(fs.read(path));
/*Line 171 - TestFlow.PhantomJS.js */                                    t.path = path;
/*Line 172 - TestFlow.PhantomJS.js */                                    files.push(t);
/*Line 173 - TestFlow.PhantomJS.js */                                }
/*Line 174 - TestFlow.PhantomJS.js */                            }
/*Line 175 - TestFlow.PhantomJS.js */                        }
/*Line 176 - TestFlow.PhantomJS.js */                    }

/*Line 178 - TestFlow.PhantomJS.js */                    populateList(inputTest);

/*Line 180 - TestFlow.PhantomJS.js */                    while (files.length) {
/*Line 181 - TestFlow.PhantomJS.js */                        this.stack.push(files.pop());
/*Line 182 - TestFlow.PhantomJS.js */                    }

/*Line 184 - TestFlow.PhantomJS.js */                    if (this.stack.length) {
/*Line 185 - TestFlow.PhantomJS.js */                        this.set_test(this.stack.pop());
/*Line 186 - TestFlow.PhantomJS.js */                    } else {
/*Line 187 - TestFlow.PhantomJS.js */                        this.set_status('error', 'no test flow files found');
/*Line 188 - TestFlow.PhantomJS.js */                    }

/*Line 190 - TestFlow.PhantomJS.js */                }

/*Line 192 - TestFlow.PhantomJS.js */            },
/*Line 193 - TestFlow.PhantomJS.js */            saveResults: function () {

/*Line 195 - TestFlow.PhantomJS.js */                var r = JSON.stringify(this.results, undefined, 2);
/*Line 196 - TestFlow.PhantomJS.js */                fs.write(resultFilePath, r, 'w');

/*Line 198 - TestFlow.PhantomJS.js */            },
/*Line 199 - TestFlow.PhantomJS.js */            serverGet: function (request, response) {
/*Line 200 - TestFlow.PhantomJS.js */                var url = request.url;

/*Line 202 - TestFlow.PhantomJS.js */                this.debugLog(url);

/*Line 204 - TestFlow.PhantomJS.js */                if (url == '/') {
/*Line 205 - TestFlow.PhantomJS.js */                    url = '/result.html';
/*Line 206 - TestFlow.PhantomJS.js */                }
/*Line 207 - TestFlow.PhantomJS.js */                if (/\.(html|htm|css|jpg|gif|map|js|png)/i.test(url)) {
/*Line 208 - TestFlow.PhantomJS.js */                    var path = new FileInfo(fs.workingDirectory);
/*Line 209 - TestFlow.PhantomJS.js */                    path = path.parent().append("web");


/*Line 212 - TestFlow.PhantomJS.js */                    var uri = new UrlInfo(url.substr(1));

/*Line 214 - TestFlow.PhantomJS.js */                    var filePath = path.append(uri.pathQuery);

/*Line 216 - TestFlow.PhantomJS.js */                    var ext = filePath.extension();

/*Line 218 - TestFlow.PhantomJS.js */                    response.statusCode = 200;
/*Line 219 - TestFlow.PhantomJS.js */                    response.headers = {
/*Line 220 - TestFlow.PhantomJS.js */                        'Cache': 'no-cache',
/*Line 221 - TestFlow.PhantomJS.js */                        'Content-Type': (mimeTypes[ext] || 'text/html')
/*Line 222 - TestFlow.PhantomJS.js */                    };
/*Line 223 - TestFlow.PhantomJS.js */                    response.setEncoding('binary');
/*Line 224 - TestFlow.PhantomJS.js */                    response.write(fs.read(filePath.toString()));
/*Line 225 - TestFlow.PhantomJS.js */                    response.close();
/*Line 226 - TestFlow.PhantomJS.js */                } else {
/*Line 227 - TestFlow.PhantomJS.js */                    this.debugLog('invalid url: ' + url);
/*Line 228 - TestFlow.PhantomJS.js */                }
/*Line 229 - TestFlow.PhantomJS.js */            }
/*Line 230 - TestFlow.PhantomJS.js */        }
/*Line 231 - TestFlow.PhantomJS.js */    });
/*Line 232 - TestFlow.PhantomJS.js */})(window,TestFlowEngine.prototype);

    window.currentTestEngine = new TestFlowPhantomJS();
    window.currentTestEngine.run();

})(window);


﻿/// <reference path="AtomPrototype.js" />
/// <reference path="AtomEnumerator.js" />
/// <reference path="AtomQuery.js" />

var EventDispatcher = (function () {
    return createClass({
        name: "EventDispatcher",
        start: function () {
            this.eventHandlers = {};
        },
        methods: {
            on: function (name, f) {
                var e = this.eventHandlers[name] = this.eventHandlers[name] || [];
                e.push({name:name, method: f});
            },
            off: function (name, f) {
                var hlist = this.eventHandlers[name];
                if (hlist) {
                    var r = [];
                    var e = Atom.query(hlist);
                    if (f) e = e.where({ method: f });
                    while (e.next()) {
                        r.push(e.current());
                    }
                    e = r.enumerator();
                    while (e.next()) {
                        hlist.remove(e.current());
                    }
                }
            },
            fire: function (name, e) {
                var hlist = this.eventHandlers[name];
                if (hlist) {
                    var e = hlist.enumerator();
                    while (e.next()) {
                        var h = e.current();
                        h.call(this, e);
                    }
                }
            }
        }
    });
})();
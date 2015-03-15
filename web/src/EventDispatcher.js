/// <reference path="AtomPrototype.js" />
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
                var e = this.eventHandlers[name];
                if (!e) {
                    e = [];
                    this.eventHandlers[name] = e;
                }
                e.push({name:name, method: f});
            },
            off: function (name, f) {
                var hlist = this.eventHandlers[name];
                if (hlist) {
                    var r = [];
                    var e = hlist.filter(function (i) { return i.name == name; });
                    if (f) {
                        e = e.filter(function (i) { return i.method == f; });
                    }
                    e = e.enumerator();
                    while (e.next()) {
                        r.push(e.current());
                    }
                    e = r.enumerator();
                    while (e.next()) {
                        hlist.remove(e.current());
                    }
                }
            },
            fire: function (name, arg) {
                //console.log('fire(' + name + ',' + e + ')');
                var hlist = this.eventHandlers[name];
                if (hlist) {
                    var e = hlist.enumerator();
                    while (e.next()) {
                        var h = e.current();
                        h.method.call(this, arg);
                    }
                }
            }
        }
    });
})();
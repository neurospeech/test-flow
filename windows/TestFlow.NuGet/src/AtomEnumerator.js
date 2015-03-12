/// <reference path="AtomPrototype.js" />

var Atom = {};

var AtomConfig = {};



var AtomEnumerator = window.AtomEnumerator = (function () {
    return createClass({
        name: 'AtomEnumerator',
        start: function (items) {
            this.items = items;
            this.i = -1;
        },
        methods: {
            next: function () {
                return (this.i++) < this.items.length;
            },
            current: function () {
                return this.items[this.i];
            },
            currentIndex: function () {
                return this.i;
            },
            isFirst: function () {
                return this.i == 0;
            },
            isLast: function () {
                return this.i == this.items.length - 1;
            },
            reset: function () {
                this.i = -1;
            }
        }
    });
})();


Array.prototype.enumerator = function () {
    return new AtomEnumerator(this);
};

Array.prototype.remove = function (item) {
    var array = this;
    var ae = new AtomEnumerator(array);
    while (ae.next()) {
        var arrayItem = ae.current();
        if (arrayItem == item) {
            array.splice(ae.currentIndex(), 1);
            return;
        }
    }
}

if (!Array.prototype.filter) {
    Array.prototype.filter = function (f) {
        var r = [];
        var ae = new AtomEnumerator(this);
        while (ae.next()) {
            var item = ae.current();
            if (f(item)) {
                r.push(item);
            }
        }
        return r;
    }
}

if (!Array.prototype.indexOf) {

    Array.prototype.indexOf = function (item) {
        var i = 0;
        for (i = 0; i < this.length; i++) {
            if (item == this[i])
                return i;
        }
        return -1;
    };

}
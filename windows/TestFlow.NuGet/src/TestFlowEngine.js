/// <reference path="AtomPrototype.js" />
/// <reference path="EventDispatcher.js" />

var TestFlowEngine = (function (base) {
    return createClass({
        name: "TestFlowEngine",
        base: base,
        start: function () {
            this._wait = 0;
        },
        properties: {
            steps: null,
            config: null,
            status: 'ready'
        },
        methods: {
            set_status: function (v) {
                this._status = v;
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
            }
        }
    });
})(EventDispatcher.prototype);
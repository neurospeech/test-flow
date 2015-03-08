/// <reference path="../AtomPrototype.js" />
/// <reference path="../TestFlowEngine.js" />

var TestFlowPhantomJS = (function (window, base) {
    return createClass({
        name: "TestFlowPhantomJS",
        base: base,
        start: function () {
        },
        methods: {
            configure: function () {
                base.configure.apply(this, arguments);
            }
        }
    });
})(window,TestFlowEngine.prototype);
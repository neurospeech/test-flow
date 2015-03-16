/// <reference path="../AtomEnumerator.js" />
/// <reference path="../AtomPrototype.js" />
/// <reference path="../EventDispatcher.js" />
/// <reference path="../TestFlowEngine.js" />

var TestFlowPhantomJS = window.TestFlowPhantomJS = (function (window, base) {



    var system = require('system');
    var fs = require('fs');


    FileInfo.separator = fs.separator;

    //console.log(fs.workingDirectory);


    var resultFilePath = (function () {
        var d = (new Date());
        var fileName = d.toJSON().replace("T", "-").replace(".", "-").replace(":", "-").replace(":", "-").replace("Z", "");

        return (new FileInfo(fs.workingDirectory)).parent().append("result-" + fileName + ".json");
    })();


    return createClass({
        name: "TestFlowPhantomJS",
        base: base,
        start: function () {

            this._page = require('webpage').create();


        },
        methods: {

            get_page: function () {
                return this._page;
            },
            init: function () {

                var self = this;

                base.init.apply(this, arguments);
                
                this._page.onResourceRequested = function (e) {
                    self.fire('request', e);
                };

                this._page.onResourceTimeout = function (e) {
                    self.fire('requestTimeout', e);
                };
                this._page.onResourceReceived = function (e) {
                    self.fire('response', e);
                };
                this._page.onResourceError = function (e) {
                    self.fire('responseError', e);
                };


                this.on('request', function (e) {
                    self.pushWait();
                    self.updateRequest(e.url, e.id, 'load');
                });
                this.on('requestTimeout', function (e) {
                    self.popWait();
                    self.updateRequest(e.url, e.id, 'timeout');
                });
                this.on('responseError', function (e) {
                    self.popWait();
                    self.updateRequest(e.url, e.id, 'error');
                });
                this.on('response', function (e) {
                    self.updateRequest(e.url, e.id, e.stage, e.redirectURL);
                    // ignore redirect url
                    if (e.redirectURL) {
                        //self.popWait();
                        //return;
                    }
                    // ignore chunks
                    if (e.status == 204 || e.stage === 'end') {
                        self.popWait();
                    } else {
                        if (!/start|load/i.test(e.stage)) {
                            self.debugLog(JSON.stringify(e, undefined, 2));
                        }
                    }
                });
                this.on('error', function () {
                    self.saveResults();
                    setTimeout(function () {
                        phantom.exit(1);
                    }, 1000);
                });
                this.on('done', function () {
                    self.saveResults();
                    phantom.exit();
                });
            },
            navigate: function (action, url) {
                this.pushWait();
                var self = this;
                this._page.open(url, function (status) {
                    self.popWait();
                    if (status === 'fail') {
                        self.set_status('fail');
                        return;
                    }
                });
            },
            evalJS: function (exp) {
                return this._page.evaluate(function (e) {
                    return eval(e);
                }, exp);
            },
            type: function (action, selector, text) {

            },
            keyPress: function (action, selector, keys) {
            },
            click: function (action, args) {
                if (args.constructor === String) {

                } else {

                }
            },
            setElementValue: function (action, selector, value) {
                this._page.evaluate(function (s, v) {
                    var e = document.querySelector(s);
                    e.value = v;
                }, selector, value);
            },
            upload: function (action, selector, value) {
                this._page.uploadFile(selector, value);
            },
            load: function () {


                var inputTest = system.args[1];

                //this._config.port = system.args[2] || this._config.port;
                //var self = this;

                //var webserver = require('webserver');

                //var s = webserver.create().listen(this._config.port, {}, function (rin, rout) {
                //    try {
                //        self.serverGet(rin, rout);
                //    } catch (error) {
                //        self.debugLog(error);
                //    }
                //    })
                //if (s) {
                //    this.debugLog('web server started running on ' + this._config.port);
                //}

                var isTF = /\.testflow\.json$/i;

                if (isTF.test(inputTest)) {
                    this.set_test(JSON.parse(fs.read(inputTest)));
                }
                else {
                    // it is folder...
                    var files = [];
                    function populateList(f) {
                        var list = new AtomEnumerator(fs.list(f));
                        while (list.next()) {
                            var item = list.current();
                            if (item == "." || item == "..")
                                continue;
                            var path = f + fs.separator + item;
                            if (fs.isDirectory(path)) {
                                populateList(path);
                            } else {
                                if (isTF.test(path)) {
                                    var t = JSON.parse(fs.read(path));
                                    t.path = path;
                                    files.push(t);
                                }
                            }
                        }
                    }

                    populateList(inputTest);

                    while (files.length) {
                        this.stack.push(files.pop());
                    }

                    if (this.stack.length) {
                        this.set_test(this.stack.pop());
                    } else {
                        this.set_status('error', 'no test flow files found');
                    }

                }

            },
            saveResults: function () {

                var r = JSON.stringify(this.results, undefined, 2);
                fs.write(resultFilePath, r, 'w');

            },
            serverGet: function (request, response) {
                var url = request.url;

                this.debugLog(url);

                if (url == '/') {
                    url = '/result.html';
                }
                if (/\.(html|htm|css|jpg|gif|map|js|png)/i.test(url)) {
                    var path = new FileInfo(fs.workingDirectory);
                    path = path.parent().append("web");


                    var uri = new UrlInfo(url.substr(1));

                    var filePath = path.append(uri.pathQuery);

                    var ext = filePath.extension();

                    response.statusCode = 200;
                    response.headers = {
                        'Cache': 'no-cache',
                        'Content-Type': (mimeTypes[ext] || 'text/html')
                    };
                    response.setEncoding('binary');
                    response.write(fs.read(filePath.toString()));
                    response.close();
                } else {
                    this.debugLog('invalid url: ' + url);
                }
            }
        }
    });
})(window,TestFlowEngine.prototype);
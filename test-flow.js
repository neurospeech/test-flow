// JavaScript source code

var TestFlow = (function (window) {

    var status = 'ready';
    var halt = 0;
    var steps = null;
    var index = -1;

  
  return {
    
      status: function (s, d) {
          if (!arguments.length)
              return status;
          status = s;
          if(/error/i.test(s)){
            throw new Error(d);
          }
      },

      haltAdd: function () {
          halt++;
      },
      haltRemove: function () {
          halt--;
      },
      configure: function (action, config) {
          for (var i in config) {
              this.config[i] = config[i];
          }
      },

    moveNext: function(){
      if(!steps)
        throw new Error('Steps are not loaded');
      index++;
      return index < steps.length;
    },
    

    config: {
      noWaitUrl: null
    },
    
    
    registerActions: function (fac) {
        for (var i in fac) {
            this.actions[i] = fac[i];
        }
    },
    
    run: function(t){
      steps = t;
      index = -1;
      this.status('started');
      this.runStep();
    },
    
    runStep: function(){
      this.lastError = null;
      if(!halt){
        if(this.moveNext()){
          var step = steps[this.index];
          var action= step[0];
          var f  = this[action];
          if(!f){
            this.status('error',action + ' action not defined');
          }
          f.apply(this,step);
        }else{
          this.status('done');
        }
      }
      setTimeout(testFlow.runStep,100);
    },
    
  };
  
})(window);

var PhantomJSTester = (function (window, TestFlow) {

    var page = require('webpage').create();

    var noWaitUrl = null;

    page.onResourceRequested = function (rd, nr) {
        if (!(noWaitUrl && noWaitUrl.test(rd.url))) {
            TestFlow.halt++;
        }
    };

    var oldConfig = TestFlow.actions.configure;
    TestFlow.registerActions({
        configure: function (action, config) {
            oldConfig.apply(TestFlow, arguments);
            noWaitUrl = new RegExp(TestFlow.config.noWaitUrl);
        },
        navigate: function (action,url) {
            TestFlow.halt++;
            page.open(url, function (status) {
                TestFlow.halt--;
            });
        }
    });
    
 

})(window, TestFlow)();
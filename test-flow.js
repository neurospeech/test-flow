// JavaScript source code

var TestFlow = (function(window){
  
  return {
    status: 'ready',
    
    state: function(s,d){
      this.status = s;
      if(/error/i.test(s)){
        throw new Error(d);
      }
    },
    
    halt: 0,
    
    steps: null,
    index:-1,
    moveNext: function(){
      var steps = this.steps;
      if(!steps)
        throw new Error('Steps are not loaded');
      this.index++;
      return this.index < steps.length;
    },
    

    config: {
      noWaitUrl: null
    },
    
    // registered actions..    
    actions:{
      
      // configure method
      configure: function(action,config){
        for(var i in config){
          this.config[i] = config[i];
        }
      }
    },
    
    registerActions: function (fac) {
        for (var i in fac) {
            this.actions[i] = fac[i];
        }
    },
    
    run: function(t){
      this.steps = t;
      this.index = -1;
      this.state('started');
      this.runStep();
    },
    
    runStep: function(){
      this.lastError = null;
      if(!this.halt){
        if(this.moveNext()){
          var step = this.steps[this.index];
          var action= step[0];
          var f  = this.actions[action];
          if(!f){
            this.state('error',action + ' action not defined');
          }
          f.apply(this,step);
        }else{
          this.state('done');
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
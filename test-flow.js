// JavaScript source code

var testFlow = (function(window){
  
  return {
    status: 'ready',
    
    state: function(s,d){
      this.status = s;
      if(/error/i.test(s)){
        throw new Error(d);
      }
    },
    
    halt: false,
    
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
      "ignore-ajax": null
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
    
    register: function(name, f){
      if(this.actions[name])
        throw new Error('Function ' + name + ' is already registered.');
      this.actions[name] = f;
    },
    
    unregister: function(name,f){
      this.actions[name] = null;
    },
    
    run: function(t){
      this.steps = t;
      this.index = -1;
      this.state('running');
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
        }else{
          this.state('done');
        }
      }
      setTimeout(testFlow.runStep,100);
    },
    
  };
  
})(window);

(function(global) {
  /**
  */
  var Log = global.Log;
  var Scheduler = global.Scheduler;

  /*
  */
  var Exception = {};

  /*
  */
  Exception.handle = function(exception) {
    Log.error('exception', exception.hasOwnProperty('stack') ? exception.stack : exception);
  }

  /*
  */
  Exception.deferred = function(exception) {
    Scheduler.deferred(this.handle.bind(this, exception));
  }

  /*
  */
  global.Exception = Exception;
})(window);

(function(global) {
  /*
  */
  var exception = {};

  /*
  */
  exception.handle = function(exception) {
    log.error('exception', exception.hasOwnProperty('stack') ? exception.stack : exception);
  }

  /*
  */
  exception.deferred = function(exception) {
    scheduler.deferred(this.handle.bind(this, exception));
  }

  /*
  */
  global.exception = exception;
})(window);

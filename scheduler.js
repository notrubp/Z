(function(global) {
  /*
  */
  var scheduler = {};

  /*
  */
  scheduler.deferred = function(callback) {
    return setTimeout(callback, 0);
  }

  /*
  */
  scheduler.raf = function(callback) {
    return requestAnimationFrame(callback);
  }

  /*
  */
  global.scheduler = scheduler;
})(window);

(function(global) {
  /*
  */
  var Scheduler = {};

  /*
  */
  Scheduler.deferred = function(callback) {
    return setTimeout(callback, 0);
  }

  /*
   * requestAnimationFrame polyfill.
  */
  var vendors = [ 'ms', 'moz', 'webkit', 'o' ];

  for ( var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
    window.requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[i] + 'CancelAnimationFrame'] || window[vendors[i] + 'CancelRequestAnimationFrame'];
  }

  var last = 0;

  window.polyfillRequestAnimationFrame = function(callback) {
    var cur = new Date().getTime();
    var time = Math.max(0, 16 - (cur - last));

    var id = setTimeout(function() {
      callback(cur + time);
    }, time);

    last = cur + time;

    return id;
  };

  window.polyfillCancelAnimationFrame = function(id) {
    clearTimeout(id);
  };

  window.isPolyfillRequestAnimationFrame = !window.requestAnimationFrame;

  if (window.isPolyfillRequestAnimationFrame) {
    window.requestAnimationFrame = window.polyfillRequestAnimationFrame;
    window.cancelAnimationFrame = window.polyfillCancelAnimationFrame;
  }

  /*
  */
  Scheduler.raf = function(callback) {
    return requestAnimationFrame(callback);
  }

  /*
  */
  global.Scheduler = Scheduler;
})(window);

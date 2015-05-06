(function(global) {
  /*
  */
  var Time = {};

  /*
  */
  Time.now = function() {
    return new Date().getTime();
  }

  /*
  */
  global.Time = Time;
})(window);

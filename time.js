(function(global) {
  /*
  */
  var time = {};

  /*
  */
  time.now = function() {
    return new Date().getTime();
  }

  /*
  */
  global.time = time;
})(window);

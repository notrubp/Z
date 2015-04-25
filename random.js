(function(global) {
  /*
  */
  var random = {};

  /*
  */
  random.ratio = function() {
    return Math.random();
  }

  /*
  */
  random.number = function() {
    return Math.floor(Math.random() * 4294967296) - 2147483648;
  }

  /*
  */
  random.range = function(upper_bound) {
    return Math.floor(Math.random() * upper_bound);
  }

  /*
  */
  global.random = random;
})(window);

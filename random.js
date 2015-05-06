(function(global) {
  /*
  */
  var Random = {};

  /*
  */
  Random.ratio = function() {
    return Math.random();
  }

  /*
  */
  Random.number = function() {
    return Math.floor(Math.random() * 4294967296) - 2147483648;
  }

  /*
  */
  Random.range = function(upperBound) {
    return Math.floor(Math.random() * upperBound);
  }

  /*
  */
  global.Random = Random;
})(window);

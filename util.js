(function(global) {
  /*
  */
  var util = {};

  /*
  */
  util.make_binding_wrapper = function(constructor, member) {
    return function() {
      return member.apply(new constructor(), arguments);
    }
  }

  /*
  */
  global.util = util;
})(window);

(function(global) {
  /*
  */
  var Util = {};

  /*
  */
  Util.makeBindingWrapper = function(ctor, member) {
    return function() {
      return member.apply(new ctor(), arguments);
    }
  }

  /*
  */
  global.Util = Util;
})(window);

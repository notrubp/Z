(function(global) {
  /*
  */
  var Util = global.Util;
  var Property = global.Property;

  /*
  */
  var Binding = function() {
    this.clear();
  }

  /*
  */
  Binding.prototype.__propertyHook = function() {
    return this.css;
  }

  Binding.prototype.clear = function() {
    this.css = '';
  }

  /*
  */
  Binding.prototype.bind = function(prop, duration, timing, delay) {
    duration = duration || 0;
    timing = timing || 'ease';
    delay = delay || 0;

    if (this.css.length > 0) {
      this.css += ', ';
    }

    // Evaluate property fixups.
    prop = Property.fixupNocc(prop);

    this.css += prop + ' ' + duration + 's ' + timing + ' ' + delay + 's';

    return this;
  }

  /*
  */
  var Transition = {};

  /*
  */
  Transition.clear = Util.makeBindingWrapper(Binding, Binding.prototype.clear);

  /*
  */
  Transition.bind = Util.makeBindingWrapper(Binding, Binding.prototype.bind);

  /*
  */
  global.Transition = Transition;
})(window);

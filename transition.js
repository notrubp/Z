(function(global) {
  /*
  */
  var util = global.util;
  var property = global.property;

  /*
  */
  var binding = function() {
    this.clear();
  }

  /*
  */
  binding.prototype.__property_hook = function() {
    return this.css;
  }

  binding.prototype.clear = function() {
    this.css = '';
  }

  /*
  */
  binding.prototype.bind = function(prop, duration, timing, delay) {
    duration = duration || 0;
    timing = timing || 'ease';
    delay = delay || 0;

    if (this.css.length > 0) {
      this.css += ', ';
    }

    // Evaluate property fixups.
    prop = property.fixup_nocc(prop);

    this.css += prop + ' ' + duration + 's ' + timing + ' ' + delay + 's';

    return this;
  }

  /*
  */
  var transition = {};

  /*
  */
  transition.clear = util.make_binding_wrapper(binding, binding.prototype.clear);

  /*
  */
  transition.bind = util.make_binding_wrapper(binding, binding.prototype.bind);

  /*
  */
  global.transition = transition;
})(window);

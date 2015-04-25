(function(global) {
  /*
  */
  var util = global.util;

  /*
  */
  var binding = function(r, g, b, a) {
    this.r = r || 0;
    this.g = g || 0;
    this.b = b || 0;
    this.a = a || 1;
  }

  /*
  */
  binding.prototype.__property_hook = function() {
    return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
  }

  /*
  */
  binding.prototype.rgb = function(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
    return this;
  }

  /*
  */
  binding.prototype.rgba = function(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    return this;
  }

  /*
  */
  binding.prototype.random_rgb = function() {
    return this.random_rgba(1);
  }

  /*
  */
  binding.prototype.random_rgba = function(a) {
    return this.rgba(random.range(255), random.range(255), random.range(255), a);
  }

  /*
  */
  var color = {};

  /*
  */
  color.rgb = util.make_binding_wrapper(binding, binding.prototype.rgb);

  /*
  */
  color.rgba = util.make_binding_wrapper(binding, binding.prototype.rgba);

  /*
  */
  color.random_rgb = util.make_binding_wrapper(binding, binding.prototype.random_rgb);

  /*
  */
  color.random_rgba = util.make_binding_wrapper(binding, binding.prototype.random_rgba);

  /*
  */
  global.color = color;
})(window);

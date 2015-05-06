(function(global) {
  /*
  */
  var Util = global.Util;
  var Random = global.Random;

  /*
  */
  var Binding = function(r, g, b, a) {
    this.r = r || 0;
    this.g = g || 0;
    this.b = b || 0;
    this.a = a || 1;
  }

  /*
  */
  Binding.prototype.__propertyHook = function() {
    return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
  }

  /*
  */
  Binding.prototype.rgb = function(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
    return this;
  }

  /*
  */
  Binding.prototype.rgba = function(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    return this;
  }

  /*
  */
  Binding.prototype.randomRgb = function() {
    return this.randomRgba(1);
  }

  /*
  */
  Binding.prototype.randomRgba = function(a) {
    return this.rgba(Random.range(255), Random.range(255), Random.range(255), a);
  }

  /*
  */
  var Color = {};

  /*
  */
  Color.rgb = Util.makeBindingWrapper(Binding, Binding.prototype.rgb);

  /*
  */
  Color.rgba = Util.makeBindingWrapper(Binding, Binding.prototype.rgba);

  /*
  */
  Color.randomRgb = Util.makeBindingWrapper(Binding, Binding.prototype.randomRgb);

  /*
  */
  Color.randomRgba = Util.makeBindingWrapper(Binding, Binding.prototype.randomRgba);

  /*
  */
  global.Color = Color;
})(window);

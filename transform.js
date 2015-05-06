(function(global) {
  /*
  */
  var Util = global.Util;

  /*
  */
  function fixup(_this) {
    if (_this.css === 'none') {
      _this.css = '';
    } else if (_this.css.length > 0) {
      _this.css += ' ';
    }
  }

  /*
  */
  var Binding = function() {
    this.none();
  }

  /*
  */
  Binding.prototype.__propertyHook = function() {
    return this.css;
  }
  
  /*
  */
  Binding.prototype.none = function() {
    this.css = 'none';
    return this;
  }

  /*
  */
  Binding.prototype.matrix = function(xx, xy, yx, yy, tx, ty) {
    fixup(this);
    this.css += 'matrix(' + xx + ',' + xy + ',' + yx + ',' + yy + ',' + tx + ',' + ty + ')';
    return this;
  }

  /*
  */
  Binding.prototype.matrix3d = function(xx, xy, xz, xw, yx, yy, yz, yw, zx, zy, zz, zw, tx, ty, tz, tw) {
    fixup(this);
    this.css += 'matrix3d(' + xx + ',' + xy + ',' + xz + ',' + xw + ',' + yx + ',' + yy + ',' + yz + ',' + yw + ',' + zx + ',' + zy + ',' + zz + ',' + zw + ',' + tx + ',' + ty + ',' + tz + ',' + tw + ')';
    return this;
  }

  /*
  */
  Binding.prototype.translate = function(x, y) {
    fixup(this);
    this.css += 'translate(' + x + ',' + y + ')';
    return this;
  }

  /*
  */
  Binding.prototype.translate3d = function(x, y, z) {
    fixup(this);
    this.css += 'translate3d(' + x + ',' + y + ',' + z + ')';
    return this;
  }

  /*
  */
  Binding.prototype.translateX = function(x) {
    fixup(this);
    this.css += 'translateX(' + x + ')';
    return this;
  }

  /*
  */
  Binding.prototype.translateY = function(y) {
    fixup(this);
    this.css += 'translateY(' + y + ')';
    return this;
  }

  /*
  */
  Binding.prototype.translateZ = function(z) {
    fixup(this);
    this.css += 'translateZ(' + z + ')';
    return this;
  }

  /*
  */
  Binding.prototype.scale = function(x, y) {
    fixup(this);
    this.css += 'scale(' + x + ',' + y + ')';
    return this;
  }

  /*
  */
  Binding.prototype.scale3d = function(x, y, z) {
    fixup(this);
    this.css += 'scale3d(' + x + ',' + y + ',' + z + ')';
    return this;
  }

  /*
  */
  Binding.prototype.scaleX = function(x) {
    fixup(this);
    this.css += 'scaleX(' + x + ')';
    return this;
  }

  /*
  */
  Binding.prototype.scaleY = function(y) {
    fixup(this);
    this.css += 'scaleY(' + y + ')';
    return this;
  }

  /*
  */
  Binding.prototype.scaleZ = function(z) {
    fixup(this);
    this.css += 'scaleZ(' + z + ')';
    return this;
  }

  /*
  */
  Binding.prototype.rotate = function(a) {
    fixup(this);
    this.css += 'rotate(' + a + 'rad)';
    return this;
  }

  /*
  */
  Binding.prototype.rotate3d = function(x, y, z) {
    fixup(this);
    this.css += 'rotate3d(' + x + 'rad,' + y + 'rad,' + z + 'rad)';
    return this;
  }

  /*
  */
  Binding.prototype.rotateX = function(x) {
    fixup(this);
    this.css += 'rotateX(' + x + 'rad)';
    return this;
  }

  /*
  */
  Binding.prototype.rotateY = function(y) {
    fixup(this);
    this.css += 'rotateY(' + y + 'rad)';
    return this;
  }

  /*
  */
  Binding.prototype.rotateZ = function(z) {
    fixup(this);
    this.css += 'rotateZ(' + z + 'rad)';
    return this;
  }

  /*
  */
  Binding.prototype.skew = function(x, y) {
    fixup(this);
    this.css += 'skew(' + x + 'rad,' + y + 'rad)';
    return this;
  }

  /*
  */
  Binding.prototype.skewX = function(x) {
    fixup(this);
    this.css += 'skewX(' + x + 'rad)';
    return this;
  }

  /*
  */
  Binding.prototype.skewY = function(y) {
    fixup(this);
    this.css += 'skewY(' + y + 'rad)';
    return this;
  }

  /*
  */
  var Transform = {};

  /*
  */
  Transform.none = Util.makeBindingWrapper(Binding, Binding.prototype.none);

  /*
  */
  Transform.matrix = Util.makeBindingWrapper(Binding, Binding.prototype.matrix);

  /*
  */
  Transform.matrix3d = Util.makeBindingWrapper(Binding, Binding.prototype.matrix3d);

  /*
  */
  Transform.translate = Util.makeBindingWrapper(Binding, Binding.prototype.translate);

  /*
  */
  Transform.translate3d = Util.makeBindingWrapper(Binding, Binding.prototype.translate3d);

  /*
  */
  Transform.translateX = Util.makeBindingWrapper(Binding, Binding.prototype.translateX);

  /*
  */
  Transform.translateY = Util.makeBindingWrapper(Binding, Binding.prototype.translateY);

  /*
  */
  Transform.translateZ = Util.makeBindingWrapper(Binding, Binding.prototype.translateZ);

  /*
  */
  Transform.scale = Util.makeBindingWrapper(Binding, Binding.prototype.scale);

  /*
  */
  Transform.scale3d = Util.makeBindingWrapper(Binding, Binding.prototype.scale3d);

  /*
  */
  Transform.scaleX = Util.makeBindingWrapper(Binding, Binding.prototype.scaleX);

  /*
  */
  Transform.scaleY = Util.makeBindingWrapper(Binding, Binding.prototype.scaleY);

  /*
  */
  Transform.scaleZ = Util.makeBindingWrapper(Binding, Binding.prototype.scaleZ);

  /*
  */
  Transform.rotate = Util.makeBindingWrapper(Binding, Binding.prototype.rotate);

  /*
  */
  Transform.rotate3d = Util.makeBindingWrapper(Binding, Binding.prototype.rotate3d);

  /*
  */
  Transform.rotateX = Util.makeBindingWrapper(Binding, Binding.prototype.rotateX);

  /*
  */
  Transform.rotateY = Util.makeBindingWrapper(Binding, Binding.prototype.rotateY);

  /*
  */
  Transform.rotateZ = Util.makeBindingWrapper(Binding, Binding.prototype.rotateZ);

  /*
  */
  Transform.skew = Util.makeBindingWrapper(Binding, Binding.prototype.skew);

  /*
  */
  Transform.skewX = Util.makeBindingWrapper(Binding, Binding.prototype.skewX);

  /*
  */
  Transform.skewY = Util.makeBindingWrapper(Binding, Binding.prototype.skewY);

  /*
  */
  global.Transform = Transform;
})(window);

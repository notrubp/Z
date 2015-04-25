(function(global) {
  /*
  */
  var util = global.util;

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
  var binding = function() {
    this.none();
  }

  /*
  */
  binding.prototype.__property_hook = function() {
    return this.css;
  }
  
  /*
  */
  binding.prototype.none = function() {
    this.css = 'none';
    return this;
  }

  /*
  */
  binding.prototype.matrix = function(xx, xy, yx, yy, tx, ty) {
    fixup(this);
    this.css += 'matrix(' + xx + ',' + xy + ',' + yx + ',' + yy + ',' + tx + ',' + ty + ')';
    return this;
  }

  /*
  */
  binding.prototype.matrix3d = function(xx, xy, xz, xw, yx, yy, yz, yw, zx, zy, zz, zw, tx, ty, tz, tw) {
    fixup(this);
    this.css += 'matrix3d(' + xx + ',' + xy + ',' + xz + ',' + xw + ',' + yx + ',' + yy + ',' + yz + ',' + yw + ',' + zx + ',' + zy + ',' + zz + ',' + zw + ',' + tx + ',' + ty + ',' + tz + ',' + tw + ')';
    return this;
  }

  /*
  */
  binding.prototype.translate = function(x, y) {
    fixup(this);
    this.css += 'translate(' + x + ',' + y + ')';
    return this;
  }

  /*
  */
  binding.prototype.translate3d = function(x, y, z) {
    fixup(this);
    this.css += 'translate3d(' + x + ',' + y + ',' + z + ')';
    return this;
  }

  /*
  */
  binding.prototype.translatex = function(x) {
    fixup(this);
    this.css += 'translateX(' + x + ')';
    return this;
  }

  /*
  */
  binding.prototype.translatey = function(y) {
    fixup(this);
    this.css += 'translateY(' + y + ')';
    return this;
  }

  /*
  */
  binding.prototype.translatez = function(z) {
    fixup(this);
    this.css += 'translateZ(' + z + ')';
    return this;
  }

  /*
  */
  binding.prototype.scale = function(x, y) {
    fixup(this);
    this.css += 'scale(' + x + ',' + y + ')';
    return this;
  }

  /*
  */
  binding.prototype.scale3d = function(x, y, z) {
    fixup(this);
    this.css += 'scale3d(' + x + ',' + y + ',' + z + ')';
    return this;
  }

  /*
  */
  binding.prototype.scalex = function(x) {
    fixup(this);
    this.css += 'scaleX(' + x + ')';
    return this;
  }

  /*
  */
  binding.prototype.scaley = function(y) {
    fixup(this);
    this.css += 'scaleY(' + y + ')';
    return this;
  }

  /*
  */
  binding.prototype.scalez = function(z) {
    fixup(this);
    this.css += 'scaleZ(' + z + ')';
    return this;
  }

  /*
  */
  binding.prototype.rotate = function(a) {
    fixup(this);
    this.css += 'rotate(' + a + 'rad)';
    return this;
  }

  /*
  */
  binding.prototype.rotate3d = function(x, y, z) {
    fixup(this);
    this.css += 'rotate3d(' + x + 'rad,' + y + 'rad,' + z + 'rad)';
    return this;
  }

  /*
  */
  binding.prototype.rotatex = function(x) {
    fixup(this);
    this.css += 'rotateX(' + x + 'rad)';
    return this;
  }

  /*
  */
  binding.prototype.rotatey = function(y) {
    fixup(this);
    this.css += 'rotateY(' + y + 'rad)';
    return this;
  }

  /*
  */
  binding.prototype.rotatez = function(z) {
    fixup(this);
    this.css += 'rotateZ(' + z + 'rad)';
    return this;
  }

  /*
  */
  binding.prototype.skew = function(x, y) {
    fixup(this);
    this.css += 'skew(' + x + 'rad,' + y + 'rad)';
    return this;
  }

  /*
  */
  binding.prototype.skewx = function(x) {
    fixup(this);
    this.css += 'skewX(' + x + 'rad)';
    return this;
  }

  /*
  */
  binding.prototype.skewy = function(y) {
    fixup(this);
    this.css += 'skewY(' + y + 'rad)';
    return this;
  }

  /*
  */
  var transform = {};

  /*
  */
  transform.none = util.make_binding_wrapper(binding, binding.prototype.none);

  /*
  */
  transform.matrix = util.make_binding_wrapper(binding, binding.prototype.matrix);

  /*
  */
  transform.matrix3d = util.make_binding_wrapper(binding, binding.prototype.matrix3d);

  /*
  */
  transform.translate = util.make_binding_wrapper(binding, binding.prototype.translate);

  /*
  */
  transform.translate3d = util.make_binding_wrapper(binding, binding.prototype.translate3d);

  /*
  */
  transform.translatex = util.make_binding_wrapper(binding, binding.prototype.translatex);

  /*
  */
  transform.translatey = util.make_binding_wrapper(binding, binding.prototype.translatey);

  /*
  */
  transform.translatez = util.make_binding_wrapper(binding, binding.prototype.translatez);

  /*
  */
  transform.scale = util.make_binding_wrapper(binding, binding.prototype.scale);

  /*
  */
  transform.scale3d = util.make_binding_wrapper(binding, binding.prototype.scale3d);

  /*
  */
  transform.scalex = util.make_binding_wrapper(binding, binding.prototype.scalex);

  /*
  */
  transform.scaley = util.make_binding_wrapper(binding, binding.prototype.scaley);

  /*
  */
  transform.scalez = util.make_binding_wrapper(binding, binding.prototype.scalez);

  /*
  */
  transform.rotate = util.make_binding_wrapper(binding, binding.prototype.rotate);

  /*
  */
  transform.rotate3d = util.make_binding_wrapper(binding, binding.prototype.rotate3d);

  /*
  */
  transform.rotatex = util.make_binding_wrapper(binding, binding.prototype.rotatex);

  /*
  */
  transform.rotatey = util.make_binding_wrapper(binding, binding.prototype.rotatey);

  /*
  */
  transform.rotatez = util.make_binding_wrapper(binding, binding.prototype.rotatez);

  /*
  */
  transform.skew = util.make_binding_wrapper(binding, binding.prototype.skew);

  /*
  */
  transform.skewx = util.make_binding_wrapper(binding, binding.prototype.skewx);

  /*
  */
  transform.skewy = util.make_binding_wrapper(binding, binding.prototype.skewy);

  /*
  */
  global.transform = transform;
})(window);

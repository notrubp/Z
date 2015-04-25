(function(global) {
  /*
  */
  var point = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  /*
  */
  point.prototype.__property_hook = function() {
    return 'point(' + this.x + ',' + this.y + ')';
  }

  /*
  */
  point.prototype.set = function(p) {
    this.x = p.x;
    this.y = p.y;
    return this;
  }

  /*
  */
  point.prototype.add = function(p) {
    return new point(this.x + p.x, this.y + p.y);
  }

  /*
  */
  point.prototype.sub = function(p) {
    return new point(this.x - p.x, this.y - p.y);
  }

  /*
  */
  point.prototype.scale = function(s) {
    return new point(this.x * s, this.y * y);
  }

  /*
  */
  point.prototype.lengthsq = function() {
    return this.x * this.x + this.y * this.y;
  }

  /*
  */
  point.prototype.length = function() {
    return Math.sqrt(this.lengthsq());
  }

  /*
  */
  point.prototype.dot = function(p) {
    return this.x * p.x + this.y * p.y;
  }

  /*
  */
  point.prototype.normalize = function() {
    var l = this.length();
    return new point(this.x / l, this.y / l);
  }

  /*
  */
  global.point = point;
})(window);

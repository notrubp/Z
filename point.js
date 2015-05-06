(function(global) {
  /**
  */
  var Point = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  /**
  */
  Point.prototype.__propertyHook = function() {
    return 'point(' + this.x + ',' + this.y + ')';
  }

  /**
  */
  Point.prototype.set = function(p) {
    this.x = p.x;
    this.y = p.y;
    return this;
  }

  /**
  */
  Point.prototype.setX = function(x) {
    this.x = x;
    return this;
  }

  /**
  */
  Point.prototype.getX = function() {
    return this.x;
  }

  /**
  */
  Point.prototype.setY = function(y) {
    this.y = y;
    return this;
  }

  /**
  */
  Point.prototype.getY = function() {
    return this.y;
  }

  /**
  */
  Point.prototype.add = function(p) {
    return new Point(this.x + p.x, this.y + p.y);
  }

  /**
  */
  Point.prototype.sub = function(p) {
    return new Point(this.x - p.x, this.y - p.y);
  }

  /**
  */
  Point.prototype.scale = function(s) {
    return new Point(this.x * s, this.y * y);
  }

  /**
  */
  Point.prototype.lengthSq = function() {
    return this.x * this.x + this.y * this.y;
  }

  /**
  */
  Point.prototype.length = function() {
    return Math.sqrt(this.lengthSq());
  }

  /**
  */
  Point.prototype.dot = function(p) {
    return this.x * p.x + this.y * p.y;
  }

  /**
  */
  Point.prototype.normalize = function() {
    var l = this.length();
    return new Point(this.x / l, this.y / l);
  }

  /**
  */
  global.Point = Point;
})(window);

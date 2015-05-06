(function(global) {
  /*
  */
  var Point = global.Point;

  /*
  */
  var Rect = function(t, l, b, r) {
    this.tl = new Point(t, l);
    this.br = new Point(b, r);
  }

  /*
  */
  Rect.prototype.__propertyHook = function() {
    return 'rect(' + this.tl.x + ',' + this.tl.y + ',' + this.br.x + ',' + this.br.y + ')';
  }

  /*
  */
  Rect.prototype.set = function(r) {
    this.tl.set(r.tl);
    this.br.set(r.br);
    return this;
  }

  /*
  */
  Rect.prototype.setLeft = function(x) {
    this.tl.x = x;
    return this;
  }

  /*
  */
  Rect.prototype.getLeft = function() {
    return this.tl.x;
  }

  /*
  */
  Rect.prototype.setTop = function(y) {
    this.tl.y = y;
    return this;
  }

  /*
  */
  Rect.prototype.getTop = function() {
    return this.tl.y;
  }

  /*
  */
  Rect.prototype.setRight = function(r) {
    this.br.x = r;
    return this;
  }

  /*
  */
  Rect.prototype.getRight = function() {
    return this.br.x;
  }

  /*
  */
  Rect.prototype.setBottom = function(b) {
    this.br.y = b;
    return this;
  }

  /*
  */
  Rect.prototype.getBottom = function() {
    return this.br.y;
  }

  /*
  */
  Rect.prototype.setWidth = function(w) {
    this.setRight(this.tl.x + w);
    return this;
  }

  /*
  */
  Rect.prototype.getWidth = function() {
    return this.br.x - this.tl.x;
  }

  /*
  */
  Rect.prototype.setHeight = function(h) {
    this.setBottom(this.tl.y + h);
    return this;
  }

  /*
  */
  Rect.prototype.getHeight = function() {
    return this.br.y - this.tl.y;
  }

  /*
  */
  Rect.prototype.centroid = function() {
    return new point((this.tl.x + this.br.x) / 2, (this.tl.y + this.br.y) / 2);
  }

  /*
  */
  Rect.prototype.contains = function(r) {
    return r.tl.x >= this.tl.x && r.tl.x <= this.br.x && r.tl.y >= this.tl.y && r.tl.y <= this.br.y;
  }

  /*
  */
  Rect.prototype.intersects = function(r) {
    return !(r.tl.x > this.br.x || r.br.x < this.tl.x || r.tl.y > this.br.y || r.br.y < this.tl.y);
  }

  /*
  */
  global.Rect = Rect;
})(window);

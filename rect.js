(function(global) {
  /*
  */
  var rect = function(t, l, b, r) {
    this.tl = new point(t, l);
    this.br = new point(b, r);
  }

  /*
  */
  rect.prototype.__property_hook = function() {
    return 'rect(' + this.tl.x + ',' + this.tl.y + ',' + this.br.x + ',' + this.br.y + ')';
  }

  /*
  */
  rect.prototype.set = function(r) {
    this.tl.set(r.tl);
    this.br.set(r.br);
    return this;
  }

  /*
  */
  rect.prototype.set_left = function(x) {
    this.tl.x = x;
    return this;
  }

  /*
  */
  rect.prototype.set_top = function(y) {
    this.tl.y = y;
    return this;
  }

  /*
  */
  rect.prototype.set_right = function(r) {
    this.br.x = r;
    return this;
  }

  /*
  */
  rect.prototype.set_bottom = function(b) {
    this.br.y = b;
    return this;
  }

  /*
  */
  rect.prototype.set_width = function(w) {
    this.set_right(this.tl.x + w);
    return this;
  }

  /*
  */
  rect.prototype.set_height = function(h) {
    this.set_bottom(this.tl.y + h);
    return this;
  }

  /*
  */
  rect.prototype.left = function() {
    return this.tl.x;
  }

  /*
  */
  rect.prototype.top = function() {
    return this.tl.y;
  }

  /*
  */
  rect.prototype.right = function() {
    return this.br.x;
  }

  /*
  */
  rect.prototype.bottom = function() {
    return this.br.y;
  }

  /*
  */
  rect.prototype.width = function() {
    return this.br.x - this.tl.x;
  }

  /*
  */
  rect.prototype.height = function() {
    return this.br.y - this.tl.y;
  }

  /*
  */
  rect.prototype.centroid = function() {
    return new point((this.tl.x + this.br.x) / 2, (this.tl.y + this.br.y) / 2);
  }

  /*
  */
  rect.prototype.contains = function(r) {
    return r.tl.x >= this.tl.x && r.tl.x <= this.br.x && r.tl.y >= this.tl.y && r.tl.y <= this.br.y;
  }

  /*
  */
  rect.prototype.intersects = function(r) {
    return !(r.tl.x > this.br.x || r.br.x < this.tl.x || r.tl.y > this.br.y || r.br.y < this.tl.y);
  }

  /*
  */
  global.rect = rect;
})(window);

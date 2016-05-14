/**
 * Represents a 2-dimensional cartesian point.
 *
 * MIT License
 * Copyright (c) 2015 notrubp@gmail.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software
 * is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR
 * IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @license MIT
 * @copyright notrubp@gmail.com 2015
 */
(function(global) {
  "use strict";

  /**
   * Represents a 2-dimensional cartesian point.
   * @class Point
   * @param {Number=} x
   * @param {Number=} y
   */
  var Point = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  /*
   * Property hook.
   */
  Point.prototype.__propertyHook = function() {
    return this.x + ',' + this.y;
  }

  /**
   * Set values.
   * @function set
   * @memberof Point
   * @instance
   * @param {Number=} x
   * @param {Number=} y
   * @returns {Point}
   */
  Point.prototype.set = function(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * Copy values from another {@link Point}.
   * @function copy
   * @memberof Point
   * @instance
   * @param {Point} p
   * @returns {Point}
   */
  Point.prototype.copy = function(p) {
    this.x = p.x;
    this.y = p.y;
    return this;
  }

  /**
   * Set X value.
   * @function setX
   * @memberof Point
   * @instance
   * @param {Number} x
   * @returns {Point}
   */
  Point.prototype.setX = function(x) {
    this.x = x;
    return this;
  }

  /**
   * Get X value.
   * @function getX
   * @memberof Point
   * @instance
   * @returns {Number} The X value.
   */
  Point.prototype.getX = function() {
    return this.x;
  }

  /**
   * Set Y value.
   * @function setY
   * @memberof Point
   * @instance
   * @param {Number} y
   * @returns {Point}
   */
  Point.prototype.setY = function(y) {
    this.y = y;
    return this;
  }

  /**
   * Get Y value.
   * @function getY
   * @memberof Point
   * @instance
   * @returns {Number} The Y value.
   */
  Point.prototype.getY = function() {
    return this.y;
  }

  /**
   * Add two {@link Point}s and return the sum.
   * @function add
   * @memberof Point
   * @instance
   * @param {Point} p
   * @returns {Point}
   */
  Point.prototype.add = function(p) {
    this.x += p.x;
    this.y += p.y;
    return this;
  }

  /**
   * Subtract two {@link Point}s and return the difference.
   * @function sub
   * @memberof Point
   * @instance
   * @param {Point} p
   * @returns {Point}
   */
  Point.prototype.sub = function(p) {
    this.x -= p.x;
    this.y -= p.y;
    return this;
  }

  /**
   * Apply a scalar to this {@link Point} and return the result.
   * @function scale
   * @memberof Point
   * @instance
   * @param {Number} s
   * @returns {Point}
   */
  Point.prototype.scale = function(s) {
    this.x *= s;
    this.y *= y;
    return this;
  }

  /**
   * Calculate the squared distance of this {@link Point}.
   * @function lengthSq
   * @memberof Point
   * @instance
   * @returns {Number} The squared distance of this {@link Point}.
   */
  Point.prototype.lengthSq = function() {
    return this.x * this.x + this.y * this.y;
  }

  /**
   * Calculate the distance of this {@link Point}.
   * @function length
   * @memberof Point
   * @instance
   * @returns {Number} The distance of this {@link Point}.
   */
  Point.prototype.length = function() {
    return Math.sqrt(this.lengthSq());
  }

  /**
   * Calculate the dot product of this {@link Point}.
   * {@link http://en.wikipedia.org/wiki/Dot_product}
   * @function dot
   * @memberof Point
   * @instance
   * @returns {Number} The dot product of this {@link Point}.
   */
  Point.prototype.dot = function(p) {
    return this.x * p.x + this.y * p.y;
  }

  /**
   * Normalize this {@link Point} and return the result.
   * @function normalize
   * @memberof Point
   * @instance
   * @returns {Point}
   */
  Point.prototype.normalize = function() {
    var l = this.length();

    if (l != 0)
    {
      this.x /= l;
      this.y /= l;
    }

    return this;
  }

  /**
   * @function set
   * @memberof Point
   * @static
   * @see Point#set
   * @returns {Point}
   */
  Point.set = Util.makeDaisyChain(Point, Point.prototype.set);

  /**
   * @function copy
   * @memberof Point
   * @static
   * @see Point#copy
   * @returns {Point}
   */
  Point.copy = Util.makeDaisyChain(Point, Point.prototype.copy);

  /**
   * @function setX
   * @memberof Point
   * @static
   * @see Point#setX
   * @returns {Point}
   */
  Point.setX = Util.makeDaisyChain(Point, Point.prototype.setX);

  /**
   * @function setY
   * @memberof Point
   * @static
   * @see Point#setY
   * @returns {Point}
   */
  Point.setY = Util.makeDaisyChain(Point, Point.prototype.setY);

  /*
   * Exports
   */
  global.Point = Point;
})(window);

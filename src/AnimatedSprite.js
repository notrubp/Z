/**
 * AnimatedSprite.
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

  /*
   * Imports
   */
  var Util = global.Util;
  var Sprite = global.Sprite;

  /**
   * AnimatedSprite.
   * @class AnimatedSprite
   */
  var AnimatedSprite = Util.inherit(Sprite, function() {
    this.super.call(this);

    this.playback = AnimatedSprite.Playback.Once;
    this.direction = AnimatedSprite.PlayDirection.Forward;

    /*
     * Default 30 FPS.
     */
    this.ms = 33;
  })

  /**
   * Playback enumeration.
   * @memberof AnimatedSprite
   * @readonly
   * @static
   * @enum {Number}
   */
  AnimatedSprite.Playback = {
    /**
     * Play frames 0 &#10140; N until stopped.
     */
    'Loop' : 0,

    /**
     * Play frames 0 &#10140; N.
     */
    'Once' : 1,

    /**
     * Play frames 0 &#10140; N and end back at frame 0.
     */
    'OnceLoop' : 2
  }

  Object.freeze(AnimatedSprite.Playback);

  /**
   * Play direction enumeration.
   * @memberof AnimatedSprite
   * @readonly
   * @static
   * @enum {Number}
   */
  AnimatedSprite.PlayDirection = {
    /**
     * Play frames in ascending order 0 &#10140; N.
     */
    'Forward' : 0,

    /**
     * Play frames in descending order N &#10140; 0.
     */
    'Reverse' : 1
  }

  Object.freeze(AnimatedSprite.PlayDirection);

  /**
   * Set the playback.
   * @function setPlayback
   * @memberof AnimatedSprite
   * @instance
   * @param {AnimatedSprite.Playback} playback
   */
  AnimatedSprite.prototype.setPlayback = function(playback) {
    this.playback = playback;
  }

  /**
   * Get the playback.
   * @function getPlayback
   * @memberof AnimatedSprite
   * @instance
   * @returns {AnimatedSprite.Playback}
   */
  AnimatedSprite.prototype.getPlayback = function() {
    return this.playback;
  }

  /**
   * Set the play direction.
   * @function setPlayDirection
   * @memberof AnimatedSprite
   * @instance
   * @param {AnimatedSprite.PlayDirection} direction
   */
  AnimatedSprite.prototype.setPlayDirection = function(direction) {
    this.direction = direction;
  }

  /**
   * Get the play direction.
   * @function getPlayDirection
   * @memberof AnimatedSprite
   * @instance
   * @returns {AnimatedSprite.PlayDirection}
   */
  AnimatedSprite.prototype.getPlayDirection = function() {
    return this.direction;
  }

  /**
   * Set frames per second.
   * @function setFps
   * @memberof AnimatedSprite
   * @instance
   * @param {Number} fps
   */
  AnimatedSprite.prototype.setFps = function(fps) {
    this.ms = 1.0 / fps * 1000.0;
  }

  /**
   * Get frames per second.
   * @function getFps
   * @memberof AnimatedSprite
   * @instance
   * @returns {Number}
   */
  AnimatedSprite.prototype.getFps = function() {
    return 1.0 / this.ms * 1000.0;
  }

  /**
   * Get whether or not the animation is currently playing.
   * @function isPlaying
   * @memberof AnimatedSprite
   * @instance
   * @returns {Boolean}
   */
  AnimatedSprite.prototype.isPlaying = function() {
    return false;
  }

  /**
   * Play the animation.
   * @function play
   * @memberof AnimatedSprite
   * @instance
   */
  AnimatedSprite.prototype.play = function() {
    this.playAt(0);
  }

  /**
   * Play the animation at a specific frame.
   * @function playAt
   * @memberof AnimatedSprite
   * @instance
   * @param {Number} frame
   */
  AnimatedSprite.prototype.playAt = function(frame) {
  }

  /**
   * Stop the animation.
   * @function stop
   * @memberof AnimatedSprite
   * @instance
   */
  AnimatedSprite.prototype.stop = function() {
    this.stopAt(0);
  }

  /**
   * Stop the animation at a specific frame.
   * @function stopAt
   * @memberof AnimatedSprite
   * @instance
   * @param {Number} frame
   */
  AnimatedSprite.prototype.stopAt = function(frame) {
  }

  /*
   * Exports
   */
  global.AnimatedSprite = AnimatedSprite;
})(window);

/**
 * ImageAnimation.
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
  /**
   * ImageAnimation.
   * @class ImageAnimation
   */
  var ImageAnimation = function() {
    this.playback = ImageAnimation.Playback.Once;
    this.direction = ImageAnimation.PlayDirection.Forward;

    /*
     * Default 30 FPS.
     */
    this.ms = 33;
  }

  /**
   * Playback enumeration.
   * @memberof ImageAnimation
   * @readonly
   * @static
   * @enum {Number}
   */
  ImageAnimation.Playback = {
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

  Object.freeze(ImageAnimation.Playback);

  /**
   * Play direction enumeration.
   * @memberof ImageAnimation
   * @readonly
   * @static
   * @enum {Number}
   */
  ImageAnimation.PlayDirection = {
    /**
     * Play frames in ascending order 0 &#10140; N.
     */
    'Forward' : 0,

    /**
     * Play frames in descending order N &#10140; 0.
     */
    'Reverse' : 1
  }

  Object.freeze(ImageAnimation.PlayDirection);

  /**
   * Set the playback.
   * @function setPlayback
   * @memberof ImageAnimation
   * @instance
   * @param {ImageAnimation.Playback} playback
   */
  ImageAnimation.prototype.setPlayback = function(playback) {
    this.playback = playback;
  }

  /**
   * Get the playback.
   * @function getPlayback
   * @memberof ImageAnimation
   * @instance
   * @returns {ImageAnimation.Playback}
   */
  ImageAnimation.prototype.getPlayback = function() {
    return this.playback;
  }

  /**
   * Set the play direction.
   * @function setPlayDirection
   * @memberof ImageAnimation
   * @instance
   * @param {ImageAnimation.PlayDirection} direction
   */
  ImageAnimation.prototype.setPlayDirection = function(direction) {
    this.direction = direction;
  }

  /**
   * Get the play direction.
   * @function getPlayDirection
   * @memberof ImageAnimation
   * @instance
   * @returns {ImageAnimation.PlayDirection}
   */
  ImageAnimation.prototype.getPlayDirection = function() {
    return this.direction;
  }

  /**
   * Set frames per second.
   * @function setFps
   * @memberof ImageAnimation
   * @instance
   * @param {Number} fps
   */
  ImageAnimation.prototype.setFps = function(fps) {
    this.ms = 1.0 / fps * 1000.0;
  }

  /**
   * Get frames per second.
   * @function getFps
   * @memberof ImageAnimation
   * @instance
   * @returns {Number}
   */
  ImageAnimation.prototype.getFps = function() {
    return 1.0 / this.ms * 1000.0;
  }

  /**
   * Get whether or not the animation is currently playing.
   * @function isPlaying
   * @memberof ImageAnimation
   * @instance
   * @returns {Boolean}
   */
  ImageAnimation.prototype.isPlaying = function() {
    return false;
  }

  /**
   * Play the animation.
   * @function play
   * @memberof ImageAnimation
   * @instance
   */
  ImageAnimation.prototype.play = function() {
    this.playAt(0);
  }

  /**
   * Play the animation at a specific frame.
   * @function playAt
   * @memberof ImageAnimation
   * @instance
   * @param {Number} frame
   */
  ImageAnimation.prototype.playAt = function(frame) {
  }

  /**
   * Stop the animation.
   * @function stop
   * @memberof ImageAnimation
   * @instance
   */
  ImageAnimation.prototype.stop = function() {
    this.stopAt(0);
  }

  /**
   * Stop the animation at a specific frame.
   * @function stopAt
   * @memberof ImageAnimation
   * @instance
   * @param {Number} frame
   */
  ImageAnimation.prototype.stopAt = function(frame) {
  }

  /*
   * Exports
   */
  global.ImageAnimation = ImageAnimation;
})(window);

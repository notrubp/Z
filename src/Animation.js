/**
 * Animation.
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
   * Animation.
   * @class Animation
   */
  var Animation = function() {
    this.playback = Animation.Playback.Once;
    this.direction = Animation.PlayDirection.Forward;

    /*
     * Default 30 FPS.
     */
    this.ms = 33;
  }

  /**
   * Playback enumeration.
   * @memberof Animation
   * @readonly
   * @static
   * @enum {Number}
   */
  Animation.Playback = {
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

  Object.freeze(Animation.Playback);

  /**
   * Play direction enumeration.
   * @memberof Animation
   * @readonly
   * @static
   * @enum {Number}
   */
  Animation.PlayDirection = {
    /**
     * Play frames in ascending order 0 &#10140; N.
     */
    'Forward' : 0,

    /**
     * Play frames in descending order N &#10140; 0.
     */
    'Reverse' : 1
  }

  Object.freeze(Animation.PlayDirection);

  /**
   * Set the playback.
   * @function setPlayback
   * @memberof Animation
   * @instance
   * @param {Animation.Playback} playback
   */
  Animation.prototype.setPlayback = function(playback) {
    this.playback = playback;
  }

  /**
   * Get the playback.
   * @function getPlayback
   * @memberof Animation
   * @instance
   * @returns {Animation.Playback}
   */
  Animation.prototype.getPlayback = function() {
    return this.playback;
  }

  /**
   * Set the play direction.
   * @function setPlayDirection
   * @memberof Animation
   * @instance
   * @param {Animation.PlayDirection} direction
   */
  Animation.prototype.setPlayDirection = function(direction) {
    this.direction = direction;
  }

  /**
   * Get the play direction.
   * @function getPlayDirection
   * @memberof Animation
   * @instance
   * @returns {Animation.PlayDirection}
   */
  Animation.prototype.getPlayDirection = function() {
    return this.direction;
  }

  /**
   * Set frames per second.
   * @function setFps
   * @memberof Animation
   * @instance
   * @param {Number} fps
   */
  Animation.prototype.setFps = function(fps) {
    this.ms = 1.0 / fps * 1000.0;
  }

  /**
   * Get frames per second.
   * @function getFps
   * @memberof Animation
   * @instance
   * @returns {Number}
   */
  Animation.prototype.getFps = function() {
    return 1.0 / this.ms * 1000.0;
  }

  /**
   * Get whether or not the animation is currently playing.
   * @function isPlaying
   * @memberof Animation
   * @instance
   * @returns {Boolean}
   */
  Animation.prototype.isPlaying = function() {
    return false;
  }

  /**
   * Enabled or disable ensure image source feature. This is disabled by 
   * default as an optimization and is used for when an animation has multiple
   * types that reference different source images.
   * @function setEnsureSrc
   * @memberof Animation
   * @instance
   * @param {Boolean} ensureSrc
   */
  Animation.prototype.setEnsureSrc = function(ensureSrc) {
  }

  /**
   * Get whether or not ensure image source feature is enabled or disabled.
   * @function isEnsureSrc
   * @memberof Animation
   * @instance
   * @returns {Boolean}
   */
  Animation.prototype.isEnsureSrc = function() {
    return false;
  }

  /**
   * Enable or disable CSS3 features, if any.
   * @function setCss3Enabled
   * @memberof Animation
   * @instance
   * @param {Boolean} css3enabled
   */
  Animation.prototype.setCss3Enabled = function(css3enabled) {
  }

  /**
   * Get whether or not CSS3 features are enabled.
   * @function isCss3Enabled
   * @memberof Animation
   * @instance
   * @returns {Boolean}
   */
  Animation.prototype.isCss3Enabled = function() {
    return false;
  }

  /**
   * Play the animation.
   * @function play
   * @memberof Animation
   * @instance
   */
  Animation.prototype.play = function() {
    this.playAt(0);
  }

  /**
   * Play the animation at a specific frame.
   * @function playAt
   * @memberof Animation
   * @instance
   * @param {Number} frame
   */
  Animation.prototype.playAt = function(frame) {
  }

  /**
   * Stop the animation.
   * @function stop
   * @memberof Animation
   * @instance
   */
  Animation.prototype.stop = function() {
    this.stopAt(0);
  }

  /**
   * Stop the animation at a specific frame.
   * @function stopAt
   * @memberof Animation
   * @instance
   * @param {Number} frame
   */
  Animation.prototype.stopAt = function(frame) {
  }

  /*
   * Exports
   */
  global.Animation = Animation;
})(window);

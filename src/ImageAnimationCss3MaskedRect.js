/**
 * Implementation of a CSS3 transition strip animation using a masked <div> as it's model.
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
  /*
   * Imports
   */
  var Dom = global.Dom;
  var Property = global.Property;
  var ImageAnimationCss3 = global.ImageAnimationCss3;

  var ensureMaskRect = function() {
    if (this.defs.selection != null) {
      var info = this.defs.selection.info.frames[0];
      Property.set(this.mask, 'width', Unit.px(info.width));
      Property.set(this.mask, 'height', Unit.px(info.height));
    }
  }

  var ensureSrc = function(src) {
    if (this.ensureSrc && this.image.src != src.url) {
      Dom.setImageSrc(this.image, src);
    }
  }

  /**
   *
   * @class ImageAnimationCss3MaskedRect
   */
  var ImageAnimationCss3MaskedRect = function() {
    ImageAnimationCss3.call(this);

    this.mask = Dom.createRect();
    this.image = Dom.createImage();

    Property.set(this.mask, 'position', 'absolute');
    Property.set(this.image, 'position', 'absolute');

    ensureMaskRect.call(this);

    Dom.append(this.mask, this.image);

    Property.set(this.mask, 'overflow', 'hidden');
  }

  Util.inherit(ImageAnimationCss3, ImageAnimationCss3MaskedRect);

  ImageAnimationCss3MaskedRect.prototype.applyAsCss3Animation = function(src, name, duration, iterations, fill, callback) {
    ensureMaskRect.call(this);
    ensureSrc.call(this, src);

    Property.set(this.image, 'animation-name', name);
    Property.set(this.image, 'animation-duration', duration);
    Property.set(this.image, 'animation-iteration-count', iterations);
    Property.set(this.image, 'animation-fill-mode', fill);

    this.listener = Dom.listen(this.image, 'animationend', callback);
  }

  ImageAnimationCss3MaskedRect.prototype.applyAsTransition = function(src, transition, start, end, callback) {
  }

  ImageAnimationCss3MaskedRect.prototype.applyFrameWithEnqueuedCallback = function(src, start, callback) {
  }

  ImageAnimationCss3MaskedRect.prototype.applyFrameImmediately = function(src, frame) {
  }

  ImageAnimationCss3MaskedRect.prototype.clear = function() {
    if (this.listener != null) {
      this.listener.detach();
      this.listener = null;
    }

    Property.clear(this.mask);
    Property.clear(this.image);

    Property.remove(this.image, 'animation-name');
    Property.remove(this.image, 'animation-duration');
    Property.remove(this.image, 'animation-iteration-count');
    Property.remove(this.image, 'animation-fill-mode');

    Property.forceReflow(this.image);

    ImageAnimationCss3.prototype.clear.call(this, arguments);
  }

  /*
   * Exports
   */
  global.ImageAnimationCss3MaskedRect = ImageAnimationCss3MaskedRect;
})(window);

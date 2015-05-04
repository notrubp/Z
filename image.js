(function(global) {
  /**
  */
  var image = { };

  /**
  */
  var images = { };

  /**
  */
  image.get = function(url) {
    if (url in images) {
      return;
    }

    var img = document.createElement('img');
    img.src = url;
    images[url] = img;

    return img;
  }

  /**
  */
  global.image = image;
})(window);

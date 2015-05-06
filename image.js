(function(global) {
  /**
  */
  var Image = { };

  /**
  */
  var images = { };

  /**
  */
  Image.get = function(url) {
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
  global.Image = Image;
})(window);

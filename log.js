(function(global) {
  /*
  */
  var Log = {};

  /*
  */
  var tags = [];

  /*
  */
  function logger(func, tag, message) {
    if (tags.indexOf(tag) != -1) {
      return func.call(this, '[' + tag + ']: ' + message);
    }
  }

  /*
  */
  Log.info = logger.bind(console, console.info);

  /*
  */
  Log.debug = logger.bind(console, console.debug); 

  /*
  */
  Log.warn = logger.bind(console, console.warn);

  /*
  */
  Log.error = logger.bind(console, console.error);


  /*
  */
  Log.Tags = {};

  /*
  */
  Log.Tags.enable = function(tag) {
    if (tags.indexOf(tag) == -1) {
      tags.push(tag);
    }
  }

  /*
  */
  Log.Tags.disable = function(tag) {
    var i = tags.indexOf(tag);

    if (i != -1) {
      tags.splice(i, 1);
    }
  }

  /*
  */
  Log.Tags.enabled = function(tag) {
    return tags.indexOf(tag) != -1;
  }

  /*
  */
  Log.Tags.disableAll = function(tag) {
    tags = [];
  }

  /*
  */
  global.Log = Log;
})(window);

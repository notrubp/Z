(function(global) {
  /*
  */
  var log = {};

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
  log.info = logger.bind(console, console.info);

  /*
  */
  log.debug = logger.bind(console, console.debug); 

  /*
  */
  log.warn = logger.bind(console, console.warn);

  /*
  */
  log.error = logger.bind(console, console.error);


  /*
  */
  log.tags = {};

  /*
  */
  log.tags.enable = function(tag) {
    if (tags.indexOf(tag) == -1) {
      tags.push(tag);
    }
  }

  /*
  */
  log.tags.disable = function(tag) {
    var i = tags.indexOf(tag);

    if (i != -1) {
      tags.splice(i, 1);
    }
  }

  /*
  */
  log.tags.enabled = function(tag) {
    return tags.indexOf(tag) != -1;
  }

  /*
  */
  log.tags.disable_all = function(tag) {
    tags = [];
  }

  /*
  */
  global.log = log;
})(window);

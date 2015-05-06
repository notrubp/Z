(function(global) {
  /**
  */
  var binding = function() {
    this.clear();
  }

  /**
  */
  binding.prototype.append = function(callback) {
    this.links.push(callback);
    return this;
  }

  /**
  */
  binding.prototype.success = function(callback) {
    this.success_callbacks.push(callback);
    return this;
  }

  /**
  */
  binding.prototype.failure = function(callback) {
    this.failure_callbacks.push(callback);
    return this;
  }

  /**
  */
  binding.prototype.commit = function() {
    if (this.links.length > 0) {
      var links = this.links;
      var success_callbacks = this.success_callbacks;
      var failure_callbacks = this.failure_callbacks;

      // List of exceptions (reasons) for failure.
      var failure_reasons = [];

      // Can't rely entirely on the size of failure_reasons due to the chance
      // the caller may not provide a reason of failure.
      var any_failure = false;

      function next() {
        var link = links.shift();
        scheduler.deferred(link.bind(null, success.bind(null, link), failure.bind(null, link)));
      }

      /**
      */
      function remove(link) {
        var i = links.indexOf(link);

        if (i != -1) {
          links.splice(i, 1);
        }
      }

      function on_success() {
        if (links.length > 0) {
          next();
        } else {
          // Any failures are a failure.
          if (any_failure) {
            on_failure();
          } else {
            success_callbacks.forEach(function(callback) {
              callback();
            });
          }
        }
      }

      function on_failure() {
        if (links.length > 0) {
          next();
        } else {
          failure_callbacks.forEach(function(callback) {
            callback(failure_reasons);
          });
        }
      }

      /**
      */
      function success(link) {
        remove(link);
        on_success();
      }

      /**
      */
      function failure(link, exception) {
        // Mark for later.
        any_failure = true;

        // Store if a reason is provided.
        if (exception) {
          failure_reasons.push(exception);
        }

        remove(link);
        on_failure();
      }

      next();
    } else {
      this.success_callbacks.forEach(function(callback) {
        scheduler.deferred(callback);
      });
    }

    return this.clear();
  }

  binding.prototype.clear = function() {
    this.links = [];
    this.success_callbacks = [];
    this.failure_callbacks = [];
    return this;
  }

  /**
  */
  var ordered = {};

  /**
  */
  ordered.append = util.make_binding_wrapper(binding, binding.prototype.append);

  /**
  */
  ordered.success = util.make_binding_wrapper(binding, binding.prototype.success);

  /**
  */
  ordered.failure = util.make_binding_wrapper(binding, binding.prototype.failure);

  /**
  */
  ordered.commit = util.make_binding_wrapper(binding, binding.prototype.commit);

  /**
  */
  ordered.clear = util.make_binding_wrapper(binding, binding.prototype.clear);

  /**
  */
  global.ordered = ordered;
})(window);


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
      // Snapshot of current state, any modifications after commit()
      // will not be applicable.
      var links = this.links;
      var success_callbacks = this.success_callbacks;
      var failure_callbacks = this.failure_callbacks;
      var is_ordered = this.is_ordered;

      // List of exceptions (reasons) for failure.
      var failure_reasons = [];

      // Can't rely entirely on the size of failure_reasons due to the chance
      // the caller may not provide a reason of failure.
      var any_failure = false;

      /**
      */
      function invoke(link) {
        scheduler.deferred(link.bind(null, success.bind(null, link), failure.bind(null, link)));
      }

      /**
      */
      function next() {
        invoke(links.shift());
      }

      /**
      */
      function remove(link) {
        var i = links.indexOf(link);

        if (i != -1) {
          links.splice(i, 1);
        }
      }

      /**
      */
      function on_success() {
        if (is_ordered && links.length > 0) {
          next();
        } else if (links.length == 0) {
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

      /**
      */
      function on_failure() {
        if (is_ordered && links.length > 0) {
          next();
        } else if (links.length == 0) {
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

      if (is_ordered) {
        next();
      } else {
        links.forEach(invoke);
      }
    } else {
      this.success_callbacks.forEach(function(callback) {
        scheduler.deferred(callback);
      });
    }

    return this.clear();
  }

  binding.prototype.ordered = function(is_ordered) {
    this.is_ordered = is_ordered;
    return this;
  }

  binding.prototype.clear = function() {
    this.links = [];
    this.success_callbacks = [];
    this.failure_callbacks = [];
    this.is_ordered = false;
    return this;
  }

  /**
  */
  var chain = {};

  /**
  */
  chain.append = util.make_binding_wrapper(binding, binding.prototype.append);

  /**
  */
  chain.success = util.make_binding_wrapper(binding, binding.prototype.success);

  /**
  */
  chain.failure = util.make_binding_wrapper(binding, binding.prototype.failure);

  /**
  */
  chain.commit = util.make_binding_wrapper(binding, binding.prototype.commit);

  /**
  */
  chain.ordered = util.make_binding_wrapper(binding, binding.prototype.ordered);

  /**
  */
  chain.clear = util.make_binding_wrapper(binding, binding.prototype.clear);

  /**
  */
  global.chain = chain;
})(window);

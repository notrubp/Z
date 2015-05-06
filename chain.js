(function(global) {
  /**
  */
  var Util = global.Util;
  var Scheduler = global.Scheduler;

  /**
  */
  var Binding = function() {
    this.clear();
  }

  /**
  */
  Binding.prototype.append = function(callback) {
    this.links.push(callback);
    return this;
  }

  /**
  */
  Binding.prototype.success = function(callback) {
    this.successCallbacks.push(callback);
    return this;
  }

  /**
  */
  Binding.prototype.failure = function(callback) {
    this.failureCallbacks.push(callback);
    return this;
  }

  /**
  */
  Binding.prototype.commit = function() {
    if (this.links.length > 0) {
      // Snapshot of current state, any modifications after commit()
      // will not be applicable.
      var links = this.links;
      var successCallbacks = this.successCallbacks;
      var failureCallbacks = this.failureCallbacks;
      var isOrdered = this.isOrdered;

      // List of exceptions (reasons) for failure.
      var failureReasons = [];

      // Can't rely entirely on the size of failureReasons due to the chance
      // the caller may not provide a reason of failure.
      var anyFailure = false;

      /**
      */
      function invoke(link) {
        Scheduler.deferred(link.bind(null, success.bind(null, link), failure.bind(null, link)));
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
      function onSuccess() {
        if (isOrdered && links.length > 0) {
          next();
        } else if (links.length == 0) {
          // Any failures are a failure.
          if (anyFailure) {
            onFailure();
          } else {
            successCallbacks.forEach(function(callback) {
              callback();
            });
          }
        }
      }

      /**
      */
      function onFailure() {
        if (isOrdered && links.length > 0) {
          next();
        } else if (links.length == 0) {
          failureCallbacks.forEach(function(callback) {
            callback(failureReasons);
          });
        }
      }

      /**
      */
      function success(link) {
        remove(link);
        onSuccess();
      }

      /**
      */
      function failure(link, exception) {
        // Mark for later.
        anyFailure = true;

        // Store if a reason is provided.
        if (exception) {
          failureReasons.push(exception);
        }

        remove(link);
        onFailure();
      }

      if (isOrdered) {
        next();
      } else {
        links.forEach(invoke);
      }
    } else {
      this.successCallbacks.forEach(function(callback) {
        Scheduler.deferred(callback);
      });
    }

    return this.clear();
  }

  Binding.prototype.ordered = function(isOrdered) {
    this.isOrdered = isOrdered;
    return this;
  }

  Binding.prototype.clear = function() {
    this.links = [];
    this.successCallbacks = [];
    this.failureCallbacks = [];
    this.isOrdered = false;
    return this;
  }

  /**
  */
  var Chain = {};

  /**
  */
  Chain.append = Util.makeBindingWrapper(Binding, Binding.prototype.append);

  /**
  */
  Chain.success = Util.makeBindingWrapper(Binding, Binding.prototype.success);

  /**
  */
  Chain.failure = Util.makeBindingWrapper(Binding, Binding.prototype.failure);

  /**
  */
  Chain.commit = Util.makeBindingWrapper(Binding, Binding.prototype.commit);

  /**
  */
  Chain.ordered = Util.makeBindingWrapper(Binding, Binding.prototype.ordered);

  /**
  */
  Chain.clear = Util.makeBindingWrapper(Binding, Binding.prototype.clear);

  /**
  */
  global.Chain = Chain;
})(window);

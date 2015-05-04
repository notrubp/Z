(function(global) {
  /**
  */
  var async = { };

  var binding = function() {
    this.links = [];
    this.success_callbacks = [];
    this.failure_callbacks = [];
    this.locked = false;

  binding.prototype.append = function(callback) {
    this.links.push(callback);
  }

  binding.prototype.success = function(callback) {
    this.success_callbacks.push(callback);
  }

  binding.prototype.failure = function(callback) {
    this.failure_callbacks.push(callback);
  }

  binding.prototype.start = function() {
    if (this.links.length > 0) {
      this.links.forEach(function(v) {
        function success() {
        }

        function failure() {
        }

        v(success, failure);
      });
    } else {
      this.success_callbacks.forEach(Function.prototype.call);
    }
  }

  binding.prototype.clear = function() {
    this.links = [];
  }

  /**
  */
  global.async = async;
})(window);

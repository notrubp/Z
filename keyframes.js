(function(global) {
  /*
  */
  var platform = global.platform;
  var property = global.property;

  /*
  */
  var keyframes = function(name) {
    this.name = name || uuid.letters();
    this.keyframes = {};
  }

  /*
  */
  keyframes.prototype.at = function(percentage, prop, value) {
    // Clamp.
    percentage = Math.min(1, percentage);
    percentage = Math.max(0, percentage);

    // Ensure it exists.
    this.keyframes[percentage] = this.keyframes[percentage] || [];

    // Evaluate property fixups.
    prop = property.fixup_nocc(prop);

    // Fixup.
    value = value != null && typeof value.__property_hook === 'function' ? value.__property_hook() : value;

    // Append.
    this.keyframes[percentage].push({ 'property' : prop, 'value' : value });
  }

  /*
  */
  var min = 0.001;

  /*
  */
  keyframes.prototype.after = function(percentage, property, value) {
    this.at(percentage + min, property, value);
  }

  /*
  */
  keyframes.prototype.before = function(percentage, property, value) {
    this.at(percentage - min, property, value);
  }

  /*
  */
  function make(keyframes, p, v) {
    p += ' ' + (Number(v) * 100) + '% {';

    var array = keyframes[v];

    var suffix = ' ';
    for (var i = 0; i < array.length; ++i) {
      var o = array[i];
      p += suffix + o.property + ': ' + o.value;
      suffix = '; ';
    }

    p += suffix + '}';

    return p;
  }

  var rulename = platform.is_webkit ? '@-webkit-keyframes' : '@keyframes';

  /*
  */
  keyframes.prototype.make = function() {
    return Object.keys(this.keyframes)
      .sort()
      .reduce(make.bind(null, this.keyframes), rulename + ' ' + this.name + ' {') + '}';
  }

  /*
  */
  global.keyframes = keyframes;
})(window);

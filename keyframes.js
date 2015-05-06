(function(global) {
  /*
  */
  var Uuid = global.Uuid;
  var Platform = global.Platform;
  var Property = global.Property;

  /*
  */
  var Keyframes = function(name) {
    this.name = name || Uuid.letters();
    this.keyframes = {};
  }

  /*
  */
  Keyframes.prototype.at = function(percentage, prop, value) {
    // Clamp.
    percentage = Math.min(1, percentage);
    percentage = Math.max(0, percentage);

    // Ensure it exists.
    this.keyframes[percentage] = this.keyframes[percentage] || [];

    // Evaluate property fixups.
    prop = Property.fixupNocc(prop);

    // Fixup.
    value = value != null && typeof value.__propertyHook === 'function' ? value.__propertyHook() : value;

    // Append.
    this.keyframes[percentage].push({ 'property' : prop, 'value' : value });
  }

  /*
  */
  var min = 0.001;

  /*
  */
  Keyframes.prototype.after = function(percentage, property, value) {
    this.at(percentage + min, property, value);
  }

  /*
  */
  Keyframes.prototype.before = function(percentage, property, value) {
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

  var rulename = Platform.isWebkit ? '@-webkit-keyframes' : '@keyframes';

  /*
  */
  Keyframes.prototype.make = function() {
    return Object.keys(this.keyframes)
      .sort()
      .reduce(make.bind(null, this.keyframes), rulename + ' ' + this.name + ' {') + '}';
  }

  /*
  */
  global.Keyframes = Keyframes;
})(window);

(function(global) {
  /**
  */
  var Random = global.Random;

  /*
  */
  var Uuid = {};

  /*
  */
  var chars = '0123456789abcdef';

  /*
  */
  function rfc4122Replacer(match, offset, string) {
    var j = Random.range(chars.length);
    return chars[offset == 19 ? (j & 0x3) | 0x8 : j & 0xf];
  }

  /*
  */
  Uuid.rfc4122 = function() {
    return '00000000-0000-4000-0000-000000000000'.replace(/0/g, rfc4122Replacer);
  }

  /*
  */
  var letters = 'abcdefghijklmnopqrstuvwxyz';

  /*
  */
  Uuid.letters = function(length) {
    length = length || 36;

    var out = '';

    for (var i = 0; i < length; ++i) {
      var j = Random.range(letters.length);
      out += letters[j];
    }

    return out;
  }

  /*
  */
  global.Uuid = Uuid;
})(window);

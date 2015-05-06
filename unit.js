(function(global) {
  /*
  */
  var Unit = {}

  /*
  */
  function make(unit, value) {
    return value + unit;
  }

  /*
  */
  Unit.val = make.bind(null, '');

  /*
  */
  Unit.mm = make.bind(null, 'mm');

  /*
  */
  Unit.cm = make.bind(null, 'cm');

  /*
  */
  Unit.in = make.bind(null, 'in');

  /*
  */
  Unit.pc = make.bind(null, 'pc');

  /*
  */
  Unit.pt = make.bind(null, 'pt');

  /*
  */
  Unit.ex = make.bind(null, 'ex');

  /*
  */
  Unit.em = make.bind(null, 'em');

  /*
  */
  Unit.pct = make.bind(null, '%');

  /*
  */
  Unit.px = make.bind(null, 'px');

  /*
  */
  global.Unit = Unit;
})(window);

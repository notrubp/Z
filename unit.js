(function(global) {
  /*
  */
  var unit = {}

  /*
  */
  function make(unit, value) {
    return value + unit;
  }

  /*
  */
  unit.val = make.bind(null, '');

  /*
  */
  unit.mm = make.bind(null, 'mm');

  /*
  */
  unit.cm = make.bind(null, 'cm');

  /*
  */
  unit.in = make.bind(null, 'in');

  /*
  */
  unit.pc = make.bind(null, 'pc');

  /*
  */
  unit.pt = make.bind(null, 'pt');

  /*
  */
  unit.ex = make.bind(null, 'ex');

  /*
  */
  unit.em = make.bind(null, 'em');

  /*
  */
  unit.pct = make.bind(null, '%');

  /*
  */
  unit.px = make.bind(null, 'px');

  /*
  */
  global.unit = unit;
})(window);
